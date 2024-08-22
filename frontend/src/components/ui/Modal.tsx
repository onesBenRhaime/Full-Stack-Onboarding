import { useState } from "react";
import { Dialog } from "@headlessui/react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
};

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
	const [productName, setProductName] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [stock, setStock] = useState("");

	const handleSubmit = (e: any) => {
		e.preventDefault();
		onSubmit({
			name: productName,
			category,
			price,
			description,
			imageUrl,
			stock,
		});
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
			<div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto  lg:w-1/3  sm:w-full md:w-full xl:w-1/2">
				<Dialog.Title className="text-xl font-bold mb-4">
					Add New Product
				</Dialog.Title>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Product Name
						</label>
						<input
							type="text"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
					{/* //add image input here */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Product Image
						</label>
						<input
							type="file"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
							required
						/>{" "}
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Category
						</label>
						<input
							type="text"
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Price
						</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Stock
						</label>
						<input
							type="number"
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							rows={4}
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
							Add Product
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default Modal;
