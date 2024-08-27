import Footer from "@/components/Footer";
import HeaderSection from "@/components/Header/headerSection";
import ShopLayout from "@/components/ShopLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-Commerce Website",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
	// other metadata
};

export default function Home() {
	return (
		<>
			<HeaderSection />
			<div className="bg-gray-50 text-gray-800 min-h-screen">
				<ShopLayout />
			</div>

			<Footer />
		</>
	);
}
