import type { Ticket } from "../types/ticket"

import Badge from "./Badge"

import { useAuth } from "../hooks/useAuth"

import { assignTicket } from "../services/ticketService"

import {
  getPriorityColor,
  getSentimentColor,
} from "../utils/ticketStyles"

interface Props {
  tickets: Ticket[]

  onStatusChange: (
    ticketId: number,
    status: string
  ) => void
}

const TicketsTable = ({
  tickets,
  onStatusChange,
}: Props) => {

  const user = useAuth()

  const handleAssign = async (
    ticketId: number
  ) => {

    const assignedTo =
      prompt("Assign to:")

    if (!assignedTo) {
      return
    }

    await assignTicket(
      ticketId,
      assignedTo
    )

    window.location.reload()
  }

  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        rounded-xl
        shadow
        overflow-hidden
      "
    >

      <table className="w-full">

        <thead
          className="
            bg-gray-100
            dark:bg-gray-700
          "
        >

          <tr>

            <th className="text-left p-4">
              Title
            </th>

            <th className="text-left p-4">
              Priority
            </th>

            <th className="text-left p-4">
              Sentiment
            </th>

            <th className="text-left p-4">
              Category
            </th>

            <th className="text-left p-4">
              Assigned
            </th>

            <th className="text-left p-4">
              SLA
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {tickets.map((ticket) => (

            <tr
              key={ticket.id}
              className="
                border-t
                dark:border-gray-700
              "
            >

              <td className="p-4">

                <div>

                  <h3 className="font-semibold">
                    {ticket.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-300
                    "
                  >

                    {ticket.description}

                  </p>

                  <p
                    className="
                      text-xs
                      text-blue-600
                      mt-1
                    "
                  >

                    AI Summary:
                    {ticket.summary}

                  </p>

                  {ticket.ai_response && (

                    <div
                      className="
                        mt-2
                        bg-gray-100
                        dark:bg-gray-700
                        p-2
                        rounded
                      "
                    >

                      <p className="text-xs font-semibold">
                        AI Suggested Response
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-700
                          dark:text-gray-300
                          mt-1
                        "
                      >

                        {ticket.ai_response}

                      </p>

                    </div>

                  )}

                </div>

              </td>

              <td className="p-4">

                <Badge
                  text={ticket.priority}
                  color={getPriorityColor(
                    ticket.priority
                  )}
                />

              </td>

              <td className="p-4">

                <Badge
                  text={ticket.sentiment}
                  color={getSentimentColor(
                    ticket.sentiment
                  )}
                />

              </td>

              <td className="p-4">

                <Badge
                  text={ticket.category}
                  color="bg-blue-100 text-blue-700"
                />

              </td>

              <td className="p-4">

                {ticket.assigned_to
                  || "Unassigned"}

              </td>

              <td className="p-4">

                <div className="flex flex-col gap-2">

                  <span className="text-sm">

                    {
                      ticket.sla_deadline
                        ? new Date(
                            ticket.sla_deadline
                          ).toLocaleString()
                        : "No SLA"
                    }

                  </span>

                  {ticket.sla_deadline
                    && new Date(
                      ticket.sla_deadline
                    ) < new Date()
                    && ticket.status !== "Closed" && (

                    <Badge
                      text="Overdue"
                      color="
                        bg-red-600
                        text-white
                      "
                    />

                  )}

                </div>

              </td>

              <td className="p-4">

                <Badge
                  text={ticket.status}
                  color="bg-gray-100 text-gray-700"
                />

              </td>

              <td className="p-4">

                {user?.role === "admin" && (

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        onStatusChange(
                          ticket.id,
                          ticket.status === "Open"
                            ? "Closed"
                            : "Open"
                        )
                      }
                      className="
                        bg-black
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                    >

                      Toggle Status

                    </button>

                    <button
                      onClick={() =>
                        handleAssign(
                          ticket.id
                        )
                      }
                      className="
                        bg-blue-600
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                    >

                      Assign

                    </button>

                  </div>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default TicketsTable