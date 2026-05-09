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
      "http://127.0.0.1:8000/activities/"
    )
      .then((res) => res.json())
      .then(setLogs)

  }, [])

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">

        Activity Logs

      </h1>

      <div
        className="
          bg-white
          dark:bg-gray-800
          rounded-xl
          shadow
          p-4
        "
      >

        <div className="space-y-4">

          {logs.map((log) => (

            <div
              key={log.id}
              className="
                border-b
                dark:border-gray-700
                pb-3
              "
            >

              <p className="font-medium">
                {log.action}
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-300
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

          ))}

        </div>

      </div>

    </MainLayout>
  )
}

export default ActivityPage