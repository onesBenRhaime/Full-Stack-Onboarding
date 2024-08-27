"use client";

import AccessDenied from "@/components/AccessDenied";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import ListOrder from "@/components/Orders/ListOrders";
import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";

export default function Orders() {
	const { user } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};
	if (!user?.role.includes("admin")) {
		return (
			<div>
				<AccessDenied />
			</div>
		);
	}
	return (
		<>
			<div className=" flex h-screen">
				<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2  border-b-slate-200 ">
					<Topbar toggleSidebar={toggleSidebar} />
					<div className=" bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1>List Orders </h1>
							<ListOrder />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
