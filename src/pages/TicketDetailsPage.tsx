import {
  useEffect,
  useState,
  useRef,
} from "react"

import {
  useParams,
} from "react-router-dom"

import MainLayout
  from "../layouts/MainLayout"

import type { Ticket }
  from "../types/ticket"

import { api }
  from "../services/api"

const TicketDetailsPage = () => {

  const { id } = useParams()

  const [ticket, setTicket] =
    useState<Ticket | null>(
      null
    )

  const [loading, setLoading] =
    useState(true)

  const [activities, setActivities] =
    useState<any[]>([])

  const [comments, setComments] =
    useState<any[]>([])

  const [newComment, setNewComment] =
    useState("")

  const ws = useRef<WebSocket | null>(
    null
  )

  useEffect(() => {

    loadTicket()

    ws.current = new WebSocket(
      `${import.meta.env.VITE_WS_URL}/tickets/ws`
    )

    ws.current.onmessage = () => {

      loadTicket()
    }

    return () => {
      ws.current?.close()
    }

  }, [id])

  const loadTicket = async () => {

    try {

      const response =
        await api.get(
          `/tickets/${id}`
        )

      setTicket(response.data)

      const activityResponse =
        await api.get(
          `/tickets/${id}/activities`
        )

      setActivities(
        activityResponse.data
      )

      const commentsResponse =
        await api.get(
          `/tickets/${id}/comments`
        )

      setComments(
        commentsResponse.data
      )

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)
    }
  }

  const handleAddComment =
    async () => {

      if (!newComment.trim()) {
        return
      }

      try {

        await api.post(
          `/tickets/${id}/comments`,
          null,
          {
            params: {
              content:
                newComment,
            },
          }
        )

        setNewComment("")

        loadTicket()

      } catch (error) {

        console.error(error)
      }
    }

  if (loading) {

    return (

      <MainLayout>

        <div
          className="
            text-black
            dark:text-white
          "
        >

          Loading ticket...

        </div>

      </MainLayout>
    )
  }

  if (!ticket) {

    return (

      <MainLayout>

        <div
          className="
            text-red-500
          "
        >

          Ticket not found

        </div>

      </MainLayout>
    )
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

        Ticket Details

      </h1>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            xl:col-span-2
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow
            p-6
            text-black
            dark:text-white
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              mb-2
            "
          >

            {ticket.title}

          </h2>

          <p
            className="
              text-gray-600
              dark:text-gray-300
              mb-6
            "
          >

            {ticket.description}

          </p>

          <div className="space-y-4">

            <div>

              <span className="font-semibold">
                Status:
              </span>

              {" "}

              {ticket.status}

            </div>

            <div>

              <span className="font-semibold">
                Priority:
              </span>

              {" "}

              {ticket.priority}

            </div>

            <div>

              <span className="font-semibold">
                Category:
              </span>

              {" "}

              {ticket.category}

            </div>

            <div>

              <span className="font-semibold">
                Sentiment:
              </span>

              {" "}

              {ticket.sentiment}

            </div>

            <div>

              <span className="font-semibold">
                Assigned To:
              </span>

              {" "}

              {
                ticket.assigned_to
                || "Unassigned"
              }

            </div>

          </div>

        </div>

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-xl
            shadow
            p-6
            text-black
            dark:text-white
            space-y-6
          "
        >

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-2
              "
            >

              AI Summary

            </h3>

            <p
              className="
                text-gray-600
                dark:text-gray-300
              "
            >

              {
                ticket.summary
                || "No summary available"
              }

            </p>

          </div>

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-2
              "
            >

              AI Suggested Response

            </h3>

            <p
              className="
                text-gray-600
                dark:text-gray-300
              "
            >

              {
                ticket.ai_response
                || "No AI response available"
              }

            </p>

          </div>

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-2
              "
            >

              SLA Deadline

            </h3>

            <p
              className="
                text-gray-600
                dark:text-gray-300
              "
            >

              {
                ticket.sla_deadline

                  ? new Date(
                      ticket.sla_deadline
                    ).toLocaleString()

                  : "N/A"
              }

            </p>

          </div>

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-4
              "
            >

              Activity Timeline

            </h3>

            <div className="space-y-3">

              {activities.length === 0 ? (

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                  "
                >

                  No activity yet

                </p>

              ) : (

                activities.map((activity) => (

                  <div
                    key={activity.id}
                    className="
                      border-l-2
                      border-blue-500
                      pl-4
                      py-1
                    "
                  >

                    <p
                      className="
                        font-medium
                        text-sm
                      "
                    >

                      {activity.action}

                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >

                      {activity.username}

                      {" • "}

                      {
                        new Date(
                          activity.created_at
                        ).toLocaleString()
                      }

                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

          <div>

            <h3
              className="
                text-xl
                font-bold
                mb-4
              "
            >

              Comments

            </h3>

            <div className="space-y-3 mb-4">

              {comments.length === 0 ? (

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                  "
                >

                  No comments yet

                </p>

              ) : (

                comments.map((comment) => (

                  <div
                    key={comment.id}
                    className="
                      bg-gray-100
                      dark:bg-gray-700
                      rounded-lg
                      p-3
                    "
                  >

                    <p
                      className="
                        font-semibold
                        text-sm
                      "
                    >

                      {comment.username}

                    </p>

                    <p
                      className="
                        text-sm
                        mt-1
                      "
                    >

                      {comment.content}

                    </p>

                    <p
                      className="
                        text-xs
                        text-gray-500
                        dark:text-gray-400
                        mt-2
                      "
                    >

                      {
                        new Date(
                          comment.created_at
                        ).toLocaleString()
                      }

                    </p>

                  </div>

                ))

              )}

            </div>

            <div className="flex gap-2">

              <input
                type="text"
                value={newComment}
                onChange={(e) =>
                  setNewComment(
                    e.target.value
                  )
                }
                placeholder="Write a comment..."
                className="
                  flex-1
                  border
                  border-gray-300
                  dark:border-gray-700
                  bg-white
                  dark:bg-gray-700
                  text-black
                  dark:text-white
                  rounded
                  p-2
                "
              />

              <button
                onClick={
                  handleAddComment
                }
                className="
                  bg-black
                  dark:bg-white
                  text-white
                  dark:text-black
                  px-4
                  rounded
                "
              >

                Send

              </button>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default TicketDetailsPage