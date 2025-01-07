import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Loader, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../redux/auth/authApi";
import { resetAuthState } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const SignIn = () => {

	const {loading, error, success, currentUser} = useSelector((state) => state.auth) 

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleFieldChange = async (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			//email sign up
			dispatch(
				signInUser({
					url: "http://localhost:5000/api/auth/login",
					formData: formData,
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
				navigate("/");
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
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
		>
			<div className="p-8">
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
					Welcome Back
				</h2>

				{error && toast.error(error)}

				<form onSubmit={handleLogin}>
					<Input
						icon={Mail}
						name="email"
						type="email"
						placeholder="Enter email address"
						value={formData.email}
						onChange={handleFieldChange}
					/>

					<Input
						icon={Lock}
						name="password"
						type="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleFieldChange}
					/>

					<div className="flex items-center mb-6">
						<Link
							to="/forgot-password"
							className="text-sm text-green-400 hover:underline"
						>
							Forgot password?
						</Link>
					</div>

					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<Loader className="w-6 h-6 animate-spin  mx-auto" />
						) : (
							"Login"
						)}
					</motion.button>
				</form>
			</div>
		</motion.div>
	);
};

export default SignIn;
