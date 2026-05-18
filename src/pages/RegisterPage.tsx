import { useState }
  from "react"

import { useNavigate }
  from "react-router-dom"

import toast
  from "react-hot-toast"

import { api }
  from "../services/api"

const RegisterPage = () => {

  const navigate =
    useNavigate()

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [role, setRole] =
    useState("agent")

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault()

    try {

      await api.post(
        "/auth/register",
        {
          username,
          password,
          role,
        }
      )

      toast.success(
        "Account created"
      )

      navigate("/login")

    } catch (error) {

      console.error(error)

      toast.error(
        "Registration failed"
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
      "
    >

      <form
        onSubmit={handleRegister}
        className="
          bg-white
          dark:bg-gray-800
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
            text-black
            dark:text-white
          "
        >

          Create Account

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
              dark:border-gray-700
              p-3
              rounded
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
            "
          />

        </div>

        <div className="mb-4">

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
              dark:border-gray-700
              p-3
              rounded
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
            "
          />

        </div>

        <div className="mb-6">

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="
              w-full
              border
              dark:border-gray-700
              p-3
              rounded
              bg-white
              dark:bg-gray-700
              text-black
              dark:text-white
            "
          >

            <option value="agent">
              Agent
            </option>

            <option value="admin">
              Admin
            </option>

          </select>

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
          "
        >

          Register

        </button>

      </form>

    </div>
  )
}

export default RegisterPage