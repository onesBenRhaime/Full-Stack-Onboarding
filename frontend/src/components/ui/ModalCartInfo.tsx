"use client";
import Link from "next/link";
import React from "react";

interface ModalConfirmeProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalCartInfo: React.FC<ModalConfirmeProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Your cart is empty!
				</h2>
				<p className="text-gray-600 mb-6 text-center">
				You need to add products to your cart before you can proceed to
				</p>
				<div className="flex justify-center space-x-4">
					<Link
						href="/products"
						className="bg-primary text-white py-2 px-4 rounded hover:bg-gray-800"
					>
						Continue Shopping
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ModalCartInfo;
