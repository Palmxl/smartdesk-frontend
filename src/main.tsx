import { StrictMode }
  from "react"

import { createRoot }
  from "react-dom/client"

import { Toaster }
  from "react-hot-toast"

import "./index.css"

import App from "./App.tsx"

import {
  ThemeProvider
} from "./hooks/useTheme"

createRoot(
  document.getElementById("root")!
).render(

  <StrictMode>

    <ThemeProvider>

      <App />

      <Toaster
        position="top-right"
      />

    </ThemeProvider>

  </StrictMode>
)