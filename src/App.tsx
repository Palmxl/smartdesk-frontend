import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardPage from "./pages/DashboardPage"
import TicketsPage from "./pages/TicketsPage"
import LoginPage from "./pages/LoginPage"
import ChatPage from "./pages/ChatPage"
import KanbanPage from "./pages/KanbanPage"
import ActivityPage from "./pages/ActivityPage"
import ProtectedRoute from "./routes/ProtectedRoute"
import TicketDetailsPage from "./pages/TicketDetailsPage"
import RegisterPage from "./pages/RegisterPage"

function App() {

  return (

    <BrowserRouter
      basename="/smartdesk-frontend"
    >

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <TicketsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <ProtectedRoute>
              <KanbanPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <ActivityPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetailsPage />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App