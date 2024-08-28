"use client";

import AccessDenied from "@/components/AccessDenied";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import ListOrder from "@/components/Orders/ListOrders";
import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";

export default function Orders() {
	const { user } = useAuth();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [loading, setLoading] = useState(true);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};
	useEffect(() => {
		if (user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-5xl text-primary">Loading...</p>
			</div>
		);
	}

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
