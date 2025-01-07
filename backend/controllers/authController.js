import {
	passwordResetRequestSend,
	sendEmailVerificationEmail,
	sendWelcomeEmail,
	sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";
import User from "../models/User.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { generateJwtAndSetCookie } from "../utils/generateJwtAndSetCookie.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
		await sendEmailVerificationEmail(user.email, user.verificationToken);

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

export const checkAuth = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).select("-password");

		if (!user) {
			return next(
				new ErrorHandler("User not found. Authentication failed.", 404)
			);
		}

		res.status(200).json({
			success: true,
			message: "User is authenticated.",
			user,
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
		const { code } = req.body;

		if (!code) {
			return next(new ErrorHandler("verification code are required", 400));
		}

		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return next(
				new ErrorHandler("Invalid or expired verification code.", 400)
			);
		}

		//mark the user as verified
		user.isVerified = true;
		user.verificationToken = null;
		user.verificationTokenExpiresAt = null;

		await user.save();

		await sendWelcomeEmail(user.email, user.username);

		res.status(200).json({
			success: true,
			message: "Email verified successfully.",
			code: code,
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const forgotPassword = async (req, res, next) => {
	try {
		const { email } = req.body;
		if (!email) {
			return next(new ErrorHandler("Email is required.", 400));
		}

		//find user by email
		const user = await User.findOne({ email });

		if (!user) {
			return next(new ErrorHandler("User not found with this email.", 404));
		}

		//generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");

		//hash and set reset token to the user document
		const hashedToken = crypto
			.createHash("sha256")
			.update(resetToken)
			.digest("hex");

		user.resetToken = hashedToken;
		user.resetTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

		await user.save({ validateBeforeSave: false });

		//create resetUrl
		const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

		//send email to user about reset token
		await passwordResetRequestSend(user.email, resetUrl);

		res.status(200).json({
			success: true,
			message: `Password reset link sent to ${user.email}. Please check your inbox.`,
		});
	} catch (error) {
		next(error);
	}
};

export const resetPassword = async (req, res, next) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		if (!password) {
			return next(new ErrorHandler("Password is required.", 400));
		}

		//hash the reset token from url
		const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

		//find the user by reset and ensure that it has not expired yet

		const user = await User.findOne({
			resetToken: hashedToken,
			resetTokenExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return next(
				new ErrorHandler("Invalid or expired password reset token.", 400)
			);
		}

		//hash the new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//update the user password
		user.password = hashedPassword;
		user.resetToken = null;
		user.resetTokenExpiresAt = null;

		await user.save();

		//send password reset successful email
		sendPasswordResetSuccessEmail(user.email);

		res.status(200).json({
			success: true,
			message: "Password has been reset successfully",
		});
	} catch (error) {
		next(error);
	}
};
