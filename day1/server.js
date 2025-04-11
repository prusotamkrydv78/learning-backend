import express from 'express'
import isAuthorized from './authentication/isAuthorized.js';
import userRouter from './router/user.router.js';
const PORT = 3000;
const app = express()

app.use(express.json())
//? fetching all the users
app.get("/", (req, res) => {
    res.status(200).send("Go to /users for reigistered ussers")
})

app.use('/users', userRouter)
app.get("/profile", isAuthorized, (req,res) => {
    res.json({
        message: "your name is pursotam"
    })
})


app.listen(PORT, () => {
    console.log("your server is listing on port ", PORT)
})