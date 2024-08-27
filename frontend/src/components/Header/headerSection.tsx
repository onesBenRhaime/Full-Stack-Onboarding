"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";

const HeaderSection = () => {
	const [isClient, setIsClient] = useState(false);
	const [isAdminRoute, setIsAdminRoute] = useState(false);
	const { user, logout } = useAuth();
	const { cartCount } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		// Check if we are on the client-side
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isClient) {
			const router = useRouter();
			// Check if the current route includes "/admin"
			if (router.pathname.includes("/admin")) {
				setIsAdminRoute(true);
			} else {
				setIsAdminRoute(false);
			}
		}
	}, [isClient]);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	if (!isClient) return null; // Don't render the component on the server

	return (
		<>
			{/* Header */}
			<header className={`bg-white shadow ${isAdminRoute ? "hidden" : ""}`}>
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					<div className="flex justify-start rounded-3xl p-4 ">
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
					<div className="lg:hidden flex justify-between ">
						{!user && (
							<div className="flex justify-between space-x-4">
								<Link
									href="/auth/login"
									className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
								>
									Login
								</Link>

								<Link
									href="/auth/register"
									className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
								>
									SignIn
								</Link>
							</div>
						)}
						<button
							onClick={toggleMenu}
							className="text-gray-600 hover:text-gray-800 ms-10"
						>
							<Image
								src="/icons/hamburger.png"
								className="w-6 h-6"
								width={6}
								height={6}
								alt="Menu"
							/>
						</button>
					</div>
					<div className="hidden lg:flex justify-end z-auto">
						<nav className="space-x-4 py-2 px-8">
							<Link
								href="/"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Home
							</Link>
							<Link
								href="/products"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Shop
							</Link>
							{user && (
								<>
									<Link
										href="/wishlist"
										className="text-gray-600 hover:text-gray-800 hover:underline"
									>
										Wishlist
									</Link>

									<Link
										href="#"
										className="text-gray-600 hover:text-gray-800 hover:underline"
									>
										Profile
									</Link>

									<button
										onClick={logout}
										className="text-gray-600 hover:text-gray-800 hover:border-collapse hover:border hover:border-gray-300 px-4 py-2 hover:rounded-xl hover:font-bold"
									>
										Logout
									</button>
								</>
							)}
						</nav>
						<div className="relative">
							{user ? (
								<div className="flex justify-between rounded-3xl border-collapse border-2 ps-4 py-2">
									<Image
										src="/icons/shopping-cart.png"
										className="w-22 h-15"
										width={22}
										height={15}
										alt=""
									/>
									<button
										onClick={() => {
											cartCount == 0
												? alert(
														"You should add products to your cart then proceed to it"
												  )
												: router.push("/cart");
										}}
										className="text-gray-600 hover:text-gray-800 px-4 font-bold text-xl"
									>
										Your cart
										<span className="text-red-600 me-1">({cartCount})</span>
									</button>
								</div>
							) : (
								<div className="flex justify-between space-x-4">
									<Link
										href="/auth/login"
										className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
									>
										Login
									</Link>

									<Link
										href="/auth/register"
										className="bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<div className="lg:hidden relative w-1/2 right-0 bg-white shadow-lg p-4">
						<nav className="flex flex-col space-y-4">
							<Link
								href="/"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Home
							</Link>
							<Link
								href="/products"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Shop
							</Link>
							<Link
								href="/wishlist"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Wishlist
							</Link>
							<Link
								href="#"
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Profile
							</Link>
							{user && (
								<button
									onClick={logout}
									className="text-gray-600 hover:text-gray-800 hover:border-collapse hover:border hover:border-gray-300 px-4 py-2 hover:rounded-xl hover:font-bold"
								>
									Logout
								</button>
							)}
							{user ? (
								<div className="flex justify-between rounded-3xl border-collapse border-2 ps-4 py-2">
									<Image
										src="/icons/shopping-cart.png"
										className="w-22 h-15"
										width={22}
										height={15}
										alt=""
									/>
									<button
										onClick={() => {
											cartCount == 0
												? alert(
														"You should add products to your cart then proceed to it"
												  )
												: router.push("/cart");
										}}
										className="text-gray-600 hover:text-gray-800 px-4 font-bold text-xl"
									>
										Your cart
										<span className="text-red-600 me-1">({cartCount})</span>
									</button>
								</div>
							) : (
								""
							)}
						</nav>
					</div>
				)}
			</header>
		</>
	);
};

export default HeaderSection;
