import { useState }
  from "react"

import {
  Moon,
  Sun,
} from "lucide-react"

import { useNavigate }
  from "react-router-dom"

import toast
  from "react-hot-toast"

import { login }
  from "../services/authService"

import { useTheme }
  from "../hooks/useTheme"

const LoginPage = () => {

  const navigate =
    useNavigate()

  const {
    darkMode,
    toggleTheme,
  } = useTheme()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      const data = await login(
        username,
        password
      )

      localStorage.setItem(
        "token",
        data.access_token
      )

      toast.success(
        "Login successful"
      )

      navigate("/")

    } catch (error) {

      console.error(error)

      toast.error(
        "Invalid credentials"
      )
    }
  }

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
        dark:bg-gray-900
        transition
        relative
      "
    >

      <button
        onClick={toggleTheme}
        className="
          absolute
          top-6
          right-6
          p-3
          rounded-lg
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          shadow
          hover:opacity-90
          transition
        "
      >

        {darkMode
          ? <Sun size={20} />
          : <Moon size={20} />
        }

      </button>

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          p-8
          rounded-xl
          shadow
          w-[400px]
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
          "
        >

          SmartDesk

        </h1>

        <div className="mb-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-700
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              placeholder-gray-400
              p-3
              rounded
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <div className="mb-6">

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-700
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
              placeholder-gray-400
              p-3
              rounded
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-black
            dark:bg-white
            text-white
            dark:text-black
            py-3
            rounded
            hover:opacity-90
            transition
          "
        >

          Login

        </button>

      </form>

    </div>
  )
}

export default LoginPage