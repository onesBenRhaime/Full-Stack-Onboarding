import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react";
import Cookies from "js-cookie";

// Define the shape of a product
interface Product {
	id: number;
	name: string;
	image: string;
	price: number;
	description: string;
	imageUrl: string;
}

// Define the context type
interface WishlistContextType {
	wishlist: Product[];
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (productId: number) => void;
	isInWishlist: (productId: number) => boolean;
}

// Create the context
const WishlistContext = createContext<WishlistContextType | undefined>(
	undefined
);

export const useWishlist = () => {
	const context = useContext(WishlistContext);
	if (!context) {
		throw new Error("useWishlist must be used within a WishlistProvider");
	}
	return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
	const [wishlist, setWishlist] = useState<Product[]>([]);

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const token = Cookies.get("authToken");
				const response = await fetch("http://localhost:5000/wishlist", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				console.log(data);

				// Transform the data to match the expected shape
				if (data && Array.isArray(data.items)) {
					const transformedWishlist = data.items.map(
						(item: any) => item.product
					);
					setWishlist(transformedWishlist);
					console.log("transformedWishlist :", transformedWishlist);
					console.log(
						"id for item to delete  :",
						// transformedWishlist?.items[0]?.id
						transformedWishlist[0].id
					);
				} else {
					console.error("Invalid wishlist data", data);
					setWishlist([]);
				}
			} catch (error) {
				console.error("Failed to fetch wishlist", error);
				setWishlist([]);
			}
		};

		fetchWishlist();
	}, []);

	const addToWishlist = async (product: Product) => {
		try {
			const token = Cookies.get("authToken"); // Get the token from cookies
			const response = await fetch("http://localhost:5000/wishlist/add", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`, // Add the token to the headers
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ productId: product.id }),
			});
			if (response.ok) {
				setWishlist((prevWishlist) => [...prevWishlist, product]);
			} else {
				console.error("Failed to add item to wishlist");
			}
		} catch (error) {
			console.error("Failed to add item to wishlist", error);
		}
	};

	const removeFromWishlist = async (productId: number) => {
		try {
			const token = Cookies.get("authToken");
			console.log("productId", productId);

			const response = await fetch(
				`http://localhost:5000/wishlist/remove/${productId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("resss : ", response);

			if (response.ok) {
				setWishlist((prevWishlist) =>
					prevWishlist.filter((item) => item.id !== productId)
				);
			} else {
				console.error("Failed to remove item from wishlist");
			}
		} catch (error) {
			console.error("Failed to remove item from wishlist", error);
		}
	};

	const isInWishlist = (productId: number) => {
		return (
			Array.isArray(wishlist) && wishlist.some((item) => item.id === productId)
		);
	};

	return (
		<WishlistContext.Provider
			value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
		>
			{children}
		</WishlistContext.Provider>
	);
};
