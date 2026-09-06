import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />

      <main className="flex-1">
        <Header />
        <Dashboard />
      </main>
    </div>
  )
}

export default App
