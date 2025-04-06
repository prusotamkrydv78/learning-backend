import express from 'express'
import registeredUsers from './user.model.js'
const PORT = 3000;
const app = express()

app.use(express.json())
//? fetching all the users
app.get("/", (req, res) => {
    res.status(200).send("Go to /users for reigistered ussers")
})
app.get("/users", (req, res) => {
    res.send({
        staus: "sucess",
        message: "user fetched successfully",
        data: registeredUsers

    })

})


// fetch single users

app.get("/users/:userId", (req, res) => {

    let userId = req.params.userId;
    let user = registeredUsers.find(user => user.userId == userId);
    if (!user) {
        res.send({
            staus: "faild",
            message: `user with Id ${userId} not found`,
            data: user || {}
        })
        return
    }
    res.send({
        status: "sucess",
        message: `user with userId ${userId} fetched`,
        data: user
    })
})
app.post("/users", (req, res) => {
    const newUser = req.body || {};
    if (!newUser) {
        res.send({
            staus: "faild",
            message: "user unable to registerd due to some issue",
            data: newUser
        })
        return
    }
    registeredUsers.push(newUser)
    res.send({
        status: "user registered",
        message: "user is registered successfully",
        data: registeredUsers

    })
})


app.listen(PORT, () => {
    console.log("your server is listing on port ", PORT)
})