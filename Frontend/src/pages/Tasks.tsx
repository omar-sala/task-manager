import { useState } from 'react'
import TaskList from '../components/dashboard/TaskList'
import TaskModal from '../components/tasks/TaskModal'
import type { Task } from '../types/task'
import useTasks from '../hooks/useTasks'

function Tasks() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  const {
    tasks,
    setTasks,
    loading,
    error,
    setCurrentPage,
    pagination,
    searchTerm,
    setSearchTerm,
  } = useTasks()

  if (loading) {
    return <div className="p-6">Loading tasks...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div>
          <h1 className="text-lg font-semibold">All Tasks</h1>
          <p className="text-xs text-slate-500">
            View and manage all your tasks
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTask(undefined)
            setIsModalOpen(true)
          }}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Add Task
        </button>
      </header>

      <section className="p-6">
        <TaskList
          tasks={tasks}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onTaskUpdated={(updatedTask) => {
            setTasks((currentTasks) =>
              currentTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            )
          }}
          onTaskDeleted={(id) => {
            setTasks((currentTasks) =>
              currentTasks.filter((task) => task.id !== id)
            )
          }}
          onEdit={(task) => {
            setEditingTask(task)
            setIsModalOpen(true)
          }}
        />

        {pagination.totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((page) => page - 1)}
                disabled={!pagination.hasPreviousPage}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={!pagination.hasNextPage}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>

      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => {
            setIsModalOpen(false)
            setEditingTask(undefined)
          }}
          onTaskCreated={(task) => {
            setTasks((currentTasks) => [task, ...currentTasks])
          }}
          onTaskUpdated={(updatedTask) => {
            setTasks((currentTasks) =>
              currentTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            )
          }}
        />
      )}
    </>
  )
}

export default Tasks
