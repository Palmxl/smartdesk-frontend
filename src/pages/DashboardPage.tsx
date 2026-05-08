import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"

import { getTickets } from "../services/ticketService"

const DashboardPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

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
      (ticket) =>
        ticket.priority === "High"
    ).length

  const closedTickets =
    tickets.filter(
      (ticket) =>
        ticket.status === "Closed"
    ).length

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

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

        <div className="bg-white p-4 rounded-xl shadow">

          <h2 className="text-gray-500">
            Closed Tickets
          </h2>

          <p className="text-3xl font-bold text-green-600">
            {closedTickets}
          </p>

        </div>

      </div>

    </MainLayout>
  )
}

export default DashboardPage