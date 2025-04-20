import express from "express";
import ejs from "ejs";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/session")
  .then(() => console.log("The database is connected successfully"))
  .catch((err) => console.log("Error while connecting database", err));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "aslkdfjl;a",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/session",
    }),
    cookie: {
      maxAge: 60 * 60 * 100,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log(req.session.userData)
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const isUserExist = await userModel.findOne({
      username: user.username,
      password: user.password,
    });
    req.session.userData = isUserExist
    console.log(isUserExist);
    if (isUserExist) {
      res.redirect("/");
    } else {
      throw Error;
    }
  } catch (error) {
    res.json({
      status: "Success",
      message: "user login faild" + error,
      user: {},
    });
  }
});
app.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userModel.create({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    await newUser.save();

    res.json({
      status: "Success",
      message: "user register successfully",
      user: { ...user },
    });
  } catch (error) {
    res.json({
      status: "Success",
      message: "user register faild" + error,
      user: {},
    });
  }
});

app.listen(PORT, () => {
  console.log("upir server si sing");
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const userModel = new mongoose.model("users", userSchema);
