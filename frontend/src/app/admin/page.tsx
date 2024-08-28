"use client";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import { useWishlist } from "@/Context/WishlistContext";
import { useState } from "react";

export default function Dash() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};
	const { deleteAllWishlist } = useWishlist();
	return (
		<>
			<div className="flex flex-col lg:flex-row h-screen">
				<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
				<div className="flex-1 flex flex-col border-collapse border-2 border-b-slate-200">
					<Topbar toggleSidebar={toggleSidebar} />

					<div className="bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1 className="text-lg lg:text-xl font-bold">HOMMMMMMMMMMME</h1>
						</div>
						<div className="flex-1  ">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								<div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
									<div className="flex flex-col flex-grow">
										<button onClick={deleteAllWishlist}>
											Clear all wishlist
										</button>
									</div>
								</div>
								<div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
									<div className="flex flex-col flex-grow">
										<button onClick={deleteAllWishlist}>Clear all users</button>
									</div>
								</div>
								<div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
									<div className="flex flex-col flex-grow">
										<button onClick={deleteAllWishlist}>
											Clear all orders
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
