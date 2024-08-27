"use client";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";

import jwt_decode from "jwt-decode";

const Footer = () => {
	const [userInfo, setUserInfo] = useState<{
		username: string;
		role: Array<string>;
	} | null>(null);
	const { data: token } = useQuery({
		queryKey: ["authToken"],
		queryFn: () => {
			const token = Cookies.get("authToken");
			if (token) {
				const decodedToken: { username: string; role: Array<string> } =
					jwt_decode(token);

				setUserInfo({
					username: decodedToken.username,
					role: decodedToken.role,
				});
			}
			return token;
		},
		staleTime: Infinity,
	});
	return (
		<>
			{/* Footer className={`bg-white shadow ${userInfo?.role.includes('admin') ? 'hidden' : ''}`} */}
			<footer
				className={`bg-gray-800 text-white py-8 mt-12  ${
					userInfo?.role.includes("admin") ? "hidden" : ""
				}`}
			>
				<div className="container mx-auto text-center space-y-4">
					<p className="font-bold">
						<span className="text-primary">E-</span>Commerce
					</p>
					<p>Full Stack Onboarding Project © 2024 ONES BEN RHAIME</p>
				</div>
			</footer>{" "}
		</>
	);
};
export default Footer;
