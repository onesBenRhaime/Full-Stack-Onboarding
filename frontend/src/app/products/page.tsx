import Footer from "@/components/Footer";
import HeaderSection from "@/components/Header/headerSection";
import AllProducts from "@/components/Products/AllProducts";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-Commerce Website",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
	// other metadata
};

export default function Products() {
	return (
		<>
			<HeaderSection />
			<div className="bg-gray-50 text-gray-800 min-h-screen">
				<AllProducts />
			</div>
			<Footer />
		</>
	);
}
