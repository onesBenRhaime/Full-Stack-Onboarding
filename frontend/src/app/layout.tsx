import { Recursive } from "next/font/google";
import "../styles/globals.css";
import Providers from "../components/Providers";

const recursive = Recursive({ subsets: ["latin"] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={recursive.className}>
				<main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
					<div className="flex-1 flex flex-col h-full">
						<Providers>{children}</Providers>
					</div>
				</main>{" "}
			</body>
		</html>
	);
}
