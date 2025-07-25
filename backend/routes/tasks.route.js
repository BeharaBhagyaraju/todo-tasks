import express from "express";
import  isAuthenticated  from "../middlewares/isAuthenticated.js";
import { uploadNote } from "../middlewares/multer.js";
import { createTask , getAllTasks , getTaskById , updateTask , deleteTask , addNoteToTask , updateNoteInTask , deleteNoteFromTask , getAllNotesFromTask , addFileNoteToTask } from "../controllers/tasks.controller.js";

const router = express.Router();

//task routes.....
router.post("/create",isAuthenticated,createTask);
router.get("/all",isAuthenticated,getAllTasks);
router.get("/:id",isAuthenticated,getTaskById);
router.put("/update/:id",isAuthenticated,updateTask);
router.delete("/delete/:id",isAuthenticated,deleteTask);

//note routes.....
router.post("/note/:taskId",isAuthenticated,addNoteToTask);
router.put("/note/update/:taskId/:noteId",isAuthenticated,updateNoteInTask);
router.delete("/note/delete/:taskId/:noteId",isAuthenticated,deleteNoteFromTask);
router.get("/note/all/:taskId",isAuthenticated,getAllNotesFromTask);

//uploading the file to the note......
router.post("/note/upload/:taskId",isAuthenticated,uploadNote,addFileNoteToTask);

export default router;