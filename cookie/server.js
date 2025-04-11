import exprss from 'express'

const app = exprss();
const PORT = 3000;

app.set("view engine","ejs")
app.use(exprss.static("views"))

const users = [
    { username: 'john.doe', name: 'John Doe', password: 'password123' },
    { username: 'jane.smith', name: 'Jane Smith', password: 'securepass' },
    { username: 'peter.pan', name: 'Peter Pan', password: 'flyhigh' }
];

app.get("/", (req, res) => {
    res.render("home")

})
app.get("/login", (req, res) => {
    res.render("login",{errorMessage:false})

})
app.get("/profile", (req, res) => {
    res.render("profile",{username:"test",name:"test"})

})

app.listen(PORT, () => {
    console.log("server is listing on port ", PORT)
})