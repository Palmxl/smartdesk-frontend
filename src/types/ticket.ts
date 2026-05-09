export interface Ticket {
  id: number
  title: string
  description: string
  priority: string
  status: string
  sentiment: string
  category: string
  assigned_to?: string
  summary?: string
  created_at: string
  sla_deadline?: string
}