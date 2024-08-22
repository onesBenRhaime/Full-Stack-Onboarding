import Image from "next/image";

export default function ProductGrid() {
	return (
		<div className="flex-1 p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">All Products</h1>
				<button className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-primary  ">
					+ ADD NEW PRODUCT
				</button>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
				{[...Array(3)].map((_, index) => (
					<div key={index} className="bg-white p-4 rounded-xl shadow-lg">
						<div className="flex justify-between items-center mb-2 mx-2">
							<Image
								src="/products/product-1.png"
								alt="Product"
								width={80}
								height={80}
								className="object-cover rounded-lg"
							/>
							<div className="flex flex-col">
								<h3 className="text-xl font-semibold ">Lorem Ipsum</h3>
								<p className="text-gray-600 ">Battery</p>
								<p className="text-primary text-md font-bold ">$110.40</p>
							</div>
							<button className="text-black hover:text-black font-bold   ">
								...
							</button>
						</div>

						<p className="text-sm text-gray-600">Summary</p>
						<p className="text-xs text-gray-400 mb-4">
							Lorem ipsum is placeholder text commonly used in the graphic.
						</p>
						<div className="flex-col justify-between text-sm border-collapse border-2  rounded-xl">
							<div className="text-gray-600 m-2 flex justify-between">
								Sales{" "}
								<div className=" flex">
									<span className="text-primary me-2">1269</span>
									<Image
										src="/icons/top.svg"
										width={30}
										height={30}
										alt="Sale"
										className="ml-2"
										color="primary"
									/>
								</div>
							</div>

							<hr className="my-2 mx-2" />
							<div className="text-gray-600 m-2 flex justify-between">
								Remaining Products
								<div className="flex">
									<span className="text-primary me-2">1269</span>
									<Image
										src="/icons/progress.svg"
										width={30}
										height={30}
										alt="Sale"
										className="ml-2 w-30 h-30"
										color="primary"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
