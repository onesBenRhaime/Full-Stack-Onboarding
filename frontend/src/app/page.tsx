import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/heroSection";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "E-Commerce Website",
	description: "This is Website for E-Commerce Fullstack onboarding Project",
	// other metadata
};

export default function Home() {
	return (
		<>
			<Header />
			<Hero />
		</>
	);
}
