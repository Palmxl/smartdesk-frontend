import {
  useEffect,
  useState,
} from "react"

import MainLayout
  from "../layouts/MainLayout"

const ActivityPage = () => {

  const [logs, setLogs] =
    useState<any[]>([])

  useEffect(() => {

    fetch(
      `${import.meta.env.VITE_API_URL}/activities/`
    )
      .then((res) => res.json())
      .then(setLogs)

  }, [])

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

        Activity Logs

      </h1>

      <div
        className="
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          rounded-xl
          shadow
          p-4
        "
      >

        <div className="space-y-4">

          {logs.length === 0 ? (

            <div
              className="
                text-center
                text-gray-500
                dark:text-gray-300
                py-6
              "
            >

              No activity logs yet

            </div>

          ) : (

            logs.map((log) => (

              <div
                key={log.id}
                className="
                  border-b
                  border-gray-200
                  dark:border-gray-700
                  pb-3
                "
              >

                <p
                  className="
                    font-medium
                  "
                >

                  {log.action}

                </p>

                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-300
                    mt-1
                  "
                >

                  {log.username}

                  {" • "}

                  {
                    new Date(
                      log.created_at
                    ).toLocaleString()
                  }

                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </MainLayout>
  )
}

export default ActivityPage