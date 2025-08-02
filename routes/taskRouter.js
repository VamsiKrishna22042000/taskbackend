import express from "express";
import validateToken from "../middleware/validateToken.js";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";

const taskRouter = express.Router();

taskRouter.use(validateToken);
taskRouter.route("/").get(getTasks).post(createTask);
taskRouter.route("/:id").put(updateTask).delete(deleteTask);

export default taskRouter;
