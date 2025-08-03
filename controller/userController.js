import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import bcrypt from "bcrypt";

export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required!");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    if (hashPassword) {
      const creatingUser = await User.create({
        email,
        password: hashPassword,
      });

      if (creatingUser) {
        res.status(201).json({
          message: "User signed up successfully",
          email,
          id: creatingUser.id,
        });
      } else {
        res.status(400);
        throw new Error("Email or password are invalid!");
      }
    }
  }
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and Password are required!");
  } else {
    const checkUserRegistration = await User.findOne({ email });

    if (checkUserRegistration) {
      const comparePass = await bcrypt.compare(
        password,
        checkUserRegistration.password
      );

      console.log(comparePass, "asdfklhjsadlfkjhasdflkhj");

      if (comparePass) {
        const token = jwt.sign(
          {
            user: {
              id: checkUserRegistration._id,
              email: checkUserRegistration.email,
            },
          },
          process.env.SEC_TOKEN,
          {
            expiresIn: "45m",
          }
        );

        if (token) {
          res
            .status(200)
            .json({ message: "User Signed in succesfully", token });
        }
      } else {
        res.status(400);
        throw new Error("Invalid Password");
      }
    } else {
      res.status(400);
      throw new Error("User not registerd!");
    }
  }
});
