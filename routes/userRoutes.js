import express from "express";
import { signup, signin } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);

export default userRouter;
