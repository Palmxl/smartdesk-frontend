import { api } from "./api"
import type { Ticket } from "../types/ticket"

export const getTickets = async (): Promise<Ticket[]> => {
  const response = await api.get("/tickets")
  return response.data
}

export const createTicket = async (
  title: string,
  description: string
) => {

  const response = await api.post("/tickets", {
    title,
    description,
  })

  return response.data
}