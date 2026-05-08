import { jwtDecode } from "jwt-decode"

interface TokenPayload {
  sub: string
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
  }
}