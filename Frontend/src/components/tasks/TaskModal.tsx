import { useState, type FormEvent } from 'react'
import { X, LoaderCircle } from 'lucide-react'
import { createTask, updateTask } from '../../services/api'
import type { Task } from '../../types/task'

interface TaskModalProps {
  task?: Task
  onClose: () => void
  onTaskCreated: (task: Task) => void
  onTaskUpdated: (task: Task) => void
}

function TaskModal({
  task,
  onClose,
  onTaskCreated,
  onTaskUpdated,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (!title.trim()) {
      setError('Title is required')
      return
    }

    try {
      setLoading(true)
      setError('')

      if (task) {
        const updatedTask = await updateTask(task.id, {
          title: title.trim(),
          description: description.trim(),
        })

        onTaskUpdated(updatedTask)
      } else {
        const newTask = await createTask(title.trim(), description.trim())

        onTaskCreated(newTask)
      }

      onClose()
    } catch {
      setError(task ? 'Failed to update task' : 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {task ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter task description"
              rows={4}
              className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-slate-400"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <LoaderCircle size={16} className="animate-spin" />}

              {loading
                ? task
                  ? 'Updating...'
                  : 'Creating...'
                : task
                  ? 'Update Task'
                  : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
