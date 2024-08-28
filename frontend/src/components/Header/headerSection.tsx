"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import { useWishlist } from "@/Context/WishlistContext";
import ModalInfo from "../ui/ModalInfo";
import ModalCartInfo from "../ui/ModalCartInfo";

const HeaderSection = () => {
	const router = useRouter();
	const { user, logout } = useAuth();
	const { wishlistCount } = useWishlist();
	const { cartCount } = useCart();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalCartOpen, setIsModalCartOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<>
			<header className={`bg-white shadow`}>
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					<div className="flex justify-start rounded-3xl p-4 ">
						<h1 className="font-bold text-xl py-1 ">
							<span className="text-primary text-3xl ">E-</span>Commerce
						</h1>
					</div>
					<div className="lg:hidden flex justify-between ">
						{!user && (
							<div className="flex justify-between space-x-4">
								<Link
									href="/auth/login"
									className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
								>
									Login
								</Link>

								<Link
									href="/auth/register"
									className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
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

							<button
								onClick={() => {
									if (user) {
										router.push("/products");
									} else {
										setIsMenuOpen(true);
									}
								}}
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Shop
							</button>

							{user && (
								<>
									<Link
										href="/wishlist"
										className="text-gray-600 hover:text-gray-800 hover:underline"
									>
										Wishlist ({wishlistCount})
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
												? setIsModalCartOpen(true)
												: router.push("/cart");
										}}
										className="text-gray-600 hover:text-gray-800 px-4 font-bold text-xl"
									>
										Your cart
										<span className="text-primary me-1">({cartCount})</span>
									</button>
								</div>
							) : (
								<div className="flex justify-between space-x-4">
									<Link
										href="/auth/login"
										className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
									>
										Login
									</Link>

									<Link
										href="/auth/register"
										className="bg-primary text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border hover:font-bold"
									>
										SignIn
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<div className="lg:hidden relative w-1/2 right-0 bg-white shadow-lg p-4">
						<nav className="flex flex-col space-y-4">
							<button
								onClick={() => {
									router.push("/");
								}}
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Home
							</button>
							<button
								onClick={() => {
									if (user) {
										router.push("/products");
									} else {
										setIsModalOpen(true);
									}
								}}
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Shop
							</button>
							<button
								onClick={() => {
									if (user) {
										router.push("/wishlist");
									} else {
										setIsModalOpen(true);
									}
								}}
								className="text-gray-600 hover:text-gray-800 hover:underline"
							>
								Wishlist
							</button>
							{user && (
								<>
									<button
										onClick={() => {
											router.push("/profile");
										}}
										className="text-gray-600 hover:text-gray-800 hover:underline"
									>
										Profile
									</button>

									<button
										onClick={logout}
										className="text-gray-600 hover:text-gray-800 hover:border-collapse hover:border hover:border-gray-300 px-4 py-2 hover:rounded-xl hover:font-bold"
									>
										Logout
									</button>
								</>
							)}
							{user ? (
								<>
									<button
										onClick={() => {
											cartCount == 0
												? setIsModalCartOpen(true)
												: router.push("/cart");
										}}
										className="flex justify-center  px-4 font-bold text-xl text-gray-600 hover:text-gray-800 hover:border-collapse hover:border hover:border-gray-300  py-2 hover:rounded-xl hover:font-bold"
									>
										<Image
											src="/icons/shopping-cart.png"
											className="w-22 h-15"
											width={22}
											height={15}
											alt=""
										/>
										<span className="text-primary px-2 mt-0">
											({cartCount})
										</span>
									</button>
								</>
							) : (
								""
							)}
						</nav>
					</div>
				)}
				<ModalInfo isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
				<ModalCartInfo
					isOpen={isModalCartOpen}
					onClose={() => setIsModalCartOpen(false)}
				/>
			</header>
		</>
	);
};

export default HeaderSection;
