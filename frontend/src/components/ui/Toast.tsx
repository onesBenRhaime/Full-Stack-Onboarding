import React from "react";

type ToastProps = {
	title: string;
	description: string;
	variant?: "success" | "error" | "info" | "warning";
};

const variantStyles = {
	success: "bg-green-100 border-l-4 border-green-500 text-green-700",
	error: "bg-red-100 border-l-4 border-red-500 text-red-700",
	info: "bg-blue-100 border-l-4 border-blue-500 text-blue-700",
	warning: "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700",
};

const iconStyles = {
	success: (
		<svg
			className="w-6 h-6 mr-2"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
				clipRule="evenodd"
			/>
		</svg>
	),
	error: (
		<svg
			className="w-6 h-6 mr-2"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v3a1 1 0 11-2 0V9zm0 5a1 1 0 112 0v1a1 1 0 11-2 0v-1z"
				clipRule="evenodd"
			/>
		</svg>
	),
	info: (
		<svg
			className="w-6 h-6 mr-2"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M18 10A8 8 0 11-8 8 8 8 0 0118 10zm-7 4a1 1 0 11-2 0v-4a1 1 0 112 0v4zm0-6a1 1 0 11-2 0 1 1 0 112 0z"
				clipRule="evenodd"
			/>
		</svg>
	),
	warning: (
		<svg
			className="w-6 h-6 mr-2"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				d="M8.257 3.099c.763-1.36 2.723-1.36 3.486 0l6.516 11.622c.728 1.298-.192 2.879-1.742 2.879H3.483c-1.55 0-2.47-1.581-1.742-2.879L8.257 3.1zm1.75.933a1 1 0 00-1.514 0L2.215 15.655a1 1 0 00.758 1.581h14.054a1 1 0 00.758-1.58L9.993 4.032zM10 13a1 1 0 11-2 0v-2a1 1 0 112 0v2zm-1-6a1 1 0 112 0 1 1 0 01-2 0z"
				clipRule="evenodd"
			/>
		</svg>
	),
};

const Toast: React.FC<ToastProps> = ({
	title,
	description,
	variant = "info",
}) => {
	return (
		<div
			className={`flex justify-between items-center px-4 py-4 m-4 rounded-lg shadow-md ${variantStyles[variant]}`}
			role="alert"
		>
			<div className="px-4 ">{iconStyles[variant]}</div>
			<div className="flex flex-col">
				{" "}
				<h3 className="font-bold text-lg px-4 ">{title}</h3>
				<p className="px-4 ">{description}</p>
			</div>
		</div>
	);
};

export default Toast;
