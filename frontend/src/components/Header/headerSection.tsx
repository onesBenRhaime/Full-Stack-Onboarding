"use client";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import { useState } from "react";
const HeaderSection = () => {
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
				// localStorage.setItem("role", decodedToken.role.join(","));
				// localStorage.setItem("username", decodedToken.username);

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

	const getnbItemsInCart = async () => {
		const response = await fetch("http://localhost:5000/cart", {
			headers: { Authorization: `Bearer ${token}` },
		});
		const data = await response.json();
		console.log(data.items.length);
		const nb = data.items.length;
		if (!response.ok) {
			throw new Error("Network response  problem");
		}
		return nb;
	};

	const { data: nb } = useQuery({
		queryKey: ["nbItemsInCart"],
		queryFn: getnbItemsInCart,
		staleTime: Infinity,
	});
	return (
		<>
			{/* Header */}
			<header className="bg-white shadow">
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					{/*  border-collapse border-2  */}
					<div className="flex  justify-start rounded-3xl p-4 ">
						<Image
							src="/icons/home.png"
							className="w-15 h-8 me-4 "
							width={24}
							height={24}
							alt=""
						/>
						<h1 className="font-bold text-xl py-1 ">
							<span className="text-primary ">E-</span>Commerce
						</h1>
					</div>
					<div className=" flex justify-end ">
						<nav className="space-x-4  py-2 px-8">
							<a href="#" className="text-gray-600 hover:text-gray-800">
								About
							</a>
							<Link
								href="/products"
								className="text-gray-600 hover:text-gray-800"
							>
								Shop
							</Link>
							<a href="#" className="text-gray-600 hover:text-gray-800">
								Help
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-800">
								Profile
							</a>
							{token && (
								<button
									onClick={handleLogout}
									className="text-gray-600 hover:text-gray-800"
								>
									Logout
								</button>
							)}
						</nav>{" "}
						<div className="relative">
							{token ? (
								<div className="flex  justify-between rounded-3xl border-collapse border-2 ps-4 py-2 ">
									<Image
										src="/icons/shopping-cart.png"
										className="w-22 h-15"
										width={22}
										height={15}
										alt=""
									/>
									<Link
										href="/cart"
										className="text-gray-600 hover:text-gray-800 px-4 font-bold text-xl"
									>
										Your cart
										<span className="text-red-600">({nb ? nb : 0})</span>
									</Link>
								</div>
							) : (
								<div className="flex  justify-between  space-x-4 ">
									<Link
										href="/auth/login"
										className="bg-black text-white px-4 py-2  rounded-md hover:bg-white hover:text-black  border hover:font-bold"
									>
										Login
									</Link>

									<Link
										href="/auth/register"
										className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black  border hover:font-bold"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default HeaderSection;
