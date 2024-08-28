"use client";

import React, {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from "react";
import Cookies from "js-cookie";
import API_BASE_URL from "@/utils/config";

// Define the shape of an order
interface Order {
	id: number;
	user: {
		username: string;
	};
	orderDate: string;
	status: string;
	totalAmount: number;
	items: {
		productId: number;
		quantity: number;
	}[];
}

interface OrderContextType {
	orders: Order[];
	fetchOrders: () => void;
	placeOrder: (method: string) => Promise<void>;
	acceptOrder: (id: number) => Promise<void>;
	rejectOrder: (id: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
	const context = useContext(OrderContext);
	if (!context) {
		throw new Error("useOrder must be used within an OrderProvider");
	}
	return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
	const [orders, setOrders] = useState<Order[]>([]);

	const fetchOrders = async () => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}orders/all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			setOrders(data);
		} catch (error) {
			console.error("Failed to fetch orders", error);
			setOrders([]);
		}
	};

	const placeOrder = async (method: string) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}orders`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ method }),
			});
			if (response.ok) {
				fetchOrders();
			} else {
				console.error("Failed to place order");
			}
		} catch (error) {
			console.error("Failed to place order", error);
		}
	};

	const acceptOrder = async (id: number) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}orders/accept/${id}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				fetchOrders();
			} else {
				console.error("Failed to accept order");
			}
		} catch (error) {
			console.error("Failed to accept order", error);
		}
	};

	const rejectOrder = async (id: number) => {
		try {
			const token = Cookies.get("authToken");
			const response = await fetch(`${API_BASE_URL}orders/reject/${id}`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				fetchOrders();
			} else {
				console.error("Failed to reject order");
			}
		} catch (error) {
			console.error("Failed to reject order", error);
		}
	};

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<OrderContext.Provider
			value={{
				orders,
				fetchOrders,
				placeOrder,
				acceptOrder,
				rejectOrder,
			}}
		>
			{children}
		</OrderContext.Provider>
	);
};
