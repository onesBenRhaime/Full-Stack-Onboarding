"use client";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { useProduct } from "@/Context/ProductContext";

const AllProducts = () => {
	const { products } = useProduct();
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
							<ProductCard key={item.id} product={item} />
						))}
					</div>
				</section>
			</section>
		</>
	);
};

export default AllProducts;
