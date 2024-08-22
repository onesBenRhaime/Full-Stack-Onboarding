// components/ProductCard.js
import Image from "next/image";
import React from "react";

const ModalAdd = () => {
	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
				<div className="bg-white p-4 rounded-lg">
					<h1 className="text-2xl font-semibold">Add Product</h1>
					<form className="flex flex-col space-y-4">
						<input
							type="text"
							placeholder="Product Name"
							className="border border-gray-300 p-2 rounded-lg"
						/>
						<textarea
							placeholder="Product Description"
							className="border border-gray-300 p-2 rounded-lg"
						></textarea>
						<input
							type="number"
							placeholder="Price"
							className="border border-gray-300 p-2 rounded-lg"
						/>
						<input
							type="file"
							placeholder="Product Image"
							className="border border-gray-300 p-2 rounded-lg"
						/>
						<button className="bg-primary text-white p-2 rounded-lg">
							Add Product
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ModalAdd;
