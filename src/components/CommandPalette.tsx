import {
  Command
} from "cmdk"

import {
  useEffect,
  useState,
} from "react"

import {
  useNavigate
} from "react-router-dom"

const pages = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Tickets",
    path: "/tickets",
  },
  {
    name: "Kanban",
    path: "/kanban",
  },
  {
    name: "Activity Logs",
    path: "/activities",
  },
  {
    name: "Chat",
    path: "/chat",
  },
]

const CommandPalette = () => {

  const navigate =
    useNavigate()

  const [open, setOpen] =
    useState(false)

  useEffect(() => {

    const down = (
      e: KeyboardEvent
    ) => {

      if (
        e.key === "k"
        && (
          e.metaKey
          || e.ctrlKey
        )
      ) {

        e.preventDefault()

        setOpen(
          (open) => !open
        )
      }
    }

    document.addEventListener(
      "keydown",
      down
    )

    return () =>
      document.removeEventListener(
        "keydown",
        down
      )

  }, [])

  if (!open) {
    return null
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-start
        justify-center
        pt-32
        z-50
      "
    >

      <Command
        className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow-2xl
          w-[600px]
          overflow-hidden
        "
      >

        <Command.Input
          placeholder="
            Search pages...
          "
          className="
            w-full
            p-4
            outline-none
            bg-transparent
            border-b
            dark:border-gray-700
          "
        />

        <Command.List>

          {pages.map((page) => (

            <Command.Item
              key={page.path}

              onSelect={() => {

                navigate(
                  page.path
                )

                setOpen(false)
              }}

              className="
                p-4
                cursor-pointer
                hover:bg-gray-100
                dark:hover:bg-gray-700
              "
            >

              {page.name}

            </Command.Item>

          ))}

        </Command.List>

      </Command>

    </div>
  )
}

export default CommandPalette