import Sidebar from "@/components/Admin/Sidebar";
import Topbar from "@/components/Admin/Topbar";
import ListOrder from "@/components/Orders/ListOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard E-Commerce ",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
};

export default function Orders() {
	return (
		<>
			<div className=" flex h-screen">
				<Sidebar />
				{/* Main Content Area */}
				<div className="flex-1 flex flex-col border-collapse border-2  border-b-slate-200 ">
					<Topbar />
					<div className=" bg-gray-100 flex-1 p-4">
						<div className="flex-1 p-4">
							<h1>Orders</h1>
							<ListOrder />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
