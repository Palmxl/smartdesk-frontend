import {
  useEffect,
  useState,
} from "react"

import toast
  from "react-hot-toast"

import MainLayout
  from "../layouts/MainLayout"

import type { Ticket }
  from "../types/ticket"

import { getTickets }
  from "../services/ticketService"

import TicketsChart
  from "../components/TicketsChart"

import AIInsights
  from "../components/AIInsights"

import AgentPerformanceChart
  from "../components/AgentPerformanceChart"

import ExportReportButton
  from "../components/ExportReportButton"

const DashboardPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

  useEffect(() => {

    loadTickets()

    const ws = new WebSocket(
      "ws://127.0.0.1:8000/tickets/ws"
    )

    ws.onmessage = (
      event
    ) => {

      toast.success(
        event.data
      )

      loadTickets()
    }

    return () => {
      ws.close()
    }

  }, [])

  const loadTickets = async () => {

    const data =
      await getTickets()

    setTickets(data)
  }

  const totalTickets =
    tickets.length

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

        <h1
          className="
            text-3xl
            font-bold
            text-black
            dark:text-white
          "
        >

          Dashboard

        </h1>

        <ExportReportButton
          tickets={tickets}
        />

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >

        <div
          className="
            bg-white
            dark:bg-gray-800
            text-black
            dark:text-white
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

          <p
            className="
              text-3xl
              font-bold
            "
          >

            {totalTickets}

          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            text-black
            dark:text-white
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

          <p
            className="
              text-3xl
              font-bold
              text-red-600
            "
          >

            {highPriorityTickets}

          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            text-black
            dark:text-white
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

          <p
            className="
              text-3xl
              font-bold
              text-green-600
            "
          >

            {closedTickets}

          </p>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            text-black
            dark:text-white
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

          <p
            className="
              text-3xl
              font-bold
              text-red-600
            "
          >

            {overdueTickets}

          </p>

        </div>

      </div>

      <div className="mt-6 space-y-6">

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