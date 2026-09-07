import { useEffect, useState } from 'react'
import { CheckCircle2, Circle, ListTodo } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import TaskList from '../components/dashboard/TaskList'
import { getTasks } from '../services/api'
import type { Task } from '../types/task'

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasks()
      setTasks(data)
    }

    loadTasks()
  }, [])

  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.length - completedTasks

  return (
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

      <TaskList tasks={tasks} />
    </section>
  )
}

export default Dashboard
