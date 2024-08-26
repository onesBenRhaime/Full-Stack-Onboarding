const Newsletter = () => {
	return (
		<section className="  flex-row  bg-white shadow rounded-xl p-6 text-center items-center justify-center">
			<h2 className="text-xl font-semibold mb-4">
				Stay in the Loop with the Latest Trends and Deals!
			</h2>
			<div className="flex items-center justify-center space-x-2">
				<input
					type="text"
					className="w-1/3 rounded-xl  border border-gray-300  py-2 px-4"
					placeholder="Enter your Full Name"
				/>
				<input
					type="email"
					className="w-1/3 border border-gray-300 rounded-xl py-2 px-4"
					placeholder="Email address"
				/>
				<button className="  bg-black text-white px-4 py-2 w-1/4 rounded-xl hover:bg-white hover:text-black  border hover:font-bold">
					Subscribe
				</button>
			</div>
		</section>
	);
};
export default Newsletter;
