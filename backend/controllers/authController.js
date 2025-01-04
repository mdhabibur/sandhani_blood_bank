import User from "../models/User.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { generateJwtAndSetCookie } from "../utils/generateJwtAndSetCookie.js";
import bcrypt from 'bcryptjs'

export const singUp = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

        if(!username || !email || !password){
            return next(new ErrorHandler("All fields are required", 400))
        }

        const existingUser  = await User.findOne({email})
        if(existingUser){
            return next(new ErrorHandler("User already exists with this email", 409))
        }

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Generate a random 6-digit verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();


		//set the verification token for 24 hours
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Create a new user
		const user = new User({
			username,
			email,
			password: hashedPassword,
			verificationToken,
			verificationTokenExpiresAt,
		});

		await user.save();

		// Generate JWT and setCookie
		generateJwtAndSetCookie(user, res);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password:undefined,
            }
        })

	} catch (error) {
        next(error)
    }
};
