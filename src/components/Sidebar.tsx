import {
  LayoutDashboard,
  Ticket,
} from "lucide-react"

import { Link } from "react-router-dom"

const Sidebar = () => {

  return (
    <aside
      className="
        w-64
        h-screen
        bg-black
        text-white
        fixed
        left-0
        top-0
        p-6
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
            hover:text-gray-300
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
            hover:text-gray-300
          "
        >
          <Ticket size={20} />

          Tickets
        </Link>

      </nav>

    </aside>
  )
}

export default Sidebar