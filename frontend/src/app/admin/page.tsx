import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard E-Commerce",
	description:
		"This is a website for the E-Commerce Fullstack onboarding project",
};

export default function Dash() {
	return (
		<>
			<div className="flex flex-col lg:flex-row h-screen">
				<Sidebar />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2 border-b-slate-200">
					<Topbar />
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
