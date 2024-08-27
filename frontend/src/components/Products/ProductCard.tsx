"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toast from "../ui/Toast";
import Cookies from "js-cookie";
import { useCart } from "@/Context/CartContext";
import { useWishlist } from "../../Context/WishlistContext";

const ProductCard = ({
	product,
	onProductUpdate,
}: {
	product: any;
	onProductUpdate: (updatedProduct: any) => void;
}) => {
	const token = Cookies.get("authToken");
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);

	const { addToCart: cartAddToCart } = useCart();
	const addProductToCart = async (id: any) => {
		const response = await axios.post(
			"http://localhost:5000/cart/add",
			{
				productId: id,
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
		mutationFn: addProductToCart,
		onSuccess: (updatedProduct) => {
			setAlertMessage({
				title: "Item Added to Cart",
				description: "Product has been added successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);

			// to update the product in the parent component
			console.log("updatedProduct", updatedProduct);

			onProductUpdate(updatedProduct);
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
		try {
			await cartAddToCart();
			await mutation.mutateAsync(product);
		} catch (error) {
			console.error("Failed to add product:", error);
		}
	};
	//woshlist :

	const { addToWishlist, isInWishlist } = useWishlist();
	return (
		<div className="bg-white shadow rounded-xl p-4">
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
					src={`/products/${product.imageUrl}` || "/products/default-image.png"}
					alt="Product"
					width={300}
					height={300}
					className=" w-full h-full object-contain rounded-lg bg-center "
				/>
			</div>
			<h3 className="text-sm font-semibold uppercase">{product.name}</h3>
			<p className="text-xs text-gray-600 mb-2">{product.description}</p>
			<p className="text-lg font-bold">
				<span>€{product.price}</span>
			</p>
			<div className="flex space-x-4 mt-4">
				<button
					className=" bg-black text-white rounded-lg px-2 py-1"
					onClick={() => handleAddToCart(product.id)}
				>
					Add to Cart
				</button>

				<button
					className=" bg-gray-200 text-black rounded-lg px-2 py-1"
					onClick={() => addToWishlist(product)}
					disabled={isInWishlist(product.id)}
				>
					{isInWishlist(product.id) ? "In Wishlist" : "Save for later"}
				</button>
			</div>
		</div>
	);
};
export default ProductCard;
