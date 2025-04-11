import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect("mongodb://localhost:27017/cookie").then(() => {
        console.log("the database is connected successfuly")

    }).catch((err) => {
        console.log("Error while connecting to the databse", err)

    })
}

export default connectDb;