import {
  useEffect,
  useState,
} from "react"

import toast
  from "react-hot-toast"

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd"

import MainLayout
  from "../layouts/MainLayout"

import type { Ticket }
  from "../types/ticket"

import {
  getTickets,
  updateTicketStatus,
} from "../services/ticketService"

const columns = [
  "Open",
  "In Progress",
  "Closed",
]

const KanbanPage = () => {

  const [tickets, setTickets] =
    useState<Ticket[]>([])

  useEffect(() => {

    loadTickets()

    const ws = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/tickets/ws`
    )

    ws.onmessage = () => {

      loadTickets()

      toast.success(
        "Kanban updated"
      )
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

  const handleMove = async (
    ticketId: number,
    status: string
  ) => {

    await updateTicketStatus(
      ticketId,
      status
    )

    loadTickets()
  }

  const handleDragEnd = async (
    result: any
  ) => {

    if (!result.destination) {
      return
    }

    const ticketId = Number(
      result.draggableId
    )

    const newStatus =
      result.destination
        .droppableId

    await updateTicketStatus(
      ticketId,
      newStatus
    )

    loadTickets()
  }

  return (

    <MainLayout>

      <h1
        className="
          text-3xl
          font-bold
          mb-6
          text-black
          dark:text-white
        "
      >

        Kanban Board

      </h1>

      <DragDropContext
        onDragEnd={
          handleDragEnd
        }
      >

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {columns.map((column) => (

            <Droppable
              droppableId={column}
              key={column}
            >

              {(provided) => (

                <div
                  ref={
                    provided.innerRef
                  }

                  {
                    ...provided
                      .droppableProps
                  }

                  className="
                    bg-gray-200
                    dark:bg-gray-800
                    rounded-xl
                    p-4
                    min-h-[600px]
                    border
                    border-gray-200
                    dark:border-gray-700
                    shadow-sm
                  "
                >

                  <h2
                    className="
                      font-bold
                      mb-4
                      text-black
                      dark:text-white
                    "
                  >

                    {column}

                  </h2>

                  <div className="space-y-4">

                    {tickets
                      .filter(
                        (ticket) =>
                          ticket.status
                          === column
                      )
                      .map(
                        (
                          ticket,
                          index
                        ) => (

                        <Draggable
                          draggableId={
                            ticket.id.toString()
                          }
                          index={index}
                          key={ticket.id}
                        >

                          {(provided) => (

                            <div
                              ref={
                                provided.innerRef
                              }

                              {
                                ...provided
                                  .draggableProps
                              }

                              {
                                ...provided
                                  .dragHandleProps
                              }

                              className="
                                bg-white
                                dark:bg-gray-700
                                text-black
                                dark:text-white
                                p-4
                                rounded-lg
                                shadow
                                border
                                border-gray-200
                                dark:border-gray-600
                              "
                            >

                              <h3
                                className="
                                  font-semibold
                                "
                              >

                                {ticket.title}

                              </h3>

                              <p
                                className="
                                  text-sm
                                  text-gray-500
                                  dark:text-gray-300
                                  mt-1
                                "
                              >

                                {
                                  ticket.description
                                }

                              </p>

                              <div className="mt-4">

                                <select
                                  value={
                                    ticket.status
                                  }

                                  onChange={(e) =>
                                    handleMove(
                                      ticket.id,
                                      e.target.value
                                    )
                                  }

                                  className="
                                    border
                                    border-gray-300
                                    dark:border-gray-600
                                    bg-white
                                    dark:bg-gray-800
                                    text-black
                                    dark:text-white
                                    p-2
                                    rounded
                                    w-full
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                  "
                                >

                                  {columns.map(
                                    (
                                      status
                                    ) => (

                                      <option
                                        key={status}
                                        value={status}
                                      >

                                        {status}

                                      </option>

                                    )
                                  )}

                                </select>

                              </div>

                            </div>

                          )}

                        </Draggable>

                      ))}

                    {
                      provided.placeholder
                    }

                  </div>

                </div>

              )}

            </Droppable>

          ))}

        </div>

      </DragDropContext>

    </MainLayout>
  )
}

export default KanbanPage