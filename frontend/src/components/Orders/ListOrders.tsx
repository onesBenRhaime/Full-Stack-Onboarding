import Image from "next/image";

export default function ListOrder() {
	const orders = [
		{
			id: "ORD12345",
			customer: "John Doe",
			date: "2024-08-21",
			status: "Completed",
			total: "$120.00",
		},
		{
			id: "ORD12346",
			customer: "Jane Smith",
			date: "2024-08-20",
			status: "Pending",
			total: "$75.50",
		},
		{
			id: "ORD12347",
			customer: "Alice Johnson",
			date: "2024-08-19",
			status: "Canceled",
			total: "$0.00",
		},
		// Add more orders as needed...
	];

	return (
		<>
			{" "}
			<div className="flex-1 p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-bold">Order List</h1>
					<button className=" text-green-400 px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-green-300  ">
						Export data
					</button>
				</div>

				{/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"></div> */}

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
							{orders.map((order, index) => (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-100"
								>
									<td className="py-3 px-6 text-left whitespace-nowrap">
										<span className="font-medium">{order.id}</span>
									</td>
									<td className="py-3 px-6 text-left">
										<span>{order.customer}</span>
									</td>
									<td className="py-3 px-6 text-left">
										<span>{order.date}</span>
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
										<span>{order.total}</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
