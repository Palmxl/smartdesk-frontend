import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"
import { getTickets } from "../services/ticketService"
import CreateTicketForm from "../components/CreateTicketForm"
import Badge from "../components/Badge"

import {
  getPriorityColor,
  getSentimentColor,
} from "../utils/ticketStyles"

const DashboardPage = () => {

  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    const data = await getTickets()
    setTickets(data)
  }

  const totalTickets = tickets.length

  const highPriorityTickets =
    tickets.filter(
      (ticket) => ticket.priority === "High"
    ).length

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-white p-4 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        Total Tickets
                    </h2>

                    <p className="text-3xl font-bold">
                        {totalTickets}
                    </p>

                </div>

                <div className="bg-white p-4 rounded-xl shadow">

                    <h2 className="text-gray-500">
                        High Priority
                    </h2>

                    <p className="text-3xl font-bold text-red-600">
                        {highPriorityTickets}
                    </p>

                </div>

            </div>

            <CreateTicketForm
                onTicketCreated={loadTickets}
            />

            <div className="bg-white rounded-xl p-4 shadow">

                <h2 className="text-xl font-semibold mb-4">
                    Tickets
                </h2>

                <div className="space-y-4">

                    {tickets.map((ticket) => (

                        <div key={ticket.id} className="border rounded-lg p-4">

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

                        </div>

                    ))}

                </div>

            </div>

        </MainLayout>
    )
}

export default DashboardPage