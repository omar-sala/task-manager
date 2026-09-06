import type { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{title}</p>

        <div className="rounded-lg bg-slate-100 p-2 text-slate-600">{icon}</div>
      </div>

      <p className="mt-4 text-3xl font-bold">{value}</p>
    </div>
  )
}

export default StatCard
