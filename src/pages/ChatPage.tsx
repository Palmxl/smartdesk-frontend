import {
  useEffect,
  useRef,
  useState,
} from "react"

import MainLayout
  from "../layouts/MainLayout"

import { useAuth }
  from "../hooks/useAuth"

import { getMessages }
  from "../services/chatService"

const ChatPage = () => {

  const user = useAuth()

  const ws =
    useRef<WebSocket | null>(
      null
    )

  const [message, setMessage] =
    useState("")

  const [messages, setMessages] =
    useState<string[]>([])

  const [
    onlineUsers,
    setOnlineUsers,
  ] = useState(0)

  useEffect(() => {

    if (!user?.sub) {
      return
    }

    const loadMessages =
      async () => {

        try {

          const data =
            await getMessages()

          const formatted =
            data.map(
              (msg: any) =>
                `${msg.username}: ${msg.content}`
            )

          setMessages(formatted)

        } catch (error) {

          console.error(error)
        }
      }

    loadMessages()

    if (
      ws.current
      && ws.current.readyState
      === WebSocket.OPEN
    ) {
      return
    }

    const socket =
      new WebSocket(
        `ws://127.0.0.1:8000/chat/${user.sub}`
      )

    ws.current = socket

    socket.onopen = () => {

      console.log(
        "WebSocket connected"
      )
    }

    socket.onmessage = (
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

      setMessages((prev) => {

        if (
          prev.includes(
            event.data
          )
        ) {
          return prev
        }

        return [
          ...prev,
          event.data,
        ]
      })
    }

    socket.onerror = (
      error
    ) => {

      console.error(
        "WebSocket error:",
        error
      )
    }

    socket.onclose = () => {

      console.log(
        "WebSocket disconnected"
      )

      ws.current = null
    }

    return () => {

      socket.close()
    }

  }, [user?.sub])

  const sendMessage = () => {

    if (
      !message.trim()
      || !ws.current
      || ws.current.readyState
      !== WebSocket.OPEN
    ) {

      return
    }

    const formattedMessage =
      `${user?.sub}: ${message}`

    ws.current.send(
      formattedMessage
    )

    setMessage("")
  }

  return (

    <MainLayout>

      <h1
        className="
          text-3xl
          font-bold
          mb-6
          text-black
          dark:text-white
        "
      >

        Team Chat

      </h1>

      <p
        className="
          text-green-600
          dark:text-green-400
          mb-4
        "
      >

        {onlineUsers} users online

      </p>

      <div
        className="
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
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
                  text-black
                  dark:text-white
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
              border-gray-300
              dark:border-gray-700
              p-3
              rounded
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              placeholder-gray-400
              dark:placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-black
              dark:bg-white
              text-white
              dark:text-black
              px-6
              rounded
              hover:opacity-90
              transition
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