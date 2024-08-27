"use client";

import { useWishlist } from "@/Context/WishlistContext";
import Image from "next/image";

const Wishlist = () => {
	const { wishlist, removeFromWishlist } = useWishlist();
	// console.log("wishlist : ", wishlist[0].id);

	return (
		<>
			<div className="container lg:flex lg:justify-between  lg:space-x-40 flex-row ">
				<section className="w-full mb-8 sm:px-2 lg:px-0">
					<div className="grid gap-4">
						<div className="bg-gray-50 p-6 shadow-md rounded-lg">
							{wishlist.length === 0 ? (
								<p className="text-gray-600">Your wishlist is empty.</p>
							) : (
								<div className="flex flex-col gap-6">
									{wishlist.map((item, index) => (
										<div
											className="bg-white shadow rounded-lg p-4 flex justify-start space-x-8"
											key={index}
										>
											<div className="bg-gray-200 h-40 rounded-md mb-4">
												<Image
													src={`/products/${item.imageUrl}`}
													alt="Product"
													width={200}
													height={200}
													className="w-full h-full rounded-lg"
												/>
											</div>
											<div className="flex-1">
												<h3 className="text-sm font-semibold uppercase">
													{item.name}
												</h3>
												<p className="text-xs text-gray-600 mb-2">
													{item.description}
												</p>
												<p className="text-lg font-bold">
													<span>€{item.price}</span>
												</p>
											</div>
											<button
												className="flex-1  justify-end "
												onClick={() => removeFromWishlist(item.id)}
											>
												<Image
													src="/icons/trash-2.png"
													alt="Delete"
													width={20}
													height={20}
												/>
											</button>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Wishlist;
