import jsPDF from "jspdf"

import autoTable
  from "jspdf-autotable"

import type { Ticket }
  from "../types/ticket"

interface Props {
  tickets: Ticket[]
}

const ExportReportButton = ({
  tickets,
}: Props) => {

  const exportPDF = () => {

    const doc = new jsPDF()

    doc.setFontSize(20)

    doc.text(
      "SmartDesk Report",
      14,
      20
    )

    doc.setFontSize(12)

    doc.text(
      `Total Tickets: ${tickets.length}`,
      14,
      35
    )

    autoTable(doc, {

      startY: 45,

      head: [[
        "Title",
        "Priority",
        "Status",
        "Assigned",
      ]],

      body: tickets.map(
        (ticket) => [

          ticket.title,

          ticket.priority,

          ticket.status,

          ticket.assigned_to
          || "Unassigned",
        ]
      ),
    })

    doc.save(
      "smartdesk-report.pdf"
    )
  }

  return (
    <button
      onClick={exportPDF}
      className="
        bg-black
        text-white
        px-4
        py-2
        rounded-lg
      "
    >

      Export PDF Report

    </button>
  )
}

export default ExportReportButton