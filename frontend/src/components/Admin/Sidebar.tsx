"use client";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import API_BASE_URL from "@/utils/config";
import { useState } from "react";

const Sidebar = ({
	isOpen,
	toggleSidebar,
}: {
	isOpen: boolean;
	toggleSidebar: () => void;
}) => {
	const fetchcategorys = async () => {
		const response = await fetch(`${API_BASE_URL}categories`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		return response.json();
	};

	const { data: category } = useQuery({
		queryKey: ["categorys"],
		queryFn: fetchcategorys,
		staleTime: Infinity,
	});

	const [isOpenCat, setIsOpenCat] = useState(false);

	const toggleList = () => {
		setIsOpenCat((prev) => !prev);
	};

	return (
		<>
			{/* Sidebar */}
			<div
				className={`bg-white w-2/3 lg:w-1/6 h-full fixed lg:relative top-0 left-0 z-40 lg:z-0 transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 lg:translate-x-0`}
			>
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center mt-4 py-4">
						{/* Button to toggle sidebar */}
						<button
							className="lg:hidden flex items-center p-4 bg-primary text-white fixed top-4 left-4 z-50 rounded-full"
							onClick={toggleSidebar}
						>
							<Image
								src="/icons/FilterRight.png"
								className="w-6 h-6 mr-2"
								width={24}
								height={24}
								alt="Menu"
							/>
						</button>
						<Link href="/" className="flex z-40 font-semibold text-xl ml-4">
							E-<span className="text-primary">commerce</span>
						</Link>
					</div>

					<nav>
						<ul>
							<li className="flex justify-start text-black px-8 py-4 mt-8 text-md hover:bg-primary hover:text-white font-bold hover:rounded-xl uppercase">
								<Image
									src="/icons/dashboard.svg"
									className="w-6 h-6"
									width={6}
									height={6}
									alt="product"
								/>
								<Link href="/admin" className="ms-2">
									Dashboard
								</Link>
							</li>
							<li className="text-black px-8 py-4 mb-4 text-md hover:bg-primary hover:text-white font-bold hover:rounded-xl uppercase">
								<Link href="/admin/products" className="flex justify-start">
									<Image
										src="/icons/product.svg"
										className="w-6 h-6"
										width={6}
										height={6}
										alt="product"
									/>
									<p className="ms-2">Products</p>
								</Link>
							</li>
							<li className="text-black px-8 py-4 mb-4 text-md hover:bg-primary hover:text-white font-bold hover:rounded-xl uppercase">
								<Link href="/admin/order" className="flex justify-start">
									<Image
										src="/icons/listOrder.svg"
										className="w-6 h-7"
										width={6}
										height={6}
										alt="product"
									/>
									<p className="ms-2">Order list</p>
								</Link>
							</li>
							<li className="flex justify-start text-black px-8 py-4 mb-4 text-md hover:bg-primary hover:text-white font-bold hover:rounded-xl uppercase">
								<Image
									src="/icons/users.svg"
									className="w-6 h-7"
									width={6}
									height={6}
									alt="product"
								/>
								<Link href="/admin/user" className="ms-2">
									Users
								</Link>
							</li>
						</ul>
						<ul className="list-none">
							<li
								className="flex justify-between items-center text-black px-4 mb-4 text-lg font-bold uppercase cursor-pointer"
								onClick={toggleList}
							>
								Categories
								{isOpenCat ? (
									<Image
										src="/icons/retract.svg"
										className="w-8 h-8"
										width={32}
										height={32}
										alt="close list"
									/>
								) : (
									<Image
										src="/icons/open.svg"
										className="w-8 h-8"
										width={32}
										height={32}
										alt="open list"
									/>
								)}
							</li>
							{isOpenCat && (
								<ul className="list-none px-0">
									{category?.map((cat: any) => (
										<li key={cat.id} className="text-black px-8 py-4">
											<Link
												href={`/admin/category/${cat.id}`}
												className="font-semibold hover:text-primary"
											>
												{cat.name}
											</Link>
										</li>
									))}
								</ul>
							)}
						</ul>
					</nav>
				</div>
			</div>

			{isOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 lg:hidden"
					onClick={toggleSidebar}
				></div>
			)}
		</>
	);
};

export default Sidebar;
