import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"
import { getTickets } from "../services/ticketService"

const DashboardPage = () => {

  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    const data = await getTickets()
    setTickets(data)
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="bg-white rounded-xl p-4 shadow">

        <h2 className="text-xl font-semibold mb-4">
          Tickets
        </h2>

        <div className="space-y-4">

          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-lg p-4"
            >
              <h3 className="font-bold">
                {ticket.title}
              </h3>

              <p className="text-gray-600">
                {ticket.description}
              </p>

              <div className="flex gap-2 mt-2">

                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                  {ticket.priority}
                </span>

                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                  {ticket.status}
                </span>

              </div>
            </div>
          ))}

        </div>

      </div>

    </MainLayout>
  )
}

export default DashboardPage