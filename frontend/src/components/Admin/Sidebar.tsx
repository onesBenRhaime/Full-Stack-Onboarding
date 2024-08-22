"use client";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
	return (
		<>
			<div className="bg-white w-1/3 lg:w-1/6 h-full">
				<div className="flex flex-col items-center justify-center">
					<div className="flex items-center justify-center mt-4 py-4 ">
						{/* h-12 w-12 rounded-full bg-white text-black */}
						<Link href="/" className="flex z-40 font-semibold">
							E-
							<span className="text-primary">commerce</span>
						</Link>
					</div>

					<nav>
						<ul>
							<li className=" flex justify-start  text-black px-8 py-4  mt-8  text-md hover:bg-primary hover:text-white font-bold  hover:rounded-xl uppercase ">
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
							<li className=" flex justify-start  text-black px-8 py-4  mb-4 text-md hover:bg-primary hover:text-white font-bold  hover:rounded-xl uppercase ">
								{/* // icon svg   for products  */}

								<Image
									src="/icons/product.svg"
									className="w-6 h-6"
									width={6}
									height={6}
									alt="product"
								/>

								<Link href="/admin/products" className="ms-2">
									Products
								</Link>
							</li>
							<li className=" flex justify-start  text-black px-8 py-4  mb-4 text-md hover:bg-primary hover:text-white font-bold  hover:rounded-xl uppercase ">
								<Image
									src="/icons/listOrder.svg"
									className="w-6 h-7"
									width={6}
									height={6}
									alt="product"
								/>
								<Link href="/admin/order" className="ms-2">
									Order list
								</Link>
							</li>

							<li className=" flex justify-start  text-black px-8 py-4  mb-4 text-md hover:bg-primary hover:text-white font-bold  hover:rounded-xl uppercase ">
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
						{/* ///open ul with cone for catgories it have lit of categories :
							main - wommen - kids and it is a text bold and hover effect */}
						<ul>
							<li className="  flex justify-between  text-black px-0   mb-4 text-bold text-lg uppercase font-bold ">
								Categories
								<Image
									src="/icons/open.svg"
									className="w-8 h-8 "
									width={6}
									height={6}
									alt="open list"
								/>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
