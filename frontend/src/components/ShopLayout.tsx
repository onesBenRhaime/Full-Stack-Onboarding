import React from "react";
import TestimonialCard from "./TestimonialCard";
import Newsletter from "./Newsletter";
import NewArrivalsSection from "./Products/NewArrivalsSection";

const ShopLayout = () => {
	return (
		<div>
			{/* Main Content */}
			<div className="container mx-auto p-6">
				{/* Hero Section */}
				{/* Hero Section */}
				<section className=" rounded-xl">
					<div
						className="relative bg-cover rounded-xl"
						style={{
							backgroundImage: "url('/images/hero-3.png')",
							backgroundSize: "cover",
							height: "400px",
							backgroundPosition: "center",
						}}
					></div>
				</section>
				<NewArrivalsSection />
				{/* Testimonials */}
				<section className="mb-8 pt-20">
					<h2 className="text-xl font-semibold mb-4">Our happy customers</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						<TestimonialCard />
						<TestimonialCard />
						<TestimonialCard />
					</div>
				</section>
				<div className="mt-4">
					<Newsletter />
				</div>
			</div>
		</div>
	);
};

export default ShopLayout;
