import { api } from "./api"

export const getMessages =
  async () => {

    const response =
      await api.get("/messages")

    return response.data
  }