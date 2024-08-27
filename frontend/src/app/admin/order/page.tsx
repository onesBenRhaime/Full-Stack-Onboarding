"use client";

import AccessDenied from "@/components/AccessDenied";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import MyOrders from "@/components/Orders/MyOrders";
import { useAuth } from "@/Context/AuthContext";

export default function Orders() {
	const { user } = useAuth();
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
				<Sidebar />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2  border-b-slate-200 ">
					<Topbar />
					<div className=" bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1>My Orders </h1>
							<MyOrders />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
