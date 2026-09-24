import { useEffect, useState } from 'react'
import { getTasks } from '../services/api'
import type { Task } from '../types/task'
import type { Pagination } from '../services/api'

function useTasks() {
  const [status, setStatus] = useState('all')
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    totalTasks: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
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
        setIsFetching(true)
        setError('')

        const response = await getTasks(
          currentPage,
          10,
          debouncedSearch,
          status
        )

        setTasks(response.tasks)
        setPagination(response.pagination)
      } catch {
        setError('Failed to load tasks')
      } finally {
        setIsFetching(false)
        setLoading(false)
      }
    }

    loadTasks()
  }, [currentPage, debouncedSearch, status])

  const refreshTasks = async () => {
    try {
      setIsFetching(true)
      setError('')

      const response = await getTasks(currentPage, 10, debouncedSearch, status)

      setTasks(response.tasks)
      setPagination(response.pagination)
    } catch {
      setError('Failed to load tasks')
    } finally {
      setIsFetching(false)
    }
  }

  return {
    tasks,
    setTasks,
    loading,
    isFetching,
    error,
    currentPage,
    setCurrentPage,
    pagination,
    searchTerm,
    status,
    setStatus,
    setSearchTerm,
    refreshTasks,
  }
}

export default useTasks
