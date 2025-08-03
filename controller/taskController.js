import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";

export const getTasks = asyncHandler(async (req, res) => {
  const task = await Task.find({ userId: req.user.id });
  if (task) {
    res.status(200).json({
      message: `Fetched tasks successfully`,
      status: 200,
      tasks: task,
    });
  } else {
    res.status(400);
    throw new Error("Faild to fetch tasks");
  }
});

export const createTask = asyncHandler(async (req, res) => {
  const { title, dueDate, complete } = req.body;

  if (!title || !dueDate || complete === undefined) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  const taskCreation = await Task.create({
    userId: req.user.id,
    title,
    dueDate,
    complete,
  });

  if (taskCreation) {
    res.status(201).json({
      responsObj: {
        id: taskCreation._id,
        dueDate: taskCreation.dueDate,
        title: taskCreation.title,
        complete: taskCreation.complete,
      },
      message: "Task created successfully",
      status: 201,
    });
  } else {
    res.status(400);
    throw new Error("Task creation failed");
  }
});

export const updateTask = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Bad Request! Id is missing");
  }

  const findTask = await Task.findOne({ _id: req.params.id });

  if (findTask.userId.toString() === req.user.id) {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updateTask) {
      res
        .status(200)
        .json({ message: "Task updated succesfully", status: 200 });
    }
  } else {
    res.status(400);

    throw new Error("User is unauthorized to make update of this task");
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Id is required");
  }

  const findTask = await Task.findOne({ _id: req.params.id });

  if (findTask.userId.toString() === req.user.id) {
    const deleteTask = await Task.deleteOne({ _id: req.params.id });
    if (deleteTask) {
      res
        .status(200)
        .json({ message: `Task deleted successfully`, status: 200 });
    } else {
      res.status(400);
      throw new Error("User is not authorized to delte task");
    }
  }
});
