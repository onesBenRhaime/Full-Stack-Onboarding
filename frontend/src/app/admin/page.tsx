import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import ProductGrid from "@/components/Products/productGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard E-Commerce ",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
};

export default function Dash() {
	return (
		<>
			<div className=" flex h-screen">
				<Sidebar />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2  border-b-slate-200 ">
					<Topbar />
					<div className=" bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1>HOMMMMMMMMMMME</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
