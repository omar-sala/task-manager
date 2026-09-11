import { LayoutDashboard, ListTodo } from 'lucide-react'
import { NavLink } from 'react-router-dom'

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
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
              isActive
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-500 hover:bg-slate-50'
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm ${
              isActive
                ? 'bg-slate-100 font-medium text-slate-900'
                : 'text-slate-500 hover:bg-slate-50'
            }`
          }
        >
          <ListTodo size={18} />
          All Tasks
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
