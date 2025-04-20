import express from 'express'

const app = express()
const PORT = 3000;


app.use((req,res,next)=>{
    const isError = true;

    if(isError){
        const err = new Error("An error is occured")
        next(err.message)
    }else{
        next()
    }
})

app.get("/",(req,res)=>{
    res.send("hello backend")
})

app.listen(PORT,()=>{
    console.log("Your server is listing on port ", PORT)
})

