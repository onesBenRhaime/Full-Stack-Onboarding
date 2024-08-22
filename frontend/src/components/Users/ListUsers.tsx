import Image from "next/image";

export default function ListUsers() {
	const users = [
		{
			name: "ones ben rhaime",
			username: "ones ben rhaime",
			address: "NAbeul menzel temime",
			profileImage: "/products/product-1.png",
		},
		{
			name: "ones ben rhaime",
			username: "ones ben rhaime",
			address: "NAbeul menzel temime",
			profileImage: "/products/product-1.png",
		},
		{
			name: "ones ben rhaime",
			username: "ones ben rhaime",
			address: "NAbeul menzel temime",
			profileImage: "/products/product-1.png",
		},
		{
			name: "ones ben rhaime",
			username: "ones ben rhaime",
			address: "NAbeul menzel temime",
			profileImage: "/products/product-1.png",
		},
		{
			name: "ones ben rhaime",
			username: "ones ben rhaime",
			address: "NAbeul menzel temime",
			profileImage: "/products/product-1.png",
		},
	];
	return (
		<>
			{" "}
			<div className="flex-1 p-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">All Users</h1>
					<button className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-primary  ">
						+ ADD NEW USER
					</button>
				</div>

				{/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"></div> */}

				<div className="overflow-x-auto">
					<table className="min-w-full bg-white">
						<thead>
							<tr className="w-full  text-gray-600 uppercase text-sm leading-normal">
								<th className="py-3 px-6 text-left">Profile</th>
								<th className="py-3 px-6 text-left">Name</th>
								<th className="py-3 px-6 text-left">Username</th>
								<th className="py-3 px-6 text-left">Address</th>
								<th className="py-3 px-6 text-left">Action</th>
							</tr>
						</thead>
						<tbody className="text-gray-600 text-sm font-light">
							{users.map((user, index) => (
								<tr key={index} className="border-b  hover:bg-purple-200  ">
									<td className="py-3 px-6 text-left whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-10 h-10">
												<Image
													src={user.profileImage}
													alt={user.name}
													width={40}
													height={40}
													className="rounded-full"
												/>
											</div>
										</div>
									</td>
									<td className="py-3 px-6 text-left">
										<div className="flex items-center">
											<span className="font-medium">{user.name}</span>
										</div>
									</td>
									<td className="py-3 px-6 text-left">
										<span>{user.username}</span>
									</td>
									<td className="py-3 px-6 text-left">
										<span>{user.address}</span>
									</td>
									<td className="py-3 px-6 text-left">
										<button className="text-black border-collapse border-2 me-2 border-primary rounded-lg p-2  ">
											edit
										</button>
										<button className="text-black border-collapse border-2 border-red-600 rounded-lg p-2  ">
											delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
