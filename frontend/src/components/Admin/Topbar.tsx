"use client";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import { useState } from "react";
const Topbar = () => {
	const router = useRouter();
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

	const handleLogout = () => {
		Cookies.remove("authToken");
		router.push("/auth/login");
	};

	return (
		<>
			<div className="bg-white p-4 flex justify-end items-center me-8 ">
				<div className="flex justify-between items-center space-x-4">
					<span className="font-semibold">{userInfo?.username}</span>
					<button
						className="  text-black px-4 py-2 rounded-xl hover:bg-primary hover:text-black  border-collapse border-2 border-primary"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</>
	);
};

export default Topbar;
