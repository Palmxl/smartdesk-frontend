export const getPriorityColor = (
  priority: string
) => {

  switch (priority) {

    case "High":
      return "bg-red-100 text-red-700"

    case "Medium":
      return "bg-yellow-100 text-yellow-700"

    default:
      return "bg-green-100 text-green-700"
  }
}

export const getSentimentColor = (
  sentiment: string
) => {

  switch (sentiment) {

    case "Negative":
      return "bg-red-100 text-red-700"

    default:
      return "bg-gray-100 text-gray-700"
  }
}