import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import authRouter from "./routes/authRouter.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: ["http://localhost:5173", "http://localhost:5173/"],
		credentials: true,
	})
);

const PORT = process.env.PORT || 5000;

//define a test route
app.get("/", (req, res) => {
	res.send("Backend server is running...");
});

//backend routes
app.use("/api/auth", authRouter);

//frontend routes (for production) as in production both backend and frontend domain will be run under a single domain and single server

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	//get current directory location

	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	//serving static production build 'dist' folder for frontend

	//for any route other that /api route, serve the static files from frontend
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

//error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});
