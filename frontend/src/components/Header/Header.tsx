"use client";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";

import { useState } from "react";
const Header = () => {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState<{
		username: string;
		role: Array<string>;
	} | null>(null);
	const { data: token } = useQuery({
		queryKey: ["authToken"],
		queryFn: () => {
			const token = Cookies.get("authToken");
			if (token) {
				const decodedToken: { username: string; role: Array<string> } =
					jwt_decode(token);
				// localStorage.setItem("role", decodedToken.role.join(","));
				// localStorage.setItem("username", decodedToken.username);

				setUserInfo({
					username: decodedToken.username,
					role: decodedToken.role,
				});
			}
			return token;
		},
		staleTime: Infinity,
	});

	const handleLogout = () => {
		Cookies.remove("authToken");
		router.push("/auth/login");
	};

	return (
		<nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
			<MaxWidthWrapper>
				<div className="flex h-14 items-center justify-between border-b border-zinc-200">
					<Link href="/" className="flex z-40 font-semibold">
						{userInfo?.role && userInfo.role.includes("admin") ? (
							<span>
								E-
								<span className="text-primary">commerce</span> ADMIN Dash
							</span>
						) : (
							<span>
								E-
								<span className="text-primary">commerce</span>
							</span>
						)}
					</Link>
					<nav className="">
						<ul className="flex space-x-8">
							<li>
								<Link href="/" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/products" className="hover:underline">
									Products
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:underline">
									About
								</Link>
							</li>
						</ul>
					</nav>
					<div className="h-full flex items-center space-x-2">
						{token ? (
							<>
								<Image
									src="/images/Person.png"
									width={18}
									height={18}
									alt="User"
									className="me-2"
								/>
								<span className="me-2">{userInfo?.username}</span>
								<div className="h-4 w-px bg-zinc-600  sm:block" />
								<button onClick={handleLogout} className="me-2 hover:underline">
									Logout
								</button>
							</>
						) : (
							<>
								<Link href="/" className="hidden sm:block">
									<Image
										src="/images/search.png"
										width={18}
										height={18}
										alt="Search"
										className="me-2"
									/>
								</Link>
								<div className="h-4 w-px bg-zinc-600  sm:block" />
								<Image
									src="/images/Person.png"
									width={18}
									height={18}
									alt="User"
									className="me-2"
								/>

								<Link href="/auth/login" className="me-2 hover:underline">
									Login
								</Link>
								<span className="me-2">/</span>
								<Link href="/auth/register" className="hover:underline">
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			</MaxWidthWrapper>
		</nav>
	);
};

export default Header;
