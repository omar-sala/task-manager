import axios from 'axios'
import type { Task } from '../types/task'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/api/tasks')

  return response.data.data
}

export const createTask = async (
  title: string,
  description?: string
): Promise<Task> => {
  const response = await api.post('/api/tasks', {
    title,
    description,
  })

  return response.data.data
}

export const updateTask = async (
  id: string,
  data: {
    title?: string
    description?: string
    completed?: boolean
  }
): Promise<Task> => {
  const response = await api.patch(`/api/tasks/${id}`, data)

  return response.data.data
}

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`)
}

export default api
