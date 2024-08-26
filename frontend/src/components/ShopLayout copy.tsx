// components/ShopLayout.js

import Image from "next/image";
import React from "react";
import ProductCard from "./Products/ProductCard";

const ShopLayout = () => {
	return (
		<div className="bg-gray-50 text-gray-800 min-h-screen">
			{/* Header */}
			<header className="bg-white shadow">
				<div className="container mx-auto flex justify-between items-center py-4 px-6">
					<div className="flex  justify-start rounded-3xl p-4 border-collapse border-2 ">
						<Image
							src="/icons/home.png"
							className="w-15 h-8 me-2 "
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
							<a href="#" className="text-gray-600 hover:text-gray-800">
								Shop
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-800">
								Help
							</a>
							<a href="#" className="text-gray-600 hover:text-gray-800">
								Profile
							</a>
						</nav>{" "}
						<div className="relative">
							<div className="flex  justify-between rounded-3xl border-collapse border-2 ps-4 py-2 ">
								<Image
									src="/icons/shopping-cart.png"
									className="w-22 h-15"
									width={22}
									height={15}
									alt=""
								/>
								<a
									href="#"
									className="text-gray-600 hover:text-gray-800 px-4 font-bold text-xl"
								>
									Your cart <span className="text-red-600">(0)</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Tagline 
			<div className="bg-gray-100 text-center py-8">
				<h1 className="text-2xl font-semibold">
					Tagline: Your Gateway to Stylish Finds
				</h1>
			</div>
                                */}
			{/* Main Content */}
			<div className="container mx-auto p-6">
				{/* Hero Section */}
				<section className="bg-white shadow rounded-lg p-6 mb-8 text-center">
					<div
						className="bg-gray-200 rounded-md mb-4 relative flex items-center justify-center"
						style={{
							backgroundImage: "url('/images/hero-3.png')",
							backgroundSize: "cover",
							height: "300px",
							backgroundPosition: "center",
						}}
					>
						{/* <div className="absolute top-1/2 transform -translate-y-1/2 text-center p-4  ">
							<p className="text-lg font-semibold text-white">Save up to 50%</p>
							<p className="text-white">Ends tomorrow</p>
						</div> */}
					</div>
				</section>

				{/* Search Bar */}
				<section className="flex items-center justify-center ">
					<div className="relative flex items-center justify-center w-1/2 mb-8 py-4 text-center">
						<input
							type="text"
							className="rounded-xl w-full bg-white border border-gray-300 py-3 px-4"
							placeholder="Search for products"
						/>
						<button className="absolute  right-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-lg px-4 py-2">
							<Image
								src="/icons/search.png"
								className="object-cover"
								width={24}
								height={24}
								alt=""
							/>
						</button>
					</div>
				</section>

				{/* New Arrivals */}
				<section className="mb-8">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold">New Arrivals</h2>
						<a href="#" className="text-sm text-gray-600 hover:text-gray-800">
							View all
						</a>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
					</div>
				</section>

				{/* Hottest Products */}
				<section className="mb-8">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-semibold text-red-600">
							Hottest Products
						</h2>
						<a href="#" className="text-sm text-gray-600 hover:text-gray-800">
							View all
						</a>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<ProductCard hot={true} />
						<ProductCard hot={true} />
						<ProductCard hot={true} />
						<ProductCard hot={true} />
					</div>
				</section>

				{/* Free Shipping Section */}
				<section className="bg-gray-100 text-center py-6 rounded-lg mb-8">
					<p className="text-lg font-semibold">
						Free Shipping on Orders over €49
					</p>
				</section>

				{/* Testimonials */}
				<section className="mb-8">
					<h2 className="text-xl font-semibold mb-4">Our happy customers</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<TestimonialCard />
						<TestimonialCard />
						<TestimonialCard />
					</div>
				</section>

				{/* Newsletter Subscription */}
				<section className="bg-white shadow rounded-lg p-6 text-center">
					<h2 className="text-xl font-semibold mb-4">
						Stay in the Loop with the Latest Trends and Deals!
					</h2>
					<div className="relative">
						<input
							type="email"
							className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4"
							placeholder="Email address"
						/>
						<button className="absolute right-2 top-2 bg-black text-white rounded-lg px-4 py-2">
							Subscribe
						</button>
					</div>
				</section>
			</div>

			{/* Footer */}
			<footer className="bg-gray-800 text-white py-8 mt-12">
				<div className="container mx-auto text-center">
					<p>Shop4Goodies</p>
					<p>#footerwithoutadesign © 2024 Dosio Dosev.</p>
				</div>
			</footer>
		</div>
	);
};

const TestimonialCard = () => {
	return (
		<div className="bg-white shadow rounded-lg p-4 text-center">
			<p className="text-lg font-semibold">Customer A</p>
			<p className="text-sm text-red-500">★★★★★</p>
			<p className="text-sm text-gray-600">
				Great product, highly recommended!
			</p>
		</div>
	);
};

export default ShopLayout;
