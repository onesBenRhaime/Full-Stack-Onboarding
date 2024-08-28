"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import HeaderSection from "./Header/headerSection";
import Footer from "./Footer";
import { CartProvider } from "@/Context/CartContext";
import { WishlistProvider } from "@/Context/WishlistContext";
import { AuthProvider } from "@/Context/AuthContext";
import { ProductProvider } from "@/Context/ProductContext";
import { OrderProvider } from "@/Context/OrderContext";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<QueryClientProvider client={client}>
				<ProductProvider>
					<OrderProvider>
						<CartProvider>
							<WishlistProvider>{children}</WishlistProvider>
						</CartProvider>
					</OrderProvider>
				</ProductProvider>
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default Providers;
