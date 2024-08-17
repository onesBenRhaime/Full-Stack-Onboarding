import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../styles/globals.css"; 
import { AppProps } from "next/app";


// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}

export default MyApp;
