import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const EmailVerifiedRoute = ({ children }) => {
	const { currentUser } = useSelector((state) => state.auth);

	let componentToRender;

	if (!currentUser.isVerified) {
		componentToRender = children;
	} else {
		componentToRender = <Navigate to="/login" />;
	}

	return componentToRender;
};

export default EmailVerifiedRoute;
