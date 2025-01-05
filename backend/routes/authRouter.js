import express from 'express'
import { singUp, login, logout, verifyEmail} from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/signUp', singUp)
authRouter.post('/login', login)
authRouter.post('/logout', logout)


authRouter.post('/verify-email', verifyEmail)



export default authRouter