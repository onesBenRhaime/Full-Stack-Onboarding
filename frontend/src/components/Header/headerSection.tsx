"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
const HeaderSection = () => {
	const router = useRouter();
	const { user, logout } = useAuth();

	const { cartCount } = useCart();

	return (
		<>
			{/* Header */}
			<header
				className={`bg-white shadow ${
					user?.role.includes("admin") ? "hidden" : ""
				}`}
			>
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
							<Link
								href="/"
								className="text-gray-600 hover:text-gray-800  hover:underline "
							>
								Home
							</Link>
							<Link
								href="/products"
								className="text-gray-600 hover:text-gray-800 hover:underline "
							>
								Shop
							</Link>

							<Link
								href="/wishlist"
								className="text-gray-600 hover:text-gray-800 hover:underline "
							>
								Wishlist
							</Link>
							<Link
								href="#"
								className="text-gray-600 hover:text-gray-800 hover:underline "
							>
								Profile
							</Link>
							{user && (
								<button
									onClick={logout}
									className="text-gray-600 hover:text-gray-800  hover:border-collapse hover:border  hover:border-gray-300 px-4 py-2 hover:rounded-xl hover:font-bold"
								>
									Logout
								</button>
							)}
						</nav>{" "}
						<div className="relative">
							{user ? (
								<div className="flex  justify-between rounded-3xl border-collapse border-2 ps-4 py-2 ">
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
														"you Should add products to your cart then proceed to it "
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
