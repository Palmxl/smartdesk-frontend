import type { Ticket } from "../types/ticket"

interface Props {
  tickets: Ticket[]
}

const AIInsights = ({
  tickets,
}: Props) => {

  const negativeTickets =
    tickets.filter(
      (ticket) =>
        ticket.sentiment === "Negative"
    ).length

  const dominantCategory =
    Object.entries(

      tickets.reduce(
        (acc, ticket) => {

          acc[ticket.category] =
            (acc[ticket.category] || 0)
            + 1

          return acc

        },
        {} as Record<
          string,
          number
        >
      )

    ).sort(
      (a, b) =>
        b[1] - a[1]
    )[0]?.[0]

  const criticalPercentage =
    tickets.length > 0
      ? Math.round(
          (
            tickets.filter(
              (ticket) =>
                ticket.priority
                === "High"
            ).length
            / tickets.length
          ) * 100
        )
      : 0

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-6
        mt-6
      "
    >

      <h2 className="text-2xl font-bold mb-4">

        AI Insights

      </h2>

      <div className="space-y-3">

        <div>

          <span className="font-semibold">
            Negative Sentiment:
          </span>

          {" "}
          {negativeTickets}

        </div>

        <div>

          <span className="font-semibold">
            Dominant Category:
          </span>

          {" "}
          {dominantCategory
            || "N/A"}

        </div>

        <div>

          <span className="font-semibold">
            Critical Tickets:
          </span>

          {" "}
          {criticalPercentage}%

        </div>

        <div
          className="
            bg-blue-50
            border
            border-blue-200
            p-4
            rounded-lg
            mt-4
          "
        >

          <p className="font-semibold">

            AI Recommendation

          </p>

          <p className="text-sm mt-1">

            {
              criticalPercentage > 50
                ? "High workload detected. Increase agent allocation."
                : "Ticket workload is stable."
            }

          </p>

        </div>

      </div>

    </div>
  )
}

export default AIInsights