import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Users are loaded successfully",
  });
});

export default userRouter;
