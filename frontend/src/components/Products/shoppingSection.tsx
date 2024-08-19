import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Image from "next/image";

const Shopping = () => {
	return (
		<>
			<div className="bg-secondary grainy-light container">
				<MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
					<section className=" py-5 flex flex-col  items-center ">
						<div className="flex-row items-center text-center ">
							<h1 className="uppercase text-4xl  font-bold mb-10">
								FLASH SALE
							</h1>
							<nav className="items-center">
								<ul className="flex flex-row justify-between  space-x-20  ">
									<li className="hover:text-primary  underline ">MEN</li>
									<li className="hover:text-primary  underline ">WOMEN </li>
									<li className="hover:text-primary  underline ">KIDS</li>
									<li className="hover:text-primary  underline ">
										ACCESSPRIES
									</li>
								</ul>
							</nav>
						</div>
						<div className=" item-center width-1/3 flex flex-row justify-center gap-x-9 gap-y-5  mt-10">
							<div className="relative w-full transform-gpu bg-white shadow-three transition duration-300 ease-in-out hover:-translate-y-5  ">
								<div className="rounded-sm  px-8 py-2  hover:shadow-one ">
									<div className="flex items-center ">
										<Image
											src="/images/products/1.png"
											width="350"
											height="512"
											alt="fsdf"
											className="mb-8"
										/>
									</div>
									<div className="flex-row mb-2">
										<h1 className="font-semibold text-3xl mb-8">T-shirt</h1>
										<p className="text-gray-400 font-medium  text-lg w-80 mb-8">
											Turn heads with the Elegant Floral Midi Dress, a perfect
											blend of sophistication and charm.
										</p>
										<div className="flex justify-between">
											{" "}
											<p className="font-semibold text-lg">$150</p>
											<button
												className=" text-primary px-4 py-2 rounded-full border-spacing-1 hover:bg-primary hover:text-white"
												style={{
													border: " 1px solid #E08CFF",
													borderRadius: "100px",
													width: "76px",
												}}
											>
												Buy
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="relative w-full transform-gpu bg-white shadow-three transition duration-300 ease-in-out hover:-translate-y-5  ">
								<div className="rounded-sm  px-8 py-2  hover:shadow-one ">
									<div className="flex items-center ">
										<Image
											src="/images/products/3.png"
											width="350"
											height="512"
											alt="fsdf"
											className="mb-8"
										/>
									</div>
									<div className="flex-row mb-2">
										<h1 className="font-semibold text-3xl mb-8">T-shirt</h1>
										<p className="text-gray-400 font-medium  text-lg w-80 mb-8">
											Turn heads with the Elegant Floral Midi Dress, a perfect
											blend of sophistication and charm.
										</p>
										<div className="flex justify-between">
											{" "}
											<p className="font-semibold text-lg">$150</p>
											<button
												className=" text-primary px-4 py-2 rounded-full border-spacing-1 hover:bg-primary hover:text-white"
												style={{
													border: " 1px solid #E08CFF",
													borderRadius: "100px",
													width: "76px",
												}}
											>
												Buy
											</button>
										</div>
									</div>
								</div>
							</div>{" "}
							<div className="relative w-full transform-gpu bg-white shadow-three transition duration-300 ease-in-out hover:-translate-y-5  ">
								<div className="rounded-sm  px-8 py-2  hover:shadow-one ">
									<div className="flex items-center ">
										<Image
											src="/images/products/2.png"
											width="350"
											height="512"
											alt="fsdf"
											className="mb-8"
										/>
									</div>
									<div className="flex-row mb-2">
										<h1 className="font-semibold text-3xl mb-8">T-shirt</h1>
										<p className="text-gray-400 font-medium  text-lg w-80 mb-8">
											Turn heads with the Elegant Floral Midi Dress, a perfect
											blend of sophistication and charm.
										</p>
										<div className="flex justify-between">
											{" "}
											<p className="font-semibold text-lg">$150</p>
											<button
												className=" text-primary px-4 py-2 rounded-full border-spacing-1 hover:bg-primary hover:text-white"
												style={{
													border: " 1px solid #E08CFF",
													borderRadius: "100px",
													width: "76px",
												}}
											>
												Buy
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</MaxWidthWrapper>
			</div>
		</>
	);
};

export default Shopping;
