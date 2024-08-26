import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import ModalAddCategory from "./ModalAddCategory";
import Image from "next/image";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: any) => void;
};

const Modal = ({ isOpen, onClose, onSubmit }: ModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [productName, setProductName] = useState("");
	const [category, setCategory] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [stock, setStock] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string>(
		imageUrl ? `/products/${imageUrl}` : ""
	);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			setImagePreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let imageUrl = imagePreview || "";
		if (imageFile) {
			// Handle image upload logic here
			const filename = await uploadImage(imageFile);
			console.log("Uploaded image: ", filename);

			imageUrl = filename;
		}
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

	const fetchCategories = async () => {
		const response = await fetch("http://localhost:5000/categories");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
		staleTime: Infinity,
	});
	///ADD CATEGORY
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);

	const addCategory = async (category: any) => {
		const response = await axios.post(
			"http://localhost:5000/categories",
			category
		);
		return response.data;
	};

	const mutation = useMutation({
		mutationFn: addCategory,
		onSuccess: () => {
			setAlertMessage({
				title: "Category Added",
				description: "Category has been added successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
		},
		onError: (error) => {
			setAlertMessage({
				title: "Category Failed",
				description: `	Failed to add category: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

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
		<div>
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

						<div className="mb-4">
							<label className="block text-sm font-medium text-gray-700">
								Category
							</label>

							<div className="flex justify-between">
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm me-2"
									required
								>
									<option value="">Select Category</option>
									{categories?.map((category: any) => (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									))}
								</select>
								<button
									className="  font-bold px-2  m-1  text-lg bg-primary  text-white"
									onClick={() => setIsModalOpen(true)}
								>
									{/* //icon add category */}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 "
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
								</button>
							</div>
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
			<ModalAddCategory
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={addCategory}
			/>
		</div>
	);
};

export default Modal;
