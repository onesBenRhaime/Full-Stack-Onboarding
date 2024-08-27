"use client";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import ListUsers from "@/components/Users/ListUsers";
import { useState } from "react";

const [sidebarOpen, setSidebarOpen] = useState(false);

const toggleSidebar = () => {
	setSidebarOpen((prev) => !prev);
};

export default function Users() {
	return (
		<>
			<div className=" flex h-screen">
				<Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2  border-b-slate-200 ">
					<Topbar toggleSidebar={toggleSidebar} />
					<div className=" bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1>Users</h1>
							<ListUsers />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
