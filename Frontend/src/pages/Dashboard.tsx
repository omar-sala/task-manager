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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        setError('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [])

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
          onTaskUpdated={(updatedTask) => {
            setTasks((currentTasks) =>
              currentTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            )
          }}
        />
      </section>

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onTaskCreated={(task) => {
            setTasks((currentTasks) => [task, ...currentTasks])
          }}
        />
      )}
    </>
  )
}

export default Dashboard
