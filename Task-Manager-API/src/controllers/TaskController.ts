import { Application, Request, Response } from 'express'
import Task, { interfaceTask } from '../models/Task'
import { promises } from 'dns'
import { asyncWrapper } from '../middlewares/AsyncWrapper'

export const createTask = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const task: interfaceTask = await Task.create(req.body)
    res.status(201).json({ task })
  }
)

export const getAllTasks = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
  }
)

export const getTaskByID = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { id: taskid } = req.params
    const task = await Task.find({ _id: taskid })
    if (!task) return res.status(404).json({ status: 'fail' })
    return res.status(200).json({ task })
  }
)

export const updateTask = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { id: TaskToUpdate } = req.params
    const UpdateTask = await Task.findOneAndUpdate(
      { _id: TaskToUpdate },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    if (!UpdateTask) return res.status(404).json({ status: 'fail' })
    return res.status(200).json({ UpdateTask })
  }
)

export const deleteTask = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { id: flagedTask } = req.params
    const DeletedTask = await Task.findOneAndDelete({ _id: flagedTask })
    console.log(flagedTask)
    console.log(DeletedTask)
    if (!DeletedTask)
      return res
        .status(404)
        .json({ msg: 'Task has not been delete due to an issue with ID' })

    return res.status(200).json({ DeletedTask })
  }
)
