import { useState } from "react"

interface Props {
  onTicketCreated: () => void
}

const CreateTicketForm = ({
  onTicketCreated,
}: Props) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/tickets/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Error creating ticket")
      }

      setTitle("")
      setDescription("")

      onTicketCreated()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow mb-6"
    >

      <h2 className="text-xl font-bold mb-4">
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
          className="w-full border p-2 rounded"
        />

      </div>

      <div className="mb-4">

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="w-full border p-2 rounded"
        />

      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Create
      </button>

    </form>
  )
}

export default CreateTicketForm