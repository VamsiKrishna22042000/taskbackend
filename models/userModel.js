import mongoose from "mongoose";

const userModel = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
  },
});

export default mongoose.model("User", userModel);
