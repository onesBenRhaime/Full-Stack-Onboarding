import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
		>
			<header className="w-full py-4  text-black">
				<div className="container mx-auto flex justify-between items-center">
					<div className="text-2xl font-bold">E-commerce-Fullstack</div>
					<nav>
						<ul className="flex space-x-4">
							<li>
								<Link href="/login" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:underline">
									Login
								</Link>
							</li>
							<li>
								<Link href="/register" className="hover:underline">
									Register
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</main>
	);
}
