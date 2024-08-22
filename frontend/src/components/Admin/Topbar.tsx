"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

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
		<div className="bg-white p-4 flex justify-between items-center lg:justify-end">
			<span className="font-semibold text-sm lg:text-base">
				{userInfo?.username}
			</span>
			<button
				className="ml-4 text-black px-3 py-1 text-sm lg:text-base rounded-xl hover:bg-primary hover:text-black border-2 border-primary"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
};

export default Topbar;
