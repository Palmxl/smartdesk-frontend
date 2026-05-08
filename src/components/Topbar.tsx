import { LogOut } from "lucide-react"

import { useNavigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"

const Topbar = () => {

  const navigate = useNavigate()

  const user = useAuth()

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow
        p-4
        mb-6
        flex
        justify-between
        items-center
      "
    >

      <div>

        <h2 className="font-semibold">
          Welcome back
        </h2>

        <p className="text-gray-500">
          {user?.username}
        </p>

      </div>

      <button
        onClick={handleLogout}
        className="
          flex
          items-center
          gap-2
          bg-black
          text-white
          px-4
          py-2
          rounded
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </div>
  )
}

export default Topbar