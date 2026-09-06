import { Plus } from 'lucide-react'

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-xs text-slate-500">Manage your tasks efficiently</p>
      </div>

      <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800">
        <Plus size={18} />
        <span className="hidden sm:inline">Add Task</span>
      </button>
    </header>
  )
}

export default Header
