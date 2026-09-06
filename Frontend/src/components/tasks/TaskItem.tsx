import { CheckCircle2, Circle, Trash2 } from 'lucide-react'
import type { Task } from '../../types/task'

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50">
      <div className="flex min-w-0 items-center gap-4">
        {task.completed ? (
          <CheckCircle2 size={21} className="shrink-0 text-green-500" />
        ) : (
          <Circle size={21} className="shrink-0 text-slate-300" />
        )}

        <div className="min-w-0">
          <h3
            className={`truncate text-sm font-medium ${
              task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
            }`}
          >
            {task.title}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">
            {task.description}
          </p>
        </div>
      </div>

      <button className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500">
        <Trash2 size={18} />
      </button>
    </div>
  )
}

export default TaskItem
