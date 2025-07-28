import express from "express";
import { createAndUpdateDailyProgress, getDailyProgress } from "../controllers/progress.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/updatedailyprogress").post(isAuthenticated,createAndUpdateDailyProgress);
router.route("/getdailyprogress/:date").get(isAuthenticated,getDailyProgress);

export default router;
