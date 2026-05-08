import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"

import {
  getTickets,
  updateTicketStatus,
} from "../services/ticketService"

import CreateTicketForm from "../components/CreateTicketForm"

import TicketCard from "../components/TicketCard"

const TicketsPage = () => {

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
        Tickets
      </h1>

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

      <div className="space-y-4">

        {filteredTickets.map((ticket) => (

          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onStatusChange={
              handleStatusChange
            }
          />

        ))}

      </div>

    </MainLayout>
  )
}

export default TicketsPage