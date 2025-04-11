import express from "express";
const profileRouter = express.Router();
import { LocalStorage } from "node-localstorage";
const customLocalStorage = new LocalStorage("./authData");

profileRouter.get("/", (req, res) => {
  let loginUser = customLocalStorage.getItem("user");

  let parseData = JSON.parse(loginUser);
  console.log({ ...parseData });

  const user = {
    username: "johndoe",
    fullName: "John Doe",
    email: "john@example.com",
    joinedDate: "April 07, 2025",
  };
  res.render("profile", { ...parseData, joinedDate:parseData.createdAt , });
});


export default profileRouter;
