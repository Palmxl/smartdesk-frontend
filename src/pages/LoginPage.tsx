import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { login } from "../services/authService"

const LoginPage = () => {

  const navigate = useNavigate()

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

      navigate("/")

    } catch (error) {

      console.error(error)

      alert("Invalid credentials")
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
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          bg-white
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
              setUsername(e.target.value)
            }
            className="
              w-full
              border
              p-3
              rounded
            "
          />

        </div>

        <div className="mb-6">

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              border
              p-3
              rounded
            "
          />

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-black
            text-white
            py-3
            rounded
          "
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default LoginPage