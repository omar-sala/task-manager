import { useEffect, useState } from 'react'
import { CheckCircle2, Circle, ListTodo, LoaderCircle } from 'lucide-react'
import Header from '../components/layout/Header'
import StatCard from '../components/dashboard/StatCard'
import TaskList from '../components/dashboard/TaskList'
import TaskModal from '../components/tasks/TaskModal'
import { getTasks } from '../services/api'
import type { Task } from '../types/task'

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await getTasks(currentPage, 10, debouncedSearch)

        setTasks(response.tasks)
        setPagination(response.pagination)
      } catch {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [currentPage, debouncedSearch])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const completedTasks = tasks.filter((task) => task.completed).length

  const pendingTasks = tasks.length - completedTasks

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle size={32} className="animate-spin text-slate-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      </div>
    )
  }

  return (
    <>
      <Header onAddTask={() => setIsModalOpen(true)} />

      <section className="p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Tasks"
            value={tasks.length}
            icon={<ListTodo size={20} />}
          />

          <StatCard
            title="Completed"
            value={completedTasks}
            icon={<CheckCircle2 size={20} />}
          />

          <StatCard
            title="Pending"
            value={pendingTasks}
            icon={<Circle size={20} />}
          />
        </div>

        <TaskList
          tasks={tasks}
          searchTerm={searchTerm}
          onSearch={handleSearch}
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
                disabled={currentPage === 1 || loading}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={() => setCurrentPage((page) => page + 1)}
                disabled={currentPage === pagination.totalPages || loading}
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

export default Dashboard
