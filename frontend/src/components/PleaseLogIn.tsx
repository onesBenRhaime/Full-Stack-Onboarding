// components/PleaseLogIn.js

import Link from "next/link";

const PleaseLogIn = () => {
	return (
		<div className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-red-600">Please Log In</h1>
				<h2 className="mt-4 text-3xl font-semibold text-gray-800">
					Access Restricted
				</h2>
				<p className="mt-2 text-lg text-gray-600">
					You need to log in to access this page.
				</p>
				<Link href="/auth/login">
					<p className="mt-6 inline-block px-6 py-3 bg-black text-white font-medium text-lg rounded transition duration-300">
						Log In
					</p>
				</Link>
			</div>
		</div>
	);
};

export default PleaseLogIn;
