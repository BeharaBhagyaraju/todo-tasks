import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

const corsOptions= {
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST','PUT','DELETE'],
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


//api's

app.use("/api/v1/user",userRoutes);

app.listen(PORT,async () => {
    try{
        await connectDB();
        console.log(`Server is running on port ${process.env.PORT}`);
    }catch(err){
        console.log(err);
    }
});
