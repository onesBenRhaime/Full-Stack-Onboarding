"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import HeaderSection from "./Header/headerSection";
import Footer from "./Footer";
import { CartProvider } from "@/Context/CartContext";
import { WishlistProvider } from "@/Context/WishlistContext";
import { AuthProvider } from "@/Context/AuthContext";
import { ProductProvider } from "@/Context/ProductContext";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<ProductProvider>
				<CartProvider>
					<WishlistProvider>
						<QueryClientProvider client={client}>
							{children}
						</QueryClientProvider>
					</WishlistProvider>
				</CartProvider>
			</ProductProvider>
		</AuthProvider>
	);
};

export default Providers;
