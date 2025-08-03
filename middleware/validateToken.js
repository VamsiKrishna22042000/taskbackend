import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const validateToken = asyncHandler(async (req, res, next) => {
  const obtainedToken = req.headers.authorization || req.headers;

  if (obtainedToken) {
    if (typeof obtainedToken !== "string") {
      res.status(400);
      throw new Error("Unauthorized User");
    }

    const token = obtainedToken.split(" ")[1];
    jwt.verify(token, process.env.SEC_TOKEN, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized User");
      } else {
        req.user = decode.user;
        next();
      }
    });
  }

  if (!obtainedToken) {
    res.status(400);
    throw new Error("Token is required");
  }
});

export default validateToken;
