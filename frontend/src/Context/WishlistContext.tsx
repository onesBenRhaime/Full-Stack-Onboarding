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

interface WishlistContextType {
	wishlistCount: number;
	wishlist: Product[];
	addToWishlist: (product: Product) => void;
	removeFromWishlist: (productId: number) => void;
	isInWishlist: (productId: number) => boolean;
	deleteAllWishlist: () => void;
}

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
	let [wishlistCount, setWishlistCount] = useState<number>(0);
	const [wishlist, setWishlist] = useState<Product[]>([]);

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const token = Cookies.get("authToken");
				const response = await fetch(`${API_BASE_URL}wishlist`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				console.log(data);

				if (data && Array.isArray(data.items)) {
					const transformedWishlist = data.items.map(
						(item: any) => item.product
					);
					setWishlist(transformedWishlist);
					setWishlistCount(transformedWishlist.length);
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
			const response = await fetch(`${API_BASE_URL}wishlist/add`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ productId: product.id }),
			});
			if (response.ok) {
				setWishlist((prevWishlist) => [...prevWishlist, product]);
				setWishlistCount((prevCount) => prevCount + 1);
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
				setWishlistCount((prevCount) => Math.max(prevCount - 1, 0));
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
	const deleteAllWishlist = async () => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}wishlist/delete-all`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setWishlist([]);
				setWishlistCount(0);
			} else {
				console.error("Failed to clear wishlist");
			}
		} catch (error) {
			console.error("Failed to clear wishlist", error);
		}
	};

	return (
		<WishlistContext.Provider
			value={{
				wishlistCount,
				wishlist,
				addToWishlist,
				removeFromWishlist,
				isInWishlist,
				deleteAllWishlist,
			}}
		>
			{children}
		</WishlistContext.Provider>
	);
};
