import {
  useEffect,
  useRef,
  useState,
} from "react"

import toast from "react-hot-toast"

import MainLayout from "../layouts/MainLayout"

import { useAuth } from "../hooks/useAuth"

import { getMessages } from "../services/chatService"

const ChatPage = () => {

  const user = useAuth()

  const ws = useRef<WebSocket | null>(
    null
  )

  const [message, setMessage] =
    useState("")

  const [messages, setMessages] =
    useState<string[]>([])

  const [onlineUsers, setOnlineUsers] =
    useState(0)

  useEffect(() => {

    const loadMessages =
      async () => {

        const data =
          await getMessages()

        const formatted =
          data.map(
            (msg: any) =>
              `${msg.username}: ${msg.content}`
          )

        setMessages(formatted)
      }

    loadMessages()

    ws.current = new WebSocket(
      `ws://127.0.0.1:8000/chat/${user?.username}`
    )

    ws.current.onmessage = (
      event
    ) => {

      if (
        event.data.startsWith(
          "ONLINE_USERS:"
        )
      ) {

        const count =
          event.data.split(":")[1]

        setOnlineUsers(
          Number(count)
        )

        return
      }

      toast.success(
        "New message received"
      )

      setMessages((prev) => [
        ...prev,
        event.data,
      ])
    }

    return () => {
      ws.current?.close()
    }

  }, [])

  const sendMessage = () => {

    if (
      !message.trim()
      || !ws.current
    ) {
      return
    }

    const formattedMessage =
      `${user?.username}: ${message}`

    ws.current.send(
      formattedMessage
    )

    setMessage("")
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Team Chat
      </h1>

      <p className="text-green-600 mb-4">
        {onlineUsers} users online
      </p>

      <div
        className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow
          p-4
          h-[600px]
          flex
          flex-col
        "
      >

        <div
          className="
            flex-1
            overflow-y-auto
            space-y-2
            mb-4
          "
        >

          {messages.map(
            (msg, index) => (

              <div
                key={index}
                className="
                  bg-gray-100
                  dark:bg-gray-700
                  p-3
                  rounded
                "
              >

                {msg}

              </div>

            )
          )}

        </div>

        <div className="flex gap-2">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Type a message..."
            className="
              flex-1
              border
              dark:border-gray-700
              p-3
              rounded
              bg-white
              dark:bg-gray-700
              dark:text-white
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-black
              text-white
              px-6
              rounded
            "
          >

            Send

          </button>

        </div>

      </div>

    </MainLayout>
  )
}

export default ChatPage