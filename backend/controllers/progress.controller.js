import DailyProgress from "../models/progress.model.js";

export const createAndUpdateDailyProgress = async (req, res) => {
    try{
        const userId = req.user._id;
        const {date , tasksCompleted , totalTasks} = req.body;  
        console.log(req.body);

        let existingProgress =  await DailyProgress.findOne({user:userId,date:date});
        if(existingProgress){
            if(tasksCompleted) existingProgress.tasksCompleted = tasksCompleted;
            if(totalTasks) existingProgress.totalTasks = totalTasks;
        }else{
            existingProgress = new DailyProgress({
                user:userId,
                date,
                tasksCompleted,
                totalTasks,
            });

        }

        await existingProgress.save();

        res.status(200).json({
            success:true,
            message:"Daily progress created/updated successfully",
            data:existingProgress,
        });

    }catch(error){
        console.log(error);
    }
}

export const getDailyProgress  = async (req , res) => {
    try{
        const userId = req.user._id;
        const {date} = req.params;

        const progress = await DailyProgress.findOne({user:userId,date:date});
        
        if(!progress){
            return res.status(404).json({
                success:false,
                message:"No progress found for this date", 
            });
        }

        res.status(200).json({
            success:true,
            message:"Daily progress fetched successfully",
            data:progress,
        });

    }catch(error){
        console.log(error);
    } 
}