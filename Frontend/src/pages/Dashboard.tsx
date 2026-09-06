import { CheckCircle2, Circle, ListTodo } from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import TaskList from '../components/dashboard/TaskList'
import type { Task } from '../types/task'

const tasks: Task[] = [
  {
    id: '1',
    title: 'Learn React',
    description: 'Practice React fundamentals',
    completed: true,
  },
  {
    id: '2',
    title: 'Connect API',
    description: 'Integrate the Task Manager API',
    completed: false,
  },
  {
    id: '3',
    title: 'Build Dashboard',
    description: 'Create a clean task management dashboard',
    completed: false,
  },
]

function Dashboard() {
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
