import YourCart from "@/components/Cart/YourCart";
import Footer from "@/components/Footer";
import HeaderSection from "@/components/Header/headerSection";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-Commerce Website",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
	// other metadata
};

export default function Cart() {
	return (
		<>
			
			<HeaderSection />
			<div className="bg-gray-50 text-gray-800 min-h-screen">
				<YourCart />
			</div>{" "}
			<Footer />
		</>
	);
}
