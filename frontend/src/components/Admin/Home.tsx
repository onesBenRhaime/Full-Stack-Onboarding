"use client";
import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import { useState } from "react";

export default function HomeDash() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(prev => !prev);
	};

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
					</div>
				</div>
			</div>
		</>
	);
}
