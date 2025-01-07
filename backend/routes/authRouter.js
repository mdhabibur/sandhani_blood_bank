import express, { Router } from "express";
import {
	singUp,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/signup", singUp);
authRouter.post("/login", login);
authRouter.get("/check-auth", verifyToken, checkAuth);

authRouter.post("/logout", logout);

authRouter.post("/verify-email", verifyEmail);

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
