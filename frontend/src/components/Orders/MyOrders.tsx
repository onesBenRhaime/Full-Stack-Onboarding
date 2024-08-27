"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Cookies from "js-cookie";

export default function MyOrders() {
	const token = Cookies.get("authToken");
	const fetchProducts = async () => {
		//use axios to fetch data from the server
		const response = await axios.get("http://localhost:5000/orders", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.data) {
			throw new Error("Network response problem");
		}
		console.log(response.data);
		return response.data;
	};

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: Infinity,
	});

	return (
		<div className="flex-1 p-4 pt-10">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl font-bold">My orders </h1>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Order ID</th>
							<th className="py-3 px-6 text-left">Date</th>
							<th className="py-3 px-6 text-left">Status</th>
							<th className="py-3 px-6 text-left">Total</th>
							<th className="py-3 px-6 text-left">Payment Method</th>
						</tr>
					</thead>
					<tbody className=" text-md font-light">
						{products?.map((order: any, index: any) => (
							<tr
								key={index}
								className="border-b border-gray-200 hover:bg-gray-100"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									<span className="font-medium">{order.id}</span>
								</td>

								<td className="py-3 px-6 text-left">
									<span>{order.orderDate}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span
										className={
											`${
												order.status === "Completed"
													? "bgtext-green-500"
													: order.status === "Pending"
													? "text-yellow-500"
													: "text-red-500"
											}` + " py-1 px-3 rounded-full bg-gray-200 font-semibold"
										}
									>
										{order.status}
									</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{order.totalAmount}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span className="text-green-900 bg-gray-200 rounded-full px-3 py-1 font-semibold">
										{order.paymentMethod}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
