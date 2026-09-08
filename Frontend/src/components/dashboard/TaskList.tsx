import { ListTodo, Search } from 'lucide-react'
import TaskItem from '../tasks/TaskItem'
import type { Task } from '../../types/task'

interface TaskListProps {
  tasks: Task[]
  searchTerm: string
  onSearch: (value: string) => void
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (id: string) => void
  onEdit: (task: Task) => void
}

function TaskList({
  tasks,
  searchTerm,
  onSearch,
  onTaskUpdated,
  onTaskDeleted,
  onEdit,
}: TaskListProps) {
  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold">Recent Tasks</h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep track of your latest tasks
          </p>
        </div>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-400 sm:w-64"
          />
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {tasks.length === 0 ? (
          <div className="p-10 text-center">
            <ListTodo size={32} className="mx-auto text-slate-300" />

            <h3 className="mt-3 text-sm font-medium text-slate-700">
              {searchTerm ? 'No matching tasks' : 'No tasks yet'}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {searchTerm
                ? 'Try searching with a different keyword.'
                : 'Create your first task to get started.'}
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskList
