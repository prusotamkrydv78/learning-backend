import express from "express";
import mongoose from "mongoose"; 
import authRouter from "./routers/auth.router.js"; 
import profileRouter from "./routers/profile.router.js";
import userRouter from "./routers/users.router.js";
const app = express();
const PORT = 3000;

// connecting to the database
mongoose
  .connect("mongodb://localhost:27017/profile")
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log("Getting Error while connecting to the database", err);
  });

//handling middlewares

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());
app.use("/user", userRouter);
app.use("/auth",authRouter);
app.use("/profile",profileRouter)

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "home page loaded successfully",
  });
});

 

app.listen(PORT, () => {
  console.log(`The server is listing on port  ${PORT}`);
});
