import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title: {
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    date :{
        type:Date,
        required:true,
    },

    completed:{
        type:Boolean,
        default:false,
    },
    
    notes:[
        {
            noteType : { 
                type : String , 
                enum : ["text" , "image" , "file"],
                required:true,
            },
            content:{
                type:String,
            },
        },
    ],
},{timestamps:true});

const Task = mongoose.model("Task",taskSchema);
export default Task;