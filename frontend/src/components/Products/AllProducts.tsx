"use client";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import API_BASE_URL from "@/utils/config";

const AllProducts = () => {
	const fetchProducts = async () => {
		const response = await fetch(`${API_BASE_URL}products`);
		if (!response.ok) {
			throw new Error("Network response problem");
		}
		return response.json();
	};

	const { data: initialProducts } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: Infinity,
	});

	const [products, setProducts] = useState(initialProducts);

	// Callback function to handle updates to the product list
	const handleProductUpdate = (updatedProduct: any) => {
		setProducts((prevProducts: any) =>
			prevProducts.map((product: any) =>
				product.id === updatedProduct.id ? updatedProduct : product
			)
		);
	};

	return (
		<>
			<section className="container">
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

				<section className="mb-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{products?.map((item: any) => (
							<ProductCard
								key={item.id}
								product={item}
								onProductUpdate={handleProductUpdate}
							/>
						))}
					</div>
				</section>
			</section>
		</>
	);
};

export default AllProducts;
