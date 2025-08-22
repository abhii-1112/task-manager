import {Router} from 'express'
import { createTask, getTaskById, getTasks, updateTask, deleteTask } from '../controllers/taskController'
import { protect } from '../middleware/authMiddleware';

const router = Router()

router.post("/tasks", protect, createTask);        // Create a task
router.get("/tasks", protect, getTasks);           // Get all tasks
router.get("/tasks/:id", protect, getTaskById);    // Get single task
router.put("/tasks/:id", protect, updateTask);     // Update task
router.delete("/tasks/:id", protect, deleteTask);  // Delete task


export default router;