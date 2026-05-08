import { api } from "./api"
import { Ticket } from "../types/ticket"

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets")
  return response.data
}