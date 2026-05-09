import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

import type { Ticket }
  from "../types/ticket"

interface Props {

  tickets: Ticket[]
}

const AgentPerformanceChart = ({
  tickets,
}: Props) => {

  const groupedData =
    tickets.reduce(
      (acc, ticket) => {

        const agent =
          ticket.assigned_to
          || "Unassigned"

        const existing =
          acc.find(
            (item) =>
              item.agent === agent
          )

        if (existing) {

          existing.tickets += 1

        } else {

          acc.push({
            agent,
            tickets: 1,
          })
        }

        return acc

      },
      [] as {
        agent: string
        tickets: number
      }[]
    )

  return (

    <div
      className="
        bg-white
        dark:bg-gray-800
        text-black
        dark:text-white
        rounded-xl
        shadow
        p-4
        h-[400px]
        mt-6
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >

        Agent Workload

      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <BarChart data={groupedData}>

          <XAxis
            dataKey="agent"
            stroke="#9ca3af"
          />

          <YAxis
            stroke="#9ca3af"
          />

          <Tooltip
            contentStyle={{
              backgroundColor:
                "#1f2937",
              border:
                "none",
              borderRadius:
                "12px",
              color:
                "#fff",
            }}
          />

          <Bar dataKey="tickets" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}

export default AgentPerformanceChart