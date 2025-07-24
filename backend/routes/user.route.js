import express from "express";
import { loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/profile/update").post(isAuthenticated,updateUser);

export default router;
