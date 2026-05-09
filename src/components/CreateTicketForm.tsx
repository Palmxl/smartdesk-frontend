import { useState }
  from "react"

import toast
  from "react-hot-toast"

import { createTicket }
  from "../services/ticketService"

interface Props {

  onTicketCreated: () => void
}

const CreateTicketForm = ({
  onTicketCreated,
}: Props) => {

  const [title, setTitle] =
    useState("")

  const [
    description,
    setDescription,
  ] = useState("")

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      await createTicket(
        title,
        description
      )

      toast.success(
        "Ticket created"
      )

      setTitle("")

      setDescription("")

      onTicketCreated()

    } catch (error) {

      console.error(error)

      toast.error(
        "Error creating ticket"
      )
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        dark:bg-gray-800
        text-black
        dark:text-white
        p-4
        rounded-xl
        shadow
        mb-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >

        Create Ticket

      </h2>

      <div className="mb-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            dark:border-gray-700
            p-2
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

      </div>

      <div className="mb-4">

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-300
            dark:border-gray-700
            p-2
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
          rows={5}
        />

      </div>

      <button
        type="submit"
        className="
          bg-black
          dark:bg-white
          text-white
          dark:text-black
          px-4
          py-2
          rounded
          hover:opacity-90
          transition
        "
      >

        Create

      </button>

    </form>
  )
}

export default CreateTicketForm