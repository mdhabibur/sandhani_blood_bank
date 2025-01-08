import React from "react";

const NotFoundPage = () => {
	return (
		<div className="flex flex-col items-center justify-center bg-gray-100 text-center rounded-lg p-8">
			<h1 className="text-6xl font-bold text-red-500">404</h1>
			<p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
		</div>
	);
};

export default NotFoundPage;
