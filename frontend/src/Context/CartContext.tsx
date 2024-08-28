"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import API_BASE_URL from "@/utils/config";
interface CartContextType {
	cartCount: number;
	addToCart: () => Promise<void>;
	deleteFromCart: () => Promise<void>;
	clearCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
	let [cartCount, setCartCount] = useState<number>(0);
	useEffect(() => {
		const fetchCartData = async () => {
			try {
				const token = Cookies.get("authToken");
				const response = await axios.get(`${API_BASE_URL}cart`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.status === 200) {
					const items = response.data.items;
					setCartCount(items.length);
				}
			} catch (error) {
				console.error("Failed to fetch cart data:", error);
			}
		};

		fetchCartData();
	}, []);
	const addToCart = async () => {
		setCartCount((prevCount) => prevCount + 1);
	};

	const deleteFromCart = async () => {
		setCartCount((prevCount) => Math.max(prevCount - 1, 0));
	};

	const clearCartCount = () => {
		setCartCount(0);
	};

	
	return (
		<CartContext.Provider
			value={{ cartCount, addToCart, deleteFromCart, clearCartCount }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
