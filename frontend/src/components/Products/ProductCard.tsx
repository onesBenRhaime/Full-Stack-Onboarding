"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toast from "../ui/Toast";
import Cookies from "js-cookie";

const ProductCard = ({
	hot = false,
	product,
}: {
	hot?: boolean;
	product: any;
}) => {
	const token = Cookies.get("authToken");
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const addToCart = async (product: any) => {
		const response = await axios.post(
			"http://localhost:5000/cart/add",
			{
				productId: product.id,
				quantity: 1,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		console.log(response);

		return response.data;
	};

	const mutation = useMutation({
		mutationFn: addToCart,
		onSuccess: () => {
			setAlertMessage({
				title: "item  Added to cart",
				description: "Product has been added successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to add product to cart.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to add item to cart",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleAddToCart = async (product: any) => {
		console.log("handleAddToCart", product);

		try {
			await mutation.mutateAsync(product);
		} catch (error) {
			console.error("Failed to add product:", error);
		}
	};

	return (
		<div className="bg-white shadow rounded-lg p-4">
			{alertMessage && (
				<div className="fixed bottom-4 top-20 right-4  ">
					<Toast
						title={alertMessage.title}
						description={alertMessage.description}
						variant={alertMessage.variant}
					/>
				</div>
			)}
			<div className="bg-gray-200 h-40 rounded-md mb-4">
				<Image
					src={`/products/${product.imageUrl}`}
					alt="Product"
					width={300}
					height={300}
					className=" w-full h-full object-contain rounded-lg bg-center "
				/>
			</div>
			<h3 className="text-sm font-semibold uppercase">{product.name}</h3>
			<p className="text-xs text-gray-600 mb-2">{product.description}</p>
			<p className="text-lg font-bold">
				{hot ? (
					<>
						<span className="text-red-600">Now €{product.price}</span>
						<span className="text-gray-500 line-through">
							Was €89.99 (-79%)
						</span>
					</>
				) : (
					<span>€{product.price}</span>
				)}
			</p>
			<div className="flex space-x-2 mt-4">
				<button
					className="flex-1 bg-black text-white rounded-lg px-4 py-2"
					onClick={handleAddToCart}
				>
					Add to Cart
				</button>
				{!hot && (
					<button className="flex-1 bg-gray-200 text-black rounded-lg px-4 py-2">
						Save for later
					</button>
				)}
			</div>
		</div>
	);
};
export default ProductCard;
