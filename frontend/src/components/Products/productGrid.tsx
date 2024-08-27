import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Modal from "../ui/ModalAddProduct";
import Toast from "../ui/Toast";
import ModalEditProduct from "../ui/ModalEditProduct";
import { Product } from "../../../types/product";
import { useState } from "react";
import API_BASE_URL from "@/utils/config";

export default function ProductGrid() {
	const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
	const [currentProduct, setCurrentProduct] = useState<any>(null);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);

	const queryClient = useQueryClient();

	const fetchProducts = async () => {
		const response = await fetch(`${API_BASE_URL}products`);
		if (!response.ok) {
			throw new Error("Network response problem");
		}
		return response.json();
	};

	const { data: products } = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		staleTime: Infinity,
	});

	const addProduct = async (product: any) => {
		const response = await axios.post(`${API_BASE_URL}products`, product);
		return response.data;
	};

	const editProduct = async (product: any) => {
		const response = await axios.patch(
			`${API_BASE_URL}products/${product.id}`,
			product
		);
		return response.data;
	};

	const removeProduct = async (productId: number) => {
		const response = await axios.delete(`${API_BASE_URL}products/${productId}`);
		return response.data;
	};

	const mutation = useMutation({
		mutationFn: addProduct,
		onSuccess: () => {
			setAlertMessage({
				title: "Product Added",
				description: "Product has been added successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			setAlertMessage({
				title: "Product Failed",
				description: `Failed to add product: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const editMutation = useMutation({
		mutationFn: editProduct,
		onSuccess: () => {
			setAlertMessage({
				title: "Product Updated",
				description: "Product has been updated successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 5000);
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			setAlertMessage({
				title: "Update Failed",
				description: `Failed to update product: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const removeMutation = useMutation({
		mutationFn: removeProduct,
		onSuccess: () => {
			setAlertMessage({
				title: "Product deleted",
				description: "Product has been deleted successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 1000);
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			setAlertMessage({
				title: "Delete Failed",
				description: `Failed to delete product: ${error.message}`,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleAddProduct = async (product: any) => {
		try {
			await mutation.mutateAsync(product);
		} catch (error) {
			console.error("Failed to add product:", error);
		}
	};

	const handleEditProduct = async (product: Product) => {
		try {
			await editMutation.mutateAsync(product);
		} catch (error) {
			console.error("Failed to edit product:", error);
		}
	};

	const handleDropdownToggle = (index: number) => {
		if (isDropdownOpen === index) {
			setIsDropdownOpen(null);
		} else {
			setIsDropdownOpen(index);
		}
	};

	const handleEdit = (product: Product) => {
		setCurrentProduct(product);
		setIsModalEditOpen(true);
	};

	const handleDelete = async (productId: number) => {
		try {
			await removeMutation.mutateAsync(productId);
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	};

	return (
		<div className="flex-1 p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">All Products</h1>
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-2 border-primary"
				>
					+ ADD NEW PRODUCT
				</button>
			</div>
			{alertMessage && (
				<div className="fixed bottom-4 right-4">
					<Toast
						title={alertMessage.title}
						description={alertMessage.description}
						variant={alertMessage.variant}
					/>
				</div>
			)}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{products?.map((item: any, index: any) => (
					<div
						key={index}
						className="bg-white p-4 rounded-xl shadow-lg flex flex-col"
					>
						<div className="relative  flex  justify-between">
							<div>
								<span className="absolute top-0 left-0 z-9999 bg-primary text-white  px-2 py-1 rounded-tr-lg rounded-bl-lg w-1/4">
									{item.category?.name}
								</span>
							</div>
							<button
								onClick={() => handleDropdownToggle(index)}
								className="text-black hover:text-primary font-bold hover:font-extrabold px-2 text-3xl"
							>
								...
							</button>
							{isDropdownOpen === index && (
								<div className="absolute right-0 mt-10 py-2 w-48 bg-white rounded-lg shadow-xl z-20">
									<button
										onClick={() => handleEdit(item)}
										className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(item.id)}
										className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
									>
										Delete
									</button>
								</div>
							)}
						</div>
						<Image
							src={`/products/${item.imageUrl}`}
							alt="Product"
							width={200}
							height={200}
							className="object-cover rounded-lg mb-4 w-full h-58"
						/>
						<div className="flex flex-col flex-grow">
							<h3 className="text-xl font-semibold">{item.name}</h3>
							<p className="text-gray-600">{item.category?.name}</p>
							<p className="text-primary text-md font-bold">${item.price}</p>
						</div>
					</div>
				))}
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleAddProduct}
			/>
			<ModalEditProduct
				isOpen={isModalEditOpen}
				onClose={() => setIsModalEditOpen(false)}
				onSubmit={handleEditProduct}
				product={currentProduct}
			/>
		</div>
	);
}
