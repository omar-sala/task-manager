import { LayoutDashboard, ListTodo } from 'lucide-react'

function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
          <ListTodo size={20} />
        </div>

        <span className="text-lg font-bold">TaskFlow</span>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-500 hover:bg-slate-50">
          <ListTodo size={18} />
          All Tasks
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar
