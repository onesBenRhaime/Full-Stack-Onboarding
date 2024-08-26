"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useMutation, useQuery } from "@tanstack/react-query";

const NewArrivalsSection = () => {
	const fetchProducts = async () => {
		const response = await fetch("http://localhost:5000/products/newArrivals");
		if (!response.ok) {
			throw new Error("Network response  problem");
		}
		return response.json();
	};

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: Infinity,
	});

	return (
		<>
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
					<Link
						href=""
						className="text-sm text-gray-600 hover:text-white  hover:font-bold hover:bg-black border-collapse border  rounded-full px-4 py-2"
					>
						View all
					</Link>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products?.map((item: any, index: any) => (
						<ProductCard product={item} />
					))}
				</div>
			</section>
		</>
	);
};
export default NewArrivalsSection;
