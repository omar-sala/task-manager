import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50 text-slate-900">
        <Sidebar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
