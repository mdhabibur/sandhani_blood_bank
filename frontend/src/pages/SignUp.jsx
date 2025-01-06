import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/auth/authApi";
import { resetSignUpState } from "../redux/auth/authSlice";
const SignUp = () => {

    const {loading, error, success, currentUser} = useSelector((state) => state.auth) 


    const [formData, setFormData] = useState({
        username: '',
        email: '', 
        password: ''
      })


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFieldChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
      }

	const handleSignUp = async (e) => {
		e.preventDefault();

        try {

            //email sign up
            dispatch(signUpUser({url: "http://localhost:5000/api/auth/signup" ,formData:formData}))
            
          } catch (error) {
            //frontend error
            console.log("frontend Error: ", error)
      
          }
	};

    useEffect(() => {

        //timer object
        let timer 
        if(error || success){
    
          if(success){
            dispatch(resetSignUpState())
            navigate('/verify-email')
            return
          }
      
          timer = setTimeout(() => {
            dispatch(resetSignUpState())
          }, 3000)
        }
    
        //cleanup timer on unmount
        return () => clearTimeout(timer)
    
    
      }, [error, success, dispatch, navigate])



	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1 }}
			className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
		>
			<div className="p-8">
				<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
					Create Account
				</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
                        name="username"
						type="text"
						placeholder="username"
						value={formData.username}
						onChange={handleFieldChange}
					/>

					<Input
						icon={Mail}
                        name="email"
						type="email"
						placeholder="Email Address"
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

					<PasswordStrengthMeter password={formData.password} />

					<motion.button
						className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="submit"
						disabled={loading}
					>
						{loading ? (
							<Loader className=" animate-spin mx-auto" size={24} />
						) : (
							"Sign Up"
						)}
					</motion.button>
				</form>
			</div>

			<div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
				<p className="text-sm text-gray-400">
					Already have an account?{" "}
					<Link to={"/signin"} className="text-green-400 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};

export default SignUp;
