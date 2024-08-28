"use client";

import { useAuth } from "@/Context/AuthContext";
import { useCart } from "@/Context/CartContext";
import { useWishlist } from "@/Context/WishlistContext";
import API_BASE_URL from "@/utils/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toast from "./ui/Toast";

const Wishlist = () => {
	const { wishlist, removeFromWishlist } = useWishlist();
	const { token } = useAuth();
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);

	const { addToCart: cartAddToCart } = useCart();
	const addProductToCart = async (id: any) => {
		const response = await axios.post(
			`${API_BASE_URL}cart/add`,
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
	return (
		<>
			<div className="container lg:flex lg:justify-between  lg:space-x-40 flex-row ">
				<section className="w-full mb-8 sm:px-2 lg:px-0">
					<h2 className="text-3xl font-semibold mb-4 pt-10">Wishlist</h2>
					<div className="grid gap-4">
						<div className="bg-gray-50 p-6 shadow-md rounded-lg">
							{wishlist.length === 0 ? (
								<p className="text-gray-600">Your wishlist is empty.</p>
							) : (
								<div className="flex flex-col gap-6">
									{alertMessage && (
										<div className="fixed bottom-4 top-20 right-4">
											<Toast
												title={alertMessage.title}
												description={alertMessage.description}
												variant={alertMessage.variant}
											/>
										</div>
									)}
									{/* {wishlist.map((item, index) => (
										<div
											className="bg-white shadow rounded-lg p-4 flex justify-start space-x-8"
											key={index}
										>
											<div className="bg-gray-200 h-40 rounded-md mb-4">
												<Image
													src={`/products/${item.imageUrl}`}
													alt="Product"
													width={200}
													height={200}
													className="w-full h-full rounded-lg"
												/>
											</div>
											<div className="flex-1">
												<h3 className="text-sm font-semibold uppercase">
													{item.name}
												</h3>
												<p className="text-xs text-gray-600 mb-2">
													{item.description}
												</p>
												<p className="text-lg font-bold">
													<span>€{item.price}</span>
												</p>
											</div>
											<button
												className="flex-1  justify-end "
												onClick={() => removeFromWishlist(item.id)}
											>
												<Image
													src="/icons/trash-2.png"
													alt="Delete"
													width={20}
													height={20}
												/>
											</button>
											<button
												className="flex-1  justify-end "
												onClick={() => handleAddToCart(item.id)}
											>
												<Image
													src="/icons/shopping-cart.png"
													alt="Add to Cart"
													width={20}
													height={20}
												/>
											</button>
										</div>
									))} */}
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{wishlist?.map((item: any, index: any) => (
											<div
												key={index}
												className="bg-white p-4 rounded-xl shadow-lg flex flex-col"
											>
												<div className="relative  flex  justify-between">
													<div>
														<button
															onClick={() => handleAddToCart(item.id)}
															className="absolute top-0 left-0 z-9999 bg-primary text-white  px-2 py-1 rounded-tr-lg rounded-bl-lg zoom-out-90"
														>
															Add to Cart
														</button>
													</div>
												</div>
												<Image
													src={`/products/${item.imageUrl}`}
													alt="Product"
													width={200}
													height={200}
													className="object-cover rounded-lg mb-4 w-full "
												/>
												<div className="flex flex-col flex-grow">
													<h3 className="text-xl font-semibold">{item.name}</h3>
													<p className="text-gray-600">{item.category?.name}</p>
													<p className="text-primary text-md font-bold">
														${item.price}
													</p>
													<div className="flex space-x-4 mt-4">
														<button
															className="flex-1  justify-end border-2 border-red-700 text-red rounded-lg px-2 py-1"
															onClick={() => removeFromWishlist(item.id)}
														>
															Remove from wishlist
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Wishlist;
