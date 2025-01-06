import React from "react";
import { motion } from "framer-motion";

const FloatingCircularTopBottom = () => {
	const floatingAnimation = {
		animate: {
			y: [0, -40, 0],
			transition: {
				duration: 4,
				repeat: Infinity,
				repeatType: "loop",
				ease: "easeInOut",
			},
		},
	};

	return (
		<motion.div
			className="absolute w-64 h-64 bg-gradient-to-br from-white to-transparent rounded-full opacity-30"
			{...floatingAnimation}
			style={{ top: "-50px", left: "-50px" }}
		/>
	);
};

export default FloatingCircularTopBottom;
