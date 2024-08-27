import Link from "next/link";

const AccessDenied = () => {
	return (
		<div className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="text-center">
				<h1 className="text-6xl font-bold text-red-600">403</h1>
				<h2 className="mt-4 text-3xl font-semibold text-gray-800">
					Access Denied
				</h2>
				<p className="mt-2 text-lg text-gray-600">
					You do not have permission to access this page.
				</p>
				<Link href="/">
					<p className="mt-6 inline-block px-6 py-3 bg-black text-white font-medium text-lg rounded transition duration-300">
						Go to Home
					</p>
				</Link>
			</div>
		</div>
	);
};

export default AccessDenied;
