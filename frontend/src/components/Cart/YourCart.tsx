"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartItem from "./Cart-Item";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalConfirme from "../ui/ModalConfirme";
import Toast from "../ui/Toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/Context/CartContext";
import { useAuth } from "@/Context/AuthContext";
import PleaseLogIn from "../PleaseLogIn";
import API_BASE_URL from "@/utils/config";

const YourCart = () => {
	const { user } = useAuth();
	const { cartCount, clearCartCount } = useCart();
	const [amount, setAmount] = useState(0);
	const token = Cookies.get("authToken");
	const router = useRouter();
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<string>("cash");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchUserCart = async () => {
		const response = await fetch(`${API_BASE_URL}cart`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Network response problem");
		}
		return response.json();
	};

	const { data: items, refetch } = useQuery({
		queryKey: ["items"],
		queryFn: fetchUserCart,
		staleTime: Infinity,
	});

	const placeOrder = async () => {
		const response = await axios.post(
			`${API_BASE_URL}orders`,
			{
				method: paymentMethod,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	};

	const clearCart = async () => {
		const response = await axios.delete(`${API_BASE_URL}cart/clear`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	};

	const mutation = useMutation({
		mutationFn: placeOrder,
		onSuccess: () => {
			setAlertMessage({
				title: "Order Placed",
				description: "Your order has been placed successfully.",
				variant: "success",
			});
			setTimeout(() => setAlertMessage(null), 5000);
			refetch(); // Refresh cart data
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to place order.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to Place Order",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const clearMutation = useMutation({
		mutationFn: clearCart,
		onSuccess: () => {
			setAlertMessage({
				title: "Cart Cleared",
				description: "Your cart has been cleared successfully.",
				variant: "success",
			});
			setTimeout(() => setAlertMessage(null), 5000);
			clearCartCount(); // Update the cart context
			router.push("/products");
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to clear cart.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to Clear Cart",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleCheckout = async () => {
		setIsModalOpen(false);
		try {
			await mutation.mutateAsync();
			clearCartCount();
			router.push("/user/orders");
		} catch (error) {
			console.error("Failed to place order:", error);
		}
	};

	const handleClear = async () => {
		try {
			await clearMutation.mutateAsync();
		} catch (error) {
			console.error("Failed to clear cart:", error);
		}
	};
	const AmountTotal = () => {
		let total = 0;
		items?.items.forEach((item: any) => {
			total += item.product.price * item.quantity;
		});
		setAmount(total);
	};
	useEffect(() => {
		if (items) {
			AmountTotal();
		}
	}, [items, AmountTotal]);

	if (!user) {
		return (
			<div>
				<PleaseLogIn />
			</div>
		); // Ou rediriger l'utilisateur
	}

	return (
		<>
			<section className="pt-28">
				<div className="flex justify-between items-center border-b pb-4 mb-10 container">
					<h1 className="text-xl font-semibold">Shopping Cart</h1>
					<span className="text-gray-500">Your cart ({cartCount})</span>
				</div>
				{alertMessage && (
					<div className="fixed bottom-4 top-20 right-4">
						<Toast
							title={alertMessage.title}
							description={alertMessage.description}
							variant={alertMessage.variant}
						/>
					</div>
				)}
				<div className="container lg:flex lg:justify-between lg:space-x-40 flex-row">
					<section className="w-full mb-8 sm:px-2 lg:px-0">
						<div className="grid gap-4">
							<div className="bg-gray-50 p-6 shadow-md rounded-lg">
								<div className="flex flex-col gap-6">
									{items?.items.map((item: any, index: any) => (
										<CartItem
											item={item}
											key={index}
											AmountTotal={AmountTotal}
										/>
									))}
								</div>
							</div>
						</div>
					</section>

					<section className="w-full md:w-1/3 mb-8">
						<div className="bg-white p-6 shadow-md rounded-lg">
							<h2 className="text-lg font-semibold mb-4">Summary</h2>

							<div className="flex flex-col gap-4 mb-5">
								<label htmlFor="paymentMethod">Payment Method</label>
								<select
									name="paymentMethod"
									id="paymentMethod"
									onChange={(e) => setPaymentMethod(e.target.value)}
									className="border border-gray-300 rounded-lg p-2"
								>
									<option value="cash">Cash</option>
									<option value="credit">Credit Card</option>
								</select>
							</div>
							<div className="flex justify-between font-bold text-lg mb-6">
								<span>Total Amount</span>
								<span>€{amount}</span>
							</div>
						</div>
						<div className="flex justify-between space-x-3 mx-10">
							<button
								onClick={() => setIsModalOpen(true)}
								className="w-1/2 bg-black text-white py-2 rounded-xl m-4 hover:bg-white hover:text-black border border-gray-300"
							>
								Checkout
							</button>
							<button
								onClick={handleClear}
								className="w-1/2 border border-gray-300 bg-white text-black py-2 m-4 rounded-xl hover:text-white hover:bg-black"
							>
								Cancel All
							</button>
						</div>
					</section>
				</div>
				<ModalConfirme
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCheckout}
				/>
			</section>
		</>
	);
};

export default YourCart;
