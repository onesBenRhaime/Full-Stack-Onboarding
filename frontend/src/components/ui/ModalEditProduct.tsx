import { useState, useEffect, FormEvent } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { Product } from "../../../types/product";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: Product) => void;
	product: Product;
};

const ModalEditProduct = ({
	isOpen,
	onClose,
	onSubmit,
	product,
}: ModalProps) => {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string>(
		product?.imageUrl ? `/products/${product.imageUrl}` : ""
	);
	const [productName, setProductName] = useState<string>(product?.name || "");
	const [price, setPrice] = useState<number>(product?.price || 0);
	const [stock, setStock] = useState<number>(product?.stock || 0);
	useEffect(() => {
		if (product) {
			setProductName(product.name);
			setPrice(product.price);
			setStock(product.stock);
			setImagePreview(product.imageUrl ? `/products/${product.imageUrl}` : "");
		}
	}, [product]);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		let imageUrl = product?.imageUrl || "";
		if (imageFile) {
			// Handle image upload logic here
			const filename = await uploadImage(imageFile);
			console.log("Uploaded image: ", filename);

			imageUrl = filename;
		}

		const updatedProduct: Product = {
			id: product?.id || 0,
			name: productName,
			price,
			imageUrl,
			stock,
		};

		onSubmit(updatedProduct);
		onClose();
	};

	const uploadImage = async (file: File): Promise<string> => {
		// Implement the actual image upload logic here.
		// For demonstration, we'll mock the behavior by returning just the filename.
		return new Promise((resolve) => {
			// Mock image upload and filename
			setTimeout(() => {
				// 			resolve(URL.createObjectURL(file));
				const filename = file.name; // Replace with the actual filename returned from your server
				resolve(filename);
			}, 1000);
		});
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
			<div className="relative bg-white p-6 rounded-lg shadow-lg z-10 max-w-md mx-auto w-full">
				<Dialog.Title className="text-xl font-bold mb-4">
					Edit Product
				</Dialog.Title>
				<form onSubmit={handleSubmit}>
					{/* Product Name */}
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

					{/* Product Image */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Product Image
						</label>
						{imagePreview && (
							<Image
								src={
									imagePreview.startsWith("blob:")
										? imagePreview
										: `/products/${imagePreview}`
								}
								alt="Product Preview"
								className="mb-2 w-full h-48 object-center rounded-md"
								width={640}
								height={48}
							/>
						)}

						<input
							type="file"
							accept="image/*"
							onChange={handleImageChange}
							className="mt-1 block w-full text-sm text-gray-700
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-3xl file:border-0
                         file:text-sm file:font-semibold
                         file:bg-primary file:text-white
                         hover:file:bg-primary-dark"
						/>
					</div>

					{/* Price */}
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700">
							Price
						</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(parseFloat(e.target.value))}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
							min={0}
							step={0.01}
						/>
					</div>

					{/* Stock */}
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700">
							Stock
						</label>
						<input
							type="number"
							value={stock}
							onChange={(e) => setStock(parseInt(e.target.value))}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
							required
							min={0}
						/>
					</div>

					{/* Action Buttons */}
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
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</Dialog>
	);
};

export default ModalEditProduct;
