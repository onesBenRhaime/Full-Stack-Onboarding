import Footer from "@/components/Footer";
import HeaderSection from "@/components/Header/headerSection";
import MyOrders from "@/components/Orders/MyOrders";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-Commerce Website",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
	// other metadata
};

export default function orders() {
	return (
		<>
			<HeaderSection />
			<div className=" text-gray-800 min-h-screen container px-10">
				<MyOrders />
			</div>
			<Footer />
		</>
	);
}
