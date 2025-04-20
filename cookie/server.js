import exprss from 'express'
import cookieParser from 'cookie-parser';
import connectDb from './con.js';
import userModel from './user.model.js';
const app = exprss();
const PORT = 3000;

connectDb()
app.set("view engine", "ejs")
app.use(exprss.static("views"))
app.use(exprss.json())
app.use(exprss.urlencoded({ extended: true }))
app.use(cookieParser());

const users = [
    { username: 'test', name: 'John Doe', password: 'test' },
    { username: 'jane.smith', name: 'Jane Smith', password: 'securepass' },
    { username: 'peter.pan', name: 'Peter Pan', password: 'flyhigh' }
];

const isCookie = (req, res, next) => {

    const user = req.cookies.loginUser

    if (user) {
        next()
    } else {
        res.redirect("/login")
    }

}

app.get("/", (req, res) => {
    res.render("home")

})
app.get("/login", (req, res) => {
    res.render("login", { errorMessage: false })

})
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const isUserValid = users.find((user) => user.username == username && user.password == password)
    if (isUserValid) {
        res.cookie("loginUser", JSON.stringify({ username: isUserValid.username, name: isUserValid.name }), {
            maxAge: 3 * 24 * 60 * 1000,
            httpOnly: true,
            secure: false,
            priority: "high"
        })
        res.redirect("/profile")
    } else {
        res.redirect("/login")
    }
})
app.get("/profile", isCookie, (req, res) => {
    const user = req.cookies.loginUser
    const parsedUser = JSON.parse(user)

    console.log(parsedUser)
    res.render("profile", { ...parsedUser })
})
app.get("/logout", (req, res) => {
    res.clearCookie("loginUser")
    console.log('cookie is cleared')
    res.redirect("/")
})

app.get('/register', (req, res) => {
    res.render("register")
})
app.post('/register', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const isUserExited = await userModel.findOne({ username })
        console.log(isUserExited)
        if (isUserExited) {
            res.send("user is already exit with this username")
            return
        }
        await userModel.create({ name, username, password })
        console.log({ name, username, password })
        res.redirect("/login")
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log("server is listing on port ", PORT)
})

///middle ware
