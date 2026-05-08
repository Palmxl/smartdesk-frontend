import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"

import {
  getTickets,
  updateTicketStatus,
} from "../services/ticketService"

import CreateTicketForm from "../components/CreateTicketForm"
import Badge from "../components/Badge"

import {
  getPriorityColor,
  getSentimentColor,
} from "../utils/ticketStyles"

const DashboardPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

  const [search, setSearch] =
    useState("")

  const [priorityFilter, setPriorityFilter] =
    useState("All")

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {

    const data = await getTickets()

    setTickets(data)
  }

  const handleStatusChange = async (
    ticketId: number,
    status: string
  ) => {

    await updateTicketStatus(
      ticketId,
      status
    )

    loadTickets()
  }

  const totalTickets = tickets.length

  const highPriorityTickets =
    tickets.filter(
      (ticket) =>
        ticket.priority === "High"
    ).length

  const filteredTickets =
    tickets.filter((ticket) => {

      const matchesSearch =
        ticket.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

      const matchesPriority =
        priorityFilter === "All"
        || ticket.priority === priorityFilter

      return (
        matchesSearch &&
        matchesPriority
      )
    })

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

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded w-full"
        />

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >

          <option value="All">
            All
          </option>

          <option value="High">
            High
          </option>

          <option value="Low">
            Low
          </option>

        </select>

      </div>

      <CreateTicketForm
        onTicketCreated={loadTickets}
      />

      <div className="bg-white rounded-xl p-4 shadow">

        <h2 className="text-xl font-semibold mb-4">
          Tickets
        </h2>

        <div className="space-y-4">

          {filteredTickets.map((ticket) => (

            <div
              key={ticket.id}
              className="border rounded-lg p-4"
            >

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

              <div className="mt-4">

                <button
                  onClick={() =>
                    handleStatusChange(
                      ticket.id,
                      ticket.status === "Open"
                        ? "Closed"
                        : "Open"
                    )
                  }
                  className="bg-black text-white px-3 py-1 rounded"
                >

                  Mark as {
                    ticket.status === "Open"
                      ? "Closed"
                      : "Open"
                  }

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </MainLayout>
  )
}

export default DashboardPage