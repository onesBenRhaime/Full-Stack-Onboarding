"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
};

const ModalAddCategory = ({ isOpen, onClose, onSubmit }: ModalProps) => {
	const [categoryName, setCategoryName] = useState("");
	const queryClient = useQueryClient();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit({
			name: categoryName,
		});
		queryClient.invalidateQueries({ queryKey: ["categories"] });
		onClose();
	};

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			className="fixed inset-0 flex items-center justify-center z-50"
		>
			<div
				className="fixed inset-0 bg-black opacity-30"
				aria-hidden="true"
			></div>
			<div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto  lg:w-1/3  sm:w-full md:w-full xl:w-1/3">
				<Dialog.Title className="text-xl font-bold mb-4">
					Add New Category
				</Dialog.Title>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Category Name
						</label>
						<input
							type="text"
							value={categoryName}
							onChange={(e) => setCategoryName(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>

					<div className="flex justify-end">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-2"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded-lg"
						>
							Add Category
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default ModalAddCategory;
