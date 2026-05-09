import { jwtDecode }
  from "jwt-decode"

interface User {
  sub: string
  role: string
}

export const useAuth = () => {

  const token =
    localStorage.getItem(
      "token"
    )

  if (!token) {
    return null
  }

  try {

    const decoded =
      jwtDecode<User>(token)

    return decoded

  } catch {

    localStorage.removeItem(
      "token"
    )

    return null
  }
}