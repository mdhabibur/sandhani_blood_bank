import React from "react";

import { motion } from "framer-motion";

const FloatingCircularBottomRight = () => {
	const bouncingAnimation = {
		animate: {
			x: [0, -30, 0], // Moves left and right
			transition: {
				duration: 6,
				repeat: Infinity,
				repeatType: "loop",
				ease: "easeInOut",
			},
		},
	};

	return (
		<motion.div
			className="absolute w-48 h-48 bg-gradient-to-br from-white to-transparent rounded-full opacity-10"
			{...bouncingAnimation}
			style={{ bottom: "-20px", right: "-20px" }}
		/>
	);
};

export default FloatingCircularBottomRight;
