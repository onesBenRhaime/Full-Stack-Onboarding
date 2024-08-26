"use client";
import React from "react";

interface ModalConfirmeProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
}

const ModalConfirme: React.FC<ModalConfirmeProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Confirm Your Order
				</h2>
				<p className="text-gray-600 mb-6 text-center">
					Are you sure you want to place this order?
				</p>
				<div className="flex justify-center space-x-4">
					<button
						className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
						onClick={onSubmit}
					>
						Confirm
					</button>
					<button
						className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
						onClick={onClose}
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default ModalConfirme;
