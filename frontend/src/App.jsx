import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { animate, motion } from "framer-motion";
import FloatingCircularTopBottom from "./components/floatingCircularTopBottom";
import FloatingCircularBottomRight from "./components/FloatingCircularBottomRight";

function App() {
	return (
		<div className="relative min-h-screen bg-gradient-to-br from-[#577BC1] via-[#A888B5] to-[#85A947] overflow-hidden ">

			<FloatingCircularTopBottom />
			<FloatingCircularBottomRight />

			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/singup" element={<SignUp />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
