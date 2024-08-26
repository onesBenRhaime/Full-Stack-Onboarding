const HeroSection = () => {
	return (
		<>
			{/* Hero Section */}
			<section className="bg-white shadow rounded-lg p-6 mb-8 text-center">
				<div
					className="bg-gray-200 rounded-md mb-4 relative flex items-center justify-center"
					style={{
						backgroundImage: "url('/images/hero-3.png')",
						backgroundSize: "cover",
						height: "300px",
						backgroundPosition: "center",
					}}
				></div>
			</section>
		</>
	);
};

export default HeroSection;
