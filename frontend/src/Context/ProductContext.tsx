import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react";
import Cookies from "js-cookie";
import API_BASE_URL from "@/utils/config";

interface Product {
	id: number;
	name: string;
	image: string;
	price: number;
	description: string;
	imageUrl: string;
}

interface ProductContextType {
	products: Product[];
	newArrivals: Product[];
	fetchAllProducts: () => void;
	fetchAllNewArrivals: () => void;
	fetchProductById: (productId: number) => Product | undefined;
	addProduct: (product: Product) => void;
	updateProduct: (product: Product) => void;
	deleteProduct: (productId: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProduct must be used within a ProductProvider");
	}
	return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [newArrivals, setNewArrivals] = useState<Product[]>([]);

	const fetchAllProducts = async () => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}products`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			console.log(" product data", data);

			setProducts(data);
		} catch (error) {
			console.error("Failed to fetch products", error);
			setProducts([]);
		}
	};
	const fetchAllNewArrivals = async () => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}products/newArrivals`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			console.log(" new Arrivals data", data);

			setNewArrivals(data);
		} catch (error) {
			console.error("Failed to fetch products", error);
			setNewArrivals([]);
		}
	};
	const fetchProductById = (productId: number): Product | undefined => {
		return products.find((product) => product.id === productId);
	};

	const addProduct = async (product: Product) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}products/add`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});
			if (response.ok) {
				setProducts((prevProducts) => [...prevProducts, product]);
			} else {
				console.error("Failed to add product");
			}
		} catch (error) {
			console.error("Failed to add product", error);
		}
	};

	const updateProduct = async (product: Product) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(
				`${API_BASE_URL}products/update/${product.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(product),
				}
			);
			if (response.ok) {
				setProducts((prevProducts) =>
					prevProducts.map((p) => (p.id === product.id ? product : p))
				);
			} else {
				console.error("Failed to update product");
			}
		} catch (error) {
			console.error("Failed to update product", error);
		}
	};

	const deleteProduct = async (productId: number) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(
				`${API_BASE_URL}products/delete/${productId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				setProducts((prevProducts) =>
					prevProducts.filter((product) => product.id !== productId)
				);
			} else {
				console.error("Failed to delete product");
			}
		} catch (error) {
			console.error("Failed to delete product", error);
		}
	};

	useEffect(() => {
		fetchAllProducts();
		fetchAllNewArrivals();
	}, []);

	return (
		<ProductContext.Provider
			value={{
				products,
				newArrivals,
				fetchAllProducts,
				fetchAllNewArrivals,
				fetchProductById,
				addProduct,
				updateProduct,
				deleteProduct,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
