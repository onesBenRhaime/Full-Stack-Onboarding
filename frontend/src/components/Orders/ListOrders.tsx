"use client";
import API_BASE_URL from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Cookies from "js-cookie";

export default function ListOrder() {
	const token = Cookies.get("authToken");
	const fetchProducts = async () => {
		//use axios to fetch data from the server
		const response = await axios.get(`${API_BASE_URL}orders/all`, {
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
						</tr>
					</thead>
					<tbody className="text-gray-600 text-sm font-light">
						{products?.map((order: any, index: any) => (
							<tr
								key={index}
								className="border-b border-gray-200 hover:bg-gray-100"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									<span className="font-medium">{order.id}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{order.user?.username}</span>
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
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
