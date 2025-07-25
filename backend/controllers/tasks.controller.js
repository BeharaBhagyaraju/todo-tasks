import Task from "../models/tasks.model.js";


export const createTask = async (req  , res) => {
    try{
        const {title , description , date} = req.body;
        const userId = req.user._id;
        if(!title){
            return res.status(400).json({
                message:"Title is required",
                success:false,
            });
        }
        const task = await Task.create({
            user:userId,
            title,
            description,
            date,
        });
        res.status(201).json({
            message:"Task created successfully",
            success:true,
            task,
        });
    }catch(error){
        console.log(error);
    }
}

export const getAllTasks = async (req , res) => { 
    try{
        const userId = req.user._id;
        const tasks = await Task.find({user:userId}).sort({date:1});
        if(!tasks){
            return res.status(404).json({
                message:"No tasks found",
                success:false,
            });
        }
        res.status(201).json({
            success:true,
            tasks,
        });

    }catch(error){
        console.log(error);
    }
}

export const getTaskById = async (req , res) => {
    try{
        const task = await Task.findOne({_id:req.params.id , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        res.status(201).json({
            success:true,
            task:task,
        });

    }catch(error){
        console.log(error);
    }
}

export const updateTask = async (req , res) => {
    try{
        const task = await Task.findOne({_id:req.params.id , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        const {title , description , date} = req.body;
        
        if(title){
            task.title = title;
        }
        if(description){
            task.description = description;
        }
        if(date){
            task.date = date;
        }

        await task.save();

        const updatedTask = {
            title,
            description,
            date,
        }

        res.status(201).json({
            message:"Task updated successfully",
            success:true,
            task:updatedTask,
        })

    }catch(error){
        console.log(error);
    }
}

 export const deleteTask = async (req , res) => {
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        res.status(201).json({
            message:"Task deleted successfully",
            success:true,
        });
    }catch(error){
        console.log(error);
    }
 }

 export const addNoteToTask = async (req , res) => {
    try{
        const {noteType , content} = req.body;
        const task = await Task.findOne({_id:req.params.taskId , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        task.notes.push({noteType , content});
        await task.save();
        res.status(201).json({
            message:"Note added to task successfully",
            success:true,
            task,
        });
    }catch(error){
        console.log(error);
    }
 }

 export const updateNoteInTask = async (req , res) => {
    try{
        const {noteId} = req.params;
        const {noteType , content} = req.body;

        const task = await Task.findOne({_id:req.params.taskId , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        const note = task.notes.find(note => note._id.toString() === noteId);
        if(!note){
            return res.status(404).json({
                message:"Note not found",
                success:false,
            });
        }
        if(noteType){
            note.type = noteType;
        }
        if(content){
            note.content = content;
        }
        await task.save();
        res.status(201).json({
            message:"Note updated successfully",
            success:true,
            task,
        });

    }catch(error){
        console.log(error);   
    }
 }

 export const deleteNoteFromTask = async (req , res) => {
    try{
        const {noteId} = req.params;
        const task = await Task.findOne({_id:req.params.taskId , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        const note = task.notes.find(note => note._id.toString() === noteId);
        note.deleteOne();
        await task.save();
        res.status(201).json({
            message:"Note deleted successfully",
            success:true,
            task,
        });
    }catch(error){
        console.log(error);
    }
 }

 export const getAllNotesFromTask = async (req , res) => {
    try{
        const task = await Task.findOne({_id:req.params.taskId , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        res.status(201).json({
            success:true,
            notes:task.notes,
        });
    }catch(error){
        console.log(error);
    }
 }

//after adding the multer middleware remember bhagi you havent commited till now.

export const addFileNoteToTask = async (req , res) => {
    try{
        const task = await Task.findOne({_id:req.params.taskId , user:req.user._id});
        if(!task){
            return res.status(404).json({
                message:"Task not found",
                success:false,
            });
        }
        if(!req.file){
            return res.status(400).json({
                message:"No file uploaded",
                success:false,
            });
        }
        const fileNote = {
            noteType:"file",
            content: {
                originalName:req.file.originalname,
                mimeType:req.file.mimetype,
                buffer:req.file.buffer,
            },
        };
        task.notes.push(fileNote);
        await task.save();
        res.status(201).json({
            message:"File note added to task successfully",
            success:true,
            task,
        });
    }catch(error){
        console.log(error);
    }
}