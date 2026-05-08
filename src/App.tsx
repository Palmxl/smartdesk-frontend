import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

import DashboardPage from "./pages/DashboardPage"
import TicketsPage from "./pages/TicketsPage"
import LoginPage from "./pages/LoginPage"

import ProtectedRoute from "./routes/ProtectedRoute"

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<LoginPage />}
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

      </Routes>

    </BrowserRouter>
  )
}

export default App