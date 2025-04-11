import express from 'express' 
import registeredUsers from '../user.model.js'

const userRouter = express.Router()

userRouter.get("/", (req, res) => {
    res.send({
        staus: "sucess",
        message: "user fetched successfully",
        data: registeredUsers
    })
})
// fetch single users
userRouter.get("/:userId", (req, res) => {

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
userRouter.post("/", (req, res) => {
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
userRouter.put("/", (req, res) => {
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
userRouter.delete("/:userId", (req, res) => {

    res.json({
        staus: "faild",
        message: "user unable to registerd due to some issue",
        data: {}
    })

})





export default userRouter;