import {
  useEffect,
  useState,
} from "react"

import MainLayout
  from "../layouts/MainLayout"

import type { Ticket }
  from "../types/ticket"

import {
  getTickets,
  updateTicketStatus,
} from "../services/ticketService"

const columns = [
  "Open",
  "In Progress",
  "Closed",
]

const KanbanPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {

    const data =
      await getTickets()

    setTickets(data)
  }

  const handleMove = async (
    ticketId: number,
    status: string
  ) => {

    await updateTicketStatus(
      ticketId,
      status
    )

    loadTickets()
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Kanban Board

      </h1>

      <div className="grid grid-cols-3 gap-6">

        {columns.map((column) => (

          <div
            key={column}
            className="
              bg-gray-100
              dark:bg-gray-800
              rounded-xl
              p-4
              min-h-[600px]
            "
          >

            <h2 className="font-bold mb-4">
              {column}
            </h2>

            <div className="space-y-4">

              {tickets
                .filter(
                  (ticket) =>
                    ticket.status
                    === column
                )
                .map((ticket) => (

                  <div
                    key={ticket.id}
                    className="
                      bg-white
                      dark:bg-gray-700
                      p-4
                      rounded-lg
                      shadow
                    "
                  >

                    <h3 className="font-semibold">

                      {ticket.title}

                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-300
                        mt-1
                      "
                    >

                      {ticket.description}

                    </p>

                    <div className="mt-4">

                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          handleMove(
                            ticket.id,
                            e.target.value
                          )
                        }
                        className="
                          border
                          dark:border-gray-600
                          dark:bg-gray-800
                          p-2
                          rounded
                          w-full
                        "
                      >

                        {columns.map(
                          (status) => (

                            <option
                              key={status}
                              value={status}
                            >

                              {status}

                            </option>

                          )
                        )}

                      </select>

                    </div>

                  </div>

                ))}

            </div>

          </div>

        ))}

      </div>

    </MainLayout>
  )
}

export default KanbanPage