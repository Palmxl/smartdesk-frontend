import { jwtDecode } from "jwt-decode"

interface TokenPayload {
  sub: string
  role: string
}

export const useAuth = () => {

  const token =
    localStorage.getItem("token")

  if (!token) {
    return null
  }

  const decoded =
    jwtDecode<TokenPayload>(token)

  return {
    username: decoded.sub,
    role: decoded.role,
  }
}