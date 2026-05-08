import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import TicketsTable from "../components/TicketsTable"

import CreateTicketForm from "../components/CreateTicketForm"

import type { Ticket } from "../types/ticket"

import {
  getTickets,
  updateTicketStatus,
} from "../services/ticketService"

const TicketsPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  const [priorityFilter, setPriorityFilter] =
    useState("All")

  const [currentPage, setCurrentPage] =
    useState(1)

  const [sortBy, setSortBy] =
    useState("newest")

  const ticketsPerPage = 5

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {

    setLoading(true)

    const data = await getTickets()

    setTickets(data)

    setLoading(false)
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

  const sortedTickets = [
    ...filteredTickets
  ].sort((a, b) => {

    if (sortBy === "priority") {

      if (
        a.priority === "High"
        && b.priority !== "High"
      ) {
        return -1
      }

      if (
        a.priority !== "High"
        && b.priority === "High"
      ) {
        return 1
      }
    }

    if (sortBy === "status") {

      if (
        a.status === "Open"
        && b.status !== "Open"
      ) {
        return -1
      }

      if (
        a.status !== "Open"
        && b.status === "Open"
      ) {
        return 1
      }
    }

    return b.id - a.id
  })

  const startIndex =
    (currentPage - 1)
    * ticketsPerPage

  const paginatedTickets =
    sortedTickets.slice(
      startIndex,
      startIndex + ticketsPerPage
    )

  const totalPages =
    Math.ceil(
      sortedTickets.length
      / ticketsPerPage
    )

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

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="border p-2 rounded"
        >

          <option value="newest">
            Newest
          </option>

          <option value="priority">
            Priority
          </option>

          <option value="status">
            Status
          </option>

        </select>

      </div>

      <CreateTicketForm
        onTicketCreated={loadTickets}
      />

      {loading ? (

        <div
          className="
            bg-white
            p-8
            rounded-xl
            shadow
            text-center
          "
        >
          Loading tickets...
        </div>

      ) : filteredTickets.length === 0 ? (

        <div
          className="
            bg-white
            p-8
            rounded-xl
            shadow
            text-center
          "
        >
          No tickets found
        </div>

      ) : (

        <>
          <TicketsTable
            tickets={paginatedTickets}
            onStatusChange={
              handleStatusChange
            }
          />

          <div
            className="
              flex
              justify-center
              gap-2
              mt-6
            "
          >

            {Array.from({
              length: totalPages
            }).map((_, index) => (

              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
                className={`
                  px-4
                  py-2
                  rounded
                  ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-white"
                  }
                `}
              >

                {index + 1}

              </button>

            ))}

          </div>
        </>

      )}

    </MainLayout>
  )
}

export default TicketsPage