import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: any) =>
			axios.post("http://localhost:5000/auth/login", data),
		onSuccess: (data) => {
			if (data.status === 401) {
				alert("Invalid credentials");
				return;
			}
			alert("Login successful");
		},
	});

	const onSubmit = (data: any) => {
		mutation.mutate(data);
	};
	return (
		<>
			<section className="absolute flex flex-row justify-between items-center ">
				<div className="w-auto ">
					<Image
						className=""
						width="945"
						height="1024"
						alt=""
						src="/images/login.png"
					/>
				</div>
				<div className="w-1/3 top-0 ms-4">
					<h1 className="font-bold text-3xl text-black"> Welcome 👋</h1>
					<p className="text-gray-500 text-xl  font-sans py-4 ">
						Please login here
					</p>
					<div>
						{/* //from login  */}
						<form onSubmit={handleSubmit(onSubmit)}>
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
									{...register("email")}
									placeholder="Enter your Email"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base  outline-none transition-all duration-300 "
									style={{ border: "1px solid #131118", borderRadius: "10px" }}
								/>{" "}
								{errors.email && (
									<p className="text-red-500">{errors.email.message}</p>
								)}
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
									{...register("password")}
									placeholder="Enter your Password"
									className=" w-full   rounded-md  bg-white px-6 py-3 text-base  outline-none transition-all duration-300 "
									style={{ border: "1px solid #131118", borderRadius: "10px" }}
								/>
								{errors.password && (
									<p className="text-red-500">{errors.password.message}</p>
								)}
							</div>
							<Link href="" className="flex justify-end mb-4">
								Forgot Password?
							</Link>
							<button
								type="submit"
								className="w-full bg-black text-white rounded-sm py-3"
							>
								Login
							</button>{" "}
							<div className=" flex mb-4 py-4  justify-center ">
								you don't have an account?
								<Link
									href="/auth/register"
									className="ms-1  underline hover:text-primary hover:font-bold"
								>
									Register here
								</Link>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}
