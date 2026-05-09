import type { Ticket }
  from "../types/ticket"

import Badge
  from "./Badge"

import { useAuth }
  from "../hooks/useAuth"

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

    <div
      className="
        border
        border-gray-200
        dark:border-gray-700
        rounded-lg
        p-4
        bg-white
        dark:bg-gray-800
        text-black
        dark:text-white
        shadow-sm
      "
    >

      <h3 className="font-bold text-lg">

        {ticket.title}

      </h3>

      <p
        className="
          text-gray-600
          dark:text-gray-300
          mt-1
        "
      >

        {ticket.description}

      </p>

      <div
        className="
          flex
          gap-2
          mt-3
          flex-wrap
        "
      >

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
          color="
            bg-blue-100
            text-blue-700
            dark:bg-blue-900
            dark:text-blue-300
          "
        />

        <Badge
          text={ticket.status}
          color="
            bg-gray-100
            text-gray-700
            dark:bg-gray-700
            dark:text-gray-200
          "
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
              dark:bg-white
              text-white
              dark:text-black
              px-3
              py-1
              rounded
              hover:opacity-90
              transition
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