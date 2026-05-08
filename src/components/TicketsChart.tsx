import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Props {
  high: number
  low: number
}

const TicketsChart = ({
  high,
  low,
}: Props) => {

  const data = [
    {
      name: "High",
      value: high,
    },
    {
      name: "Low",
      value: low,
    },
  ]

  const COLORS = [
    "#ef4444",
    "#22c55e",
  ]

  return (
    <div className="bg-white p-4 rounded-xl shadow h-[400px]">

      <h2 className="text-xl font-semibold mb-4">
        Tickets by Priority
      </h2>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

            {data.map((_, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  )
}

export default TicketsChart