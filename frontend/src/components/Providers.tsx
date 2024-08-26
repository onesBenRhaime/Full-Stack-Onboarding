"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import HeaderSection from "./Header/headerSection";
import Footer from "./Footer";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={client}>
			<HeaderSection />
			{children}
			<Footer />
		</QueryClientProvider>
	);
};

export default Providers;
