import {
  LayoutDashboard,
  Ticket,
  MessageSquare,
  KanbanSquare,
  Activity,
} from "lucide-react"

import { Link } from "react-router-dom"

const Sidebar = () => {

  return (
    <aside
      className="
        w-64
        h-screen
        bg-black
        dark:bg-gray-950
        text-white
        fixed
        left-0
        top-0
        p-6
        border-r
        border-gray-800
      "
    >

      <h1 className="text-2xl font-bold mb-10">
        SmartDesk
      </h1>

      <nav className="space-y-4">

        <Link
          to="/"
          className="
            flex
            items-center
            gap-2
            p-2
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >

          <LayoutDashboard size={20} />

          Dashboard

        </Link>

        <Link
          to="/tickets"
          className="
            flex
            items-center
            gap-2
            p-2
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >

          <Ticket size={20} />

          Tickets

        </Link>

        <Link
          to="/kanban"
          className="
            flex
            items-center
            gap-2
            p-2
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >

          <KanbanSquare size={20} />

          Kanban

        </Link>

        <Link
          to="/activities"
          className="
            flex
            items-center
            gap-2
            p-2
            rounded-lg
            hover:bg-gray-800
            transition
          "
        > 

          <Activity size={20} />

          Activity Logs

        </Link>

        <Link
          to="/chat"
          className="
            flex
            items-center
            gap-2
            p-2
            rounded-lg
            hover:bg-gray-800
            transition
          "
        >

          <MessageSquare size={20} />

          Chat

        </Link>

      </nav>

    </aside>
  )
}

export default Sidebar