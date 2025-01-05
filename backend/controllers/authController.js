import { sendEmailVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import User from "../models/User.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { generateJwtAndSetCookie } from "../utils/generateJwtAndSetCookie.js";
import bcrypt from "bcryptjs";

export const singUp = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return next(new ErrorHandler("All fields are required", 400));
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return next(new ErrorHandler("User already exists with this email", 409));
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Generate a random 6-digit verification token
		const verificationToken = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		//set the verification token for 24 hours
		const verificationTokenExpiresAt = new Date(
			Date.now() + 24 * 60 * 60 * 1000
		);

		// Create a new user
		const user = new User({
			username,
			email,
			password: hashedPassword,
			verificationToken,
			verificationTokenExpiresAt,
		});

		await user.save();

        //send email for user email verification
        await sendEmailVerificationEmail(user.email, user.verificationToken)


		// Generate JWT and setCookie
		generateJwtAndSetCookie(user, res);

		res.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		// Validate input
		if (!email || !password) {
			return next(new ErrorHandler("Email and password are required.", 400));
		}

		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorHandler("Invalid credentials.", 401));
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new ErrorHandler("Invalid credentials.", 401));
		}

		// Check if the user's email is verified
		// if (!user.isVerified) {
		// 	return next(new ErrorHandler("Email is not verified.Please verify it", 403));
		// }

		//Generate JWT and set cookie
		generateJwtAndSetCookie(user, res);

		//update last login
		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Login successful.",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		//clear the cookie containing the token
		res.cookie("token", "", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Secure in production
			sameSite: "strict",
			expires: new Date(0), //expires the cookie immediately
		});

		res.status(200).json({
			success: true,
			message: "Logout successful.",
		});
	} catch (error) {
        next(error); 
    }
};


export const verifyEmail = async (req, res, next) => {
    try {
        const {email, code} = req.body

        if(!email || !code){
            return next(new ErrorHandler("Email and verification code are required", 400))
        }

        const user = await User.findOne({email})
        if(!user){
            return next(new ErrorHandler("User not found", 404))
        }

        //check if the user is already verified
        if(user.isVerified){
            return next(new ErrorHandler("Email is already verified.", 400));
        }

        //verify the token and expiration time
        const isTokenValid = user.verificationToken === code && user.verificationTokenExpiresAt > Date.now()

        if(!isTokenValid){
            return next(new ErrorHandler("Invalid or expired verification code.", 400));
        }

        //mark the user as verified
        user.isVerified = true
        user.verificationToken = null
        user.verificationTokenExpiresAt = null

        await user.save()

        await sendWelcomeEmail(user.email, user.username)

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
          });
        
    } catch (error) {
        next(error)
    }

}
