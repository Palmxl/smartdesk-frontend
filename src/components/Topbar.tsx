import {
  LogOut,
  Moon,
  Sun,
} from "lucide-react"

import { useNavigate }
  from "react-router-dom"

import { useAuth }
  from "../hooks/useAuth"

import { useTheme }
  from "../hooks/useTheme"

const Topbar = () => {

  const navigate = useNavigate()

  const user = useAuth()

  const {
    darkMode,
    toggleTheme,
  } = useTheme()

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (
    <div
      className="
        bg-white
        dark:bg-gray-800
        text-black
        dark:text-white
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

        <p className="
          text-gray-500
          dark:text-gray-300
        ">

          {user?.sub}

          <span
            className="
              ml-2
              bg-gray-200
              dark:bg-gray-700
              px-2
              py-1
              rounded
              text-xs
            "
          >

            {user?.role}

          </span>

        </p>

      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={toggleTheme}
          className="
            p-2
            rounded
            bg-gray-200
            dark:bg-gray-700
            hover:bg-gray-300
            dark:hover:bg-gray-600
          "
        >

          {darkMode
            ? <Sun size={18} />
            : <Moon size={18} />
          }

        </button>

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-2
            bg-black
            dark:bg-white
            text-white
            dark:text-black
            px-4
            py-2
            rounded
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  )
}

export default Topbar