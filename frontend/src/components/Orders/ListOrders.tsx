"use client";
import { useOrder } from "@/Context/OrderContext";
import React, { useState } from "react";

export default function ListOrder() {
	const { orders, acceptOrder, rejectOrder } = useOrder();
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const handleAcceptOrder = async (orderId: number) => {
		try {
			await acceptOrder(orderId);
			setAlertMessage({
				title: "order accepted ",
				description: "order has been accepted successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
		} catch (error) {
			setAlertMessage({
				title: "order Failed",
				description: `Failed to accept order`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		}
	};

	const handleRejectOrder = async (orderId: number) => {
		try {
			await rejectOrder(orderId);
			setAlertMessage({
				title: "order rejected ",
				description: "order has been rejected successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
		} catch (error) {
			setAlertMessage({
				title: "order Failed",
				description: `Failed to reject order`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		}
	};

	return (
		<div className="flex-1 p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">Order List</h1>
				<button className="text-green-400 px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-green-300">
					Export data
				</button>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Order ID</th>
							<th className="py-3 px-6 text-left">Customer</th>
							<th className="py-3 px-6 text-left">Date</th>
							<th className="py-3 px-6 text-left">Status</th>
							<th className="py-3 px-6 text-left">Total</th>
							<th className="py-3 px-6 text-left">Action</th>
						</tr>
					</thead>
					<tbody className="text-gray-600 text-sm font-light">
						{orders?.map((order) => (
							<tr
								key={order.id}
								className="border-b border-gray-200 hover:bg-gray-100"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									<span className="font-medium">{order.id}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{order.user.username}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{order.orderDate}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span
										className={`${
											order.status === "Completed"
												? "text-green-500"
												: order.status === "Pending"
												? "text-yellow-500"
												: "text-red-500"
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{order.totalAmount}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<button
										className="text-black p-2 border-collapse border-2 mx-2  r-2 border-green-500"
										onClick={() => handleAcceptOrder(order.id)}
									>
										✔
									</button>
									<button
										className="text-black p-2 border-collapse border-2 mx-2  r-2 border-red-500"
										onClick={() => handleRejectOrder(order.id)}
									>
										❌
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
