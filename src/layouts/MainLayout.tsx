import type { ReactNode } from "react"

import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import CommandPalette from "../components/CommandPalette"

interface Props {
  children: ReactNode
}

const MainLayout = ({
  children,
}: Props) => {

  return (
    <div
      className="
        bg-gray-100
        dark:bg-gray-900
        dark:text-white
        min-h-screen
      "
    >

      <Sidebar />

      <main className="ml-64 p-6">

        <Topbar />
        <CommandPalette />

        {children}

      </main>

    </div>
  )
}

export default MainLayout