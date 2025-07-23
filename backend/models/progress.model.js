import mongoose from "mongoose";

const progressSchema  = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    date :{
        type:Date,
        required:true,
    },
    tasksCompleted:{
        type:Number,
        default:0,
    },
    totalTasks:{
        type:Number,
        default:0,
    },
},{timestamps:true});

const DailyProgress = mongoose.model("DailyProgress",progressSchema);
export default DailyProgress;