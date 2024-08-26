import Header from "@/components/Header/Header";
import HeaderSection from "@/components/Header/headerSection";
import Promo from "@/components/Products/promo";
import Shopping from "@/components/Products/shoppingSection";
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
			<div className="bg-gray-50 text-gray-800 min-h-screen">
				<ShopLayout />
			</div>
			{/* <div className="bg-secondary">
				<Header />
				<Hero />
				<Promo />
				<Shopping />
				
			</div> */}
		</>
	);
}
