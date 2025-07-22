import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config();
const app = express();

app.listen(process.env.PORT,async () => {
    try{
        await connectDB();
        console.log(`Server is running on port ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
});
