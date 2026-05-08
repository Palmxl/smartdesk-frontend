import type { Ticket } from "../types/ticket"

import Badge from "./Badge"

import { useAuth } from "../hooks/useAuth"

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

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

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
              className="border-t"
            >

              <td className="p-4">

                <div>

                  <h3 className="font-semibold">
                    {ticket.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {ticket.description}
                  </p>

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

                <Badge
                  text={ticket.status}
                  color="bg-gray-100 text-gray-700"
                />

              </td>

              <td className="p-4">

                {user?.role === "admin" && (

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