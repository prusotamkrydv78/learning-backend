import express from 'express';
import mongoose from 'mongoose';
import userModel from './user.model.js';

const PORT = 3000;
const app = express();

// connect to MongoDB
mongoose.connect("mongodb://localhost:27017/testing")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.error("problem at database connecting time", err);
  });

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", async (req, res) => {
  try {
      console.log(req.body)
    const { name, email, password } = await req.body;
    const newUser = new userModel({ name, email, password });

    await newUser.save();
    console.log("user saved successfully");
    res.send("user saved");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("error saving user");
  }
});

app.listen(PORT, () => {
  console.log(`the server is listening on port ${PORT}`);
});
