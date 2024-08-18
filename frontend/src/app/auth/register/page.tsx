import Image from "next/image";
import Link from "next/link";

export default function Register() {
	return (
		<>
			<section className="relative  flex flex-row justify-between items-center  ">
				<div className="w-auto ">
					<Image width="945" height="1024" alt="" src="/images/register.png" />
				</div>
				<div className="w-1/3 m-4">
					<h1 className="font-bold text-3xl text-black"> Create New Account</h1>
					<p className="text-gray-500 text-xl  font-sans py-4 ">
						Please enter details
					</p>
					<div>
						{/* //from Register  */}
						<form>
							<div className="mb-8">
								<label
									htmlFor="email"
									className="mb-3 block text-sm text-dark font-sans "
								>
									First Name
								</label>
								<input
									type="text"
									id="FirstName"
									placeholder="Enter your First Name"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base  outline-none transition-all duration-300 "
									style={{
										border: "1px solid #131118",
										borderRadius: "10px",
									}}
								/>
							</div>
							<div className="mb-8">
								<label
									htmlFor="email"
									className="mb-3 block text-sm text-dark font-sans "
								>
									Last Name
								</label>
								<input
									type="text"
									id="LastName"
									placeholder="Enter your Last Name"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base  outline-none transition-all duration-300 "
									style={{
										border: "1px solid #131118",
										borderRadius: "10px",
									}}
								/>
							</div>
							<div className="mb-8">
								<label
									htmlFor="email"
									className="mb-3 block text-sm text-dark font-sans "
								>
									Email Address
								</label>
								<input
									type="email"
									id="email"
									placeholder="Enter your Email Address"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base  outline-none transition-all duration-300 "
									style={{
										border: "1px solid #131118",
										borderRadius: "10px",
									}}
								/>
							</div>
							<div className="mb-4">
								<label
									htmlFor="password"
									className="mb-3 block text-sm text-dark font-sans"
								>
									Password
								</label>
								<input
									type="password"
									id="password"
									placeholder="Enter your Password"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base text-black  outline-none transition-all duration-300 "
									style={{
										border: "1px solid #131118",
										borderRadius: "10px",
									}}
								/>
							</div>
							<div className="mb-4">
								{" "}
								<input
									type="checkbox"
									className="rounded-md bg-white me-2 size-5 accent-black"
								/>
								I agree to the <b>Terms & Conditions</b>
							</div>
							<div className=" flex mb-2  justify-center ">
								Already have an account?{" "}
								<Link
									href="/auth/login"
									className="ms-1 underline hover:text-primary hover:font-bold"
								>
									Login
								</Link>
							</div>
							<button
								type="submit"
								className="w-full bg-black text-white rounded-sm py-3"
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
