import express from 'express'
import { singUp } from '../controllers/authController.js';

const authRouter = express.Router();
authRouter.post('/signUp', singUp)


export default authRouter