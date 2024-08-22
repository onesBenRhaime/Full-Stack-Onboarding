import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Modal from "../ui/Modal";
import { useState } from "react";

export default function ProductGrid() {
	const fetchProducts = async () => {
		const response = await fetch("http://localhost:5000/products");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: Infinity,
	});

	const handleAddProduct = async (product: any) => {
		try {
			await axios.post("http://localhost:5000/products", product);
		} catch (error) {
			console.error("Failed to add product:", error);
		}
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<div className="flex-1 p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">All Products</h1>
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-primary  "
				>
					+ ADD NEW PRODUCT
				</button>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
				{products?.map((item: any, index: any) => (
					<div key={index} className="bg-white p-4 rounded-xl shadow-lg">
						<div className="flex justify-between items-center mb-2 mx-2">
							<Image
								src="/products/product-1.png"
								alt="Product"
								width={80}
								height={80}
								className="object-cover rounded-lg"
							/>
							<div className="flex flex-col">
								<h3 className="text-xl font-semibold ">{item.name}</h3>
								<p className="text-gray-600 ">{item.category?.name}</p>
								<p className="text-primary text-md font-bold ">${item.price}</p>
							</div>
							<button className="text-black hover:text-black font-bold   ">
								...
							</button>
						</div>

						<p className="text-sm text-gray-600">Summary</p>
						<p className="text-xs text-gray-400 mb-4">{item.description}</p>
						<div className="flex-col justify-between text-sm border-collapse border-2  rounded-xl">
							<div className="text-gray-600 m-2 flex justify-between">
								Sales{" "}
								<div className=" flex">
									<span className="text-primary me-2">1269</span>
									<Image
										src="/icons/top.svg"
										width={30}
										height={30}
										alt="Sale"
										className="ml-2"
										color="primary"
									/>
								</div>
							</div>

							<hr className="my-2 mx-2" />
							<div className="text-gray-600 m-2 flex justify-between">
								Remaining Products
								<div className="flex">
									<span className="text-primary me-2">1269</span>
									<Image
										src="/icons/progress.svg"
										width={30}
										height={30}
										alt="Sale"
										className="ml-2 w-30 h-30"
										color="primary"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleAddProduct}
			/>
		</div>
	);
}
