import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { animate, motion } from "framer-motion";

import FloatingShape from "./components/FloatingShape";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/routeProtection/PublicRoute";
import PrivateRoute from "./components/routeProtection/PrivateRoute";

function App() {
	return (
		<div
			className="min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
		>
			<FloatingShape
				color="bg-green-500"
				size="w-64 h-64"
				top="-5%"
				left="10%"
				delay={0}
			/>
			<FloatingShape
				color="bg-emerald-500"
				size="w-48 h-48"
				top="70%"
				left="80%"
				delay={5}
			/>
			<FloatingShape
				color="bg-lime-500"
				size="w-32 h-32"
				top="40%"
				left="-10%"
				delay={2}
			/>

			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<PublicRoute>
								<SignIn />
							</PublicRoute>
						}
					/>
					<Route
						path="/signup"
						element={
							<PublicRoute>
								<SignUp />
							</PublicRoute>
						}
					/>
					<Route path="/verify-email" element={<EmailVerificationPage />} />
				</Routes>
			</BrowserRouter>

			<Toaster />
		</div>
	);
}

export default App;
