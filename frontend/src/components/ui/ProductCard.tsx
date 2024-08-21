// components/ProductCard.js
import Image from "next/image";
import React from "react";

const ProductCard = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
			<div className="relative p-6 bg-gray-800 rounded-lg shadow-lg w-72">
				{/* Image Placeholder */}
				<div className="w-full h-64 bg-gray-300 rounded-lg mb-4">
					<Image
						src="/images/products/1.png"
						alt="Product"
						className="w-full h-full object-cover rounded-lg"
						width={350}
						height={512}
					/>
				</div>

				{/* Color Options */}
				<div className="flex justify-center mb-4">
					<span className="w-4 h-4 rounded-full bg-amber-500 mx-1"></span>
					<span className="w-4 h-4 rounded-full bg-orange-700 mx-1"></span>
					<span className="w-4 h-4 rounded-full bg-teal-600 mx-1"></span>
				</div>

				{/* Product Description */}
				<p className="text-center mb-4">
					Turn heads with the Elegant Floral Midi Dress, a perfect blend of
					sophistication and charm.
				</p>

				{/* Buy Button */}
				<button className="w-full py-2 mb-4 text-purple-700 bg-transparent border border-purple-700 rounded-md hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
					BUY
				</button>

				{/* Carousel Controls */}
				<div className="absolute top-1/2 transform -translate-y-1/2 right-4 flex flex-col items-center space-y-2">
					<button className="p-2 text-purple-700 bg-transparent border border-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
						&gt;
					</button>
					<button className="p-2 text-purple-700 bg-transparent border border-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
						&lt;
					</button>
				</div>
			</div>

			{/* Shop Now Button - Upper Right */}
			<button className="absolute top-10 right-10 py-2 px-6 text-white bg-purple-700 rounded-full hover:bg-purple-900 transition duration-300 ease-in-out">
				SHOP NOW
			</button>

			{/* Shop Now Button - Duplicate */}
			<button className="absolute top-10 right-36 py-2 px-6 text-purple-700 bg-transparent border border-purple-700 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out">
				SHOP NOW
			</button>
		</div>
	);
};

export default ProductCard;
