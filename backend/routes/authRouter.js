import express, { Router } from 'express'
import { singUp, login, logout, verifyEmail, forgotPassword, resetPassword} from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/signUp', singUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)

authRouter.post('/verify-email', verifyEmail)

authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password/:token', resetPassword)



export default authRouter