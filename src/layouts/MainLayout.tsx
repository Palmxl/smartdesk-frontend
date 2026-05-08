import type { ReactNode } from "react"

import Sidebar from "../components/Sidebar"

interface Props {
  children: ReactNode
}

const MainLayout = ({
  children,
}: Props) => {

  return (
    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <main className="ml-64 p-6">
        {children}
      </main>

    </div>
  )
}

export default MainLayout