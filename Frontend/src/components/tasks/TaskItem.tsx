import { CheckCircle2, Circle, Trash2 } from 'lucide-react'
import { updateTask } from '../../services/api'
import { deleteTask } from '../../services/api'
import type { Task } from '../../types/task'

interface TaskItemProps {
  task: Task
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (id: string) => void
}

function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const handleToggle = async () => {
    try {
      const updatedTask = await updateTask(task.id, {
        completed: !task.completed,
      })

      onTaskUpdated(updatedTask)
    } catch {
      console.error('Failed to update task')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteTask(task.id)

      onTaskDeleted(task.id)
    } catch {
      console.error('Failed to delete task')
    }
  }

  return (
    <div className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50">
      <div className="flex min-w-0 items-center gap-4">
        <button onClick={handleToggle}>
          {task.completed ? (
            <CheckCircle2 size={21} className="shrink-0 text-green-500" />
          ) : (
            <Circle size={21} className="shrink-0 text-slate-300" />
          )}
        </button>

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

      <button
        onClick={handleDelete}
        className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  )
}

export default TaskItem
