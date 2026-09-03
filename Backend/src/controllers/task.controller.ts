import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prisma'
import { AppError } from '../errors/AppError'

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query
    const pageNumber = page === undefined ? 1 : Number(page)
    const limitNumber = limit === undefined ? 10 : Number(limit)

    if (!Number.isInteger(pageNumber) || !Number.isInteger(limitNumber)) {
      return res.status(400).json({
        success: false,
        message: 'page and limit must be integers',
      })
    }

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        success: false,
        message: 'page and limit must be greater than 0',
      })
    }

    if (limitNumber > 100) {
      return res.status(400).json({
        success: false,
        message: 'limit cannot be greater than 100',
      })
    }

    const skip = (pageNumber - 1) * limitNumber

    const [tasks, totalTasks] = await Promise.all([
      prisma.task.findMany({
        skip,
        take: limitNumber,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.task.count(),
    ])

    const totalPages = Math.ceil(totalTasks / limitNumber)

    res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page: pageNumber,
        limit: limitNumber,
        totalTasks,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string

    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    res.status(200).json({
      success: true,
      data: task,
    })
  } catch (error) {
    next(error)
  }
}

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(error)
  }
}

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string

    const { title, description, completed } = req.body

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!existingTask) {
      throw new AppError('Task not found', 404)
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
    next(error)
  }
}

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as string

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!existingTask) {
      throw new AppError('Task not found', 404)
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
    next(error)
  }
}
