import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="w-64 fixed h-full bg-black text-white p-4">
        SmartDesk
      </aside>

      <main className="ml-64 p-6">
        {children}
      </main>
    </div>
  )
}

export default MainLayout