import { Request, Response } from 'express'
import prisma from '../lib/prisma'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    res.status(200).json({
      success: true,
      data: tasks,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
    })
  }
}

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      })
    }

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
    })
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body

    const task = await prisma.task.create({
      data: {
        title,
        description,
      },
    })

    res.status(201).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to create task',
    })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      })
    }

    const { title, description, completed } = req.body

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        completed,
      },
    })

    return res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to update task',
    })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id

    if (typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID',
      })
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      })
    }

    await prisma.task.delete({
      where: {
        id,
      },
    })

    return res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Failed to delete task',
    })
  }
}
