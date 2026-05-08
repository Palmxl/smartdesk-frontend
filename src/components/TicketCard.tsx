import type { Ticket } from "../types/ticket"

import Badge from "./Badge"

import { useAuth } from "../hooks/useAuth"

import {
  getPriorityColor,
  getSentimentColor,
} from "../utils/ticketStyles"

interface Props {
  ticket: Ticket

  onStatusChange: (
    ticketId: number,
    status: string
  ) => void
}

const TicketCard = ({
  ticket,
  onStatusChange,
}: Props) => {

  const user = useAuth()

  return (
    <div className="border rounded-lg p-4 bg-white">

      <h3 className="font-bold text-lg">
        {ticket.title}
      </h3>

      <p className="text-gray-600 mt-1">
        {ticket.description}
      </p>

      <div className="flex gap-2 mt-3 flex-wrap">

        <Badge
          text={ticket.priority}
          color={getPriorityColor(
            ticket.priority
          )}
        />

        <Badge
          text={ticket.sentiment}
          color={getSentimentColor(
            ticket.sentiment
          )}
        />

        <Badge
          text={ticket.category}
          color="bg-blue-100 text-blue-700"
        />

        <Badge
          text={ticket.status}
          color="bg-gray-100 text-gray-700"
        />

      </div>

      {user?.role === "admin" && (

        <div className="mt-4">

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

            Mark as {
              ticket.status === "Open"
                ? "Closed"
                : "Open"
            }

          </button>

        </div>

      )}

    </div>
  )
}

export default TicketCard