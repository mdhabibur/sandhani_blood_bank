import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/authApi";
import { resetAuthState } from "../redux/auth/authSlice";
import toast from "react-hot-toast";

const Home = () => {
	const {loading, error, success, currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()

	const handleLogout = async (e) => {
		e.preventDefault();

    console.log("logout")
		try {
			//email sign up
			dispatch(
				logoutUser({
					url: "/api/auth/logout",
				})
			);
		} catch (error) {
			//frontend error
			console.log("frontend Error: ", error);
		}
	};

	useEffect(() => {
		//timer object
		let timer;
		if (error || success) {
			if (success) {
				dispatch(resetAuthState());
				navigate("/login");
				toast.success(success);
				return;
			}

			timer = setTimeout(() => {
				dispatch(resetAuthState());
			}, 3000);
		}

		//cleanup timer on unmount
		return () => clearTimeout(timer);
	}, [error, success, dispatch, navigate]);



	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
		>
			<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
				Dashboard
			</h2>

			<div className="space-y-6">
				<motion.div
					className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className="text-xl font-semibold text-green-400 mb-3">
						Profile Information
					</h3>

					<p className="text-gray-300">
						<span className="font-bold">Name: </span>
						{currentUser.username}
					</p>

					<p className="text-gray-300">
						<span className="font-bold">Email: </span>
						{currentUser.email}
					</p>
				</motion.div>

				<motion.div
					className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className="text-xl font-semibold text-green-400 mb-3">
						Account Activity
					</h3>

					<p className="text-gray-300">
						<span className="font-bold">Joined: </span>
						{new Date(currentUser.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className="text-gray-300">
						<span className="font-bold">Last Login: </span>
						{currentUser.lastLogin}
					</p>
				</motion.div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="mt-4"
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
				>
					Logout
				</motion.button>
			</motion.div>
		</motion.div>
	);
};

export default Home;
