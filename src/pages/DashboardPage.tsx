import { useEffect, useState } from "react"

import MainLayout from "../layouts/MainLayout"

import type { Ticket } from "../types/ticket"

import { getTickets } from "../services/ticketService"

import TicketsChart from "../components/TicketsChart"

import AIInsights from "../components/AIInsights"

import AgentPerformanceChart
  from "../components/AgentPerformanceChart"

import ExportReportButton
  from "../components/ExportReportButton"

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

  const lowPriorityTickets =
    tickets.filter(
      (ticket) =>
        ticket.priority === "Low"
    ).length

  const overdueTickets =
    tickets.filter(
      (ticket) => {

        return (
          ticket.sla_deadline
          && new Date(
            ticket.sla_deadline
          ) < new Date()
          && ticket.status !== "Closed"
        )
      }
    ).length

  return (
    <MainLayout>

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <ExportReportButton
          tickets={tickets}
        />

      </div>

      <div className="grid grid-cols-4 gap-4">

        <div
          className="
            bg-white
            dark:bg-gray-800
            p-4
            rounded-xl
            shadow
          "
        >

          <h2
            className="
              text-gray-500
              dark:text-gray-300
            "
          >

            Total Tickets

          </h2>

          <p className="text-3xl font-bold">
            {totalTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            p-4
            rounded-xl
            shadow
          "
        >

          <h2
            className="
              text-gray-500
              dark:text-gray-300
            "
          >

            High Priority

          </h2>

          <p className="text-3xl font-bold text-red-600">
            {highPriorityTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            p-4
            rounded-xl
            shadow
          "
        >

          <h2
            className="
              text-gray-500
              dark:text-gray-300
            "
          >

            Closed Tickets

          </h2>

          <p className="text-3xl font-bold text-green-600">
            {closedTickets}
          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            p-4
            rounded-xl
            shadow
          "
        >

          <h2
            className="
              text-gray-500
              dark:text-gray-300
            "
          >

            Overdue Tickets

          </h2>

          <p className="text-3xl font-bold text-red-600">
            {overdueTickets}
          </p>

        </div>

      </div>

      <div className="mt-6">

        <TicketsChart
          high={highPriorityTickets}
          low={lowPriorityTickets}
        />

        <AgentPerformanceChart
          tickets={tickets}
        />

        <AIInsights
          tickets={tickets}
        />

      </div>

    </MainLayout>
  )
}

export default DashboardPage