import jwt from 'jsonwebtoken'
import { ErrorHandler } from '../utils/errorHandler.js';

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token){
            return next(new ErrorHandler("No token provided. Authorization denied.", 401));
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded || !decoded.id){
            return next(new ErrorHandler("Invalid token. Authorization denied.", 401));
        }

        req.userId = decoded.id
        next()

    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token.", 401));
    }
}