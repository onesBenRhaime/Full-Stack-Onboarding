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
		<html lang="en" suppressHydrationWarning={true}>
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
				<meta name="description" content="A Next.js app with Tailwind CSS" />
				<title>E-commerce</title>
				<link rel="icon" href="/images/icon.png" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
			</head>
			<body className={recursive.className} suppressHydrationWarning={true}>
				<main className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]">
					<div className="flex-1 flex flex-col h-full">
						<Providers>{children}</Providers>
					</div>
				</main>{" "}
			</body>
		</html>
	);
}
