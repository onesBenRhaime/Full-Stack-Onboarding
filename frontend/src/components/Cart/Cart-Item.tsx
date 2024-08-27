"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toast from "../ui/Toast";
import Cookies from "js-cookie";
import { useCart } from "@/Context/CartContext";
import API_BASE_URL from "@/utils/config";

const CartItem = ({ item }: { item: any }) => {
	const [quantity, setQuantity] = useState(item.quantity);
	const { deleteFromCart: deleteFromCart } = useCart();
	const token = Cookies.get("authToken");
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);

	const removeProduct = async (productId: number) => {
		const response = await axios.delete(
			`${API_BASE_URL}cart/remove/${productId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	};

	const removeMutation = useMutation({
		mutationFn: removeProduct,
		onSuccess: () => {
			setAlertMessage({
				title: "Item Deleted",
				description: "Item has been deleted successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 1000);
		},
		onError: (error) => {
			setAlertMessage({
				title: "Delete Failed",
				description: `Failed to delete item: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleDeleteItem = async (productId: number) => {
		try {
			deleteFromCart();
			await removeMutation.mutateAsync(productId);
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	};

	const editItem = async ({
		productId,
		quantity,
	}: {
		productId: number;
		quantity: number;
	}) => {
		const response = await axios.patch(
			`${API_BASE_URL}cart/edit/${productId}`,
			{ quantity },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	};

	const editMutation = useMutation({
		mutationFn: editItem,
		onSuccess: () => {
			setAlertMessage({
				title: "Quantity Updated",
				description: "Quantity has been updated successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 1000);
		},
		onError: (error) => {
			setAlertMessage({
				title: "Update Failed",
				description: `Failed to update quantity: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleEditItem = async () => {
		try {
			await editMutation.mutateAsync({ productId: item.id, quantity });
		} catch (error) {
			console.error("Failed to update quantity:", error);
		}
	};

	return (
		<div className="bg-white shadow rounded-lg p-4 flex justify-start space-x-8">
			{alertMessage && (
				<div className="fixed bottom-4 top-20 right-4">
					<Toast
						title={alertMessage.title}
						description={alertMessage.description}
						variant={alertMessage.variant}
					/>
				</div>
			)}
			<div className="bg-gray-200 h-40 rounded-md mb-4">
				<Image
					src={`/products/${item.product.imageUrl}`}
					alt="Product"
					width={200}
					height={200}
					className="w-full h-full rounded-lg"
				/>
			</div>
			<div className="flex-1">
				<h3 className="text-sm font-semibold uppercase">{item.product.name}</h3>
				<p className="text-xs text-gray-600 mb-2">{item.product.description}</p>
				<p className="text-lg font-bold">
					<span>€{item.product.price}</span>
				</p>
			</div>
			<div>
				<label>
					Quantity:
					<input
						type="number"
						className="flex-1 w-12 h-8 bg-gray-100 border border-gray-300 rounded-md"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
					/>
					<button className="bg-gray-100 p-1" onClick={handleEditItem}>
						Update
					</button>
				</label>
			</div>
			<button
				className="flex-1  justify-end "
				onClick={() => handleDeleteItem(item.id)}
			>
				<Image src="/icons/trash-2.png" alt="Delete" width={20} height={20} />
			</button>
		</div>
	);
};

export default CartItem;
