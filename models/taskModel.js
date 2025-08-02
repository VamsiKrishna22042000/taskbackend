import mongoose from "mongoose";

const taskModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is requried!"],
    },
    dueDate: {
      type: String,
      required: [true, "Due Date is requried!"],
    },
    task: {
      type: String,
      required: [true, "Task Details is required!"],
    },
    complete: {
      type: Boolean,
      required: [true, "Complete is required!"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskModel);
