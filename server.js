import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();
dotenv.config();
connectDB();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//user route
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

app.listen(port, () => {
  console.log(`Server is running in ${port} port`);
});
