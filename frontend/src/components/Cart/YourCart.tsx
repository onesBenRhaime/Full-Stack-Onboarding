"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import CartItem from "./Cart-Item";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import ModalConfirme from "../ui/ModalConfirme";
import Toast from "../ui/Toast";
import { useRouter } from "next/navigation";
const YourCart = () => {
	const token = Cookies.get("authToken");
	const router = useRouter();
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const [methodePyament, setMethodePyament] = useState<string>("cash");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const fetchUserCart = async () => {
		const Response = await fetch("http://localhost:5000/cart", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!Response.ok) {
			throw new Error("Network response problem");
		}
		return Response.json();
	};

	const { data: items } = useQuery({
		queryKey: ["items"],
		queryFn: fetchUserCart,
		staleTime: Infinity,
	});

	const palceOrder = async (product: any) => {
		const response = await axios.post(
			"http://localhost:5000/orders",
			{
				method: methodePyament,
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
		mutationFn: palceOrder,
		onSuccess: () => {
			setAlertMessage({
				title: "order Terminate",
				description: "Your order has been placed successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to palce order.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to place order",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleCheckout = async () => {
		console.log("palceOrder", methodePyament);
		setIsModalOpen(false);
		router.push("/user/orders");
		try {
			await mutation.mutateAsync(methodePyament);
		} catch (error) {
			console.error("Failed to add product:", error);
		}
	};

	return (
		<>
			{" "}
			<section className="pt-28 ">
				<div className="  flex justify-between items-center border-b pb-4 mb-10 container">
					<h1 className="text-xl font-semibold">Shopping Cart</h1>
					<span className="text-gray-500">
						Your cart ({items?.items?.length})
					</span>
				</div>
				{alertMessage && (
					<div className="fixed bottom-4 top-20 right-4  ">
						<Toast
							title={alertMessage.title}
							description={alertMessage.description}
							variant={alertMessage.variant}
						/>
					</div>
				)}
				<div className="container lg:flex lg:justify-between  lg:space-x-40 flex-row ">
					<section className="w-full mb-8 sm:px-2 lg:px-0">
						<div className="grid gap-4">
							<div className="bg-gray-50 p-6 shadow-md rounded-lg">
								<div className="flex flex-col gap-6">
									{items?.items.map((item: any, index: any) => (
										<CartItem item={item} />
									))}{" "}
								</div>
							</div>
						</div>
					</section>

					<section className="w-full md:w-1/3 mb-8 ">
						<div className="bg-white p-6 shadow-md rounded-lg">
							<h2 className="text-lg font-semibold mb-4">Summary</h2>

							<div className="flex flex-col gap-4 mb-5">
								<label htmlFor="methodePyament">Methode Payment</label>
								<select
									name="methodePyament"
									id="methodePyament"
									onChange={(e) => setMethodePyament(e.target.value)}
									className="border border-gray-300 rounded-lg p-2"
								>
									<option value="cash">Cash</option>
									<option value="credit">Credit Card</option>
								</select>
							</div>
							<div className="flex justify-between font-bold text-lg mb-6">
								<span>Total Amount</span>
								<span>€5000</span>
							</div>
						</div>
						<div className="flex  justify-between space-x-3 mx-10 ">
							<button
								onClick={() => setIsModalOpen(true)}
								className="w-1/2 bg-black text-white py-2 rounded-xl  m-4 hover:bg-white hover:text-black border border-gray-300"
							>
								Checkout
							</button>
							<button className="w-1/2 border border-gray-300 bg-white text-black py-2 m-4 rounded-xl hover:text-white hover:bg-black ">
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
