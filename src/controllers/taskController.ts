import { Request, Response } from "express";
import Task from "../models/taskModel";

//create task
export const createTask = async (req: Request, res: Response) => {
    try{
        const {title, description, status} = req.body

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
         const task = await Task.create({
            title,
            description,
            status: status || "pending", // default to pending
            createdAt: new Date(),
            updatedAt: new Date(),
    });

    return res.status(201).json(task);
    }catch (error) {
        return res.status(500).json({ message: "Server error", error });
  }
}

//getTasks

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


//get1task
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
      return res.json(task);
  } catch (error) {
      return res.status(500).json({ message: "Server error", error });
  }
};

//updatetask

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    task.updatedAt = new Date();

    await task.save();
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

//deletetask

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.deleteOne();
    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
