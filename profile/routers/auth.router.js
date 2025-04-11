import express from "express";
import usersModel from "../model/users.model.js";
import { LocalStorage } from 'node-localstorage';
const customLocalStorage = new LocalStorage('./authData');
const authRouter = express.Router();

authRouter.get("/register", (req, res) => {
  res.render("register");
});

authRouter.post("/register", async (req, res) => {
  const user = req.body;
  const newUser = new usersModel({ ...user });
  if (newUser) {
    
    await newUser.save();
    res.redirect("/auth/login");
  } else {
    res.json({
      status: "faild",
      message: "faild to add user",
    });
  }
});

authRouter.get("/login", (req, res) => {
  res.render("login");
});
authRouter.post("/login", async (req, res) => {
  try {
    const { password, username } = req.body;

    const allUsers = await usersModel.find();
    const isUserExist = allUsers.find(
      (user) => user.password == password && user.username == username
    );
    if (isUserExist) { 

      customLocalStorage.setItem("user",JSON.stringify(isUserExist))
      res.redirect("/profile");
    } else {
      res.json({
        status: "success",
        message: "user is not exit",
      });
    }
  } catch (err) {
    res.json({
      status: "failed",
      message: "unable to find user",
    });
    console.log(err);
  }
});

export default authRouter;
