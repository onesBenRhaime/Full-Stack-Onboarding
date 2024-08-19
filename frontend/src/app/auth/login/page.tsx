"use client";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

const schema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{
		username?: string;
		password?: string;
	}>({});

	const mutation = useMutation({
		mutationFn: (data: any) =>
			axios.post("http://localhost:5000/auth/login", data),
		onSuccess: (data) => {
			alert("Login successful");
		},
	});

	const validateForm = async () => {
		try {
			await schema.validate({ username, password }, { abortEarly: false });
			return true;
		} catch (error) {
			const validationErrors: any = {};
			if (error instanceof Yup.ValidationError) {
				error.inner.forEach((err) => {
					if (err.path) {
						validationErrors[err.path] = err.message;
					}
				});
			}
			setErrors(validationErrors);
			return false;
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const isValid = await validateForm();
		if (isValid) {
			mutation.mutate({ username, password });
		}
	};

	return (
		<section className=" flex flex-row justify-between  fixed">
			<div className="w-auto">
				<h1 className=" fixed left-20 top-8 z-0  font-bold text-2xl">
					<span className="text-primary ">E-</span>commerce
				</h1>
				<Image
					width="945"
					height="1024"
					alt="Login Image"
					src="/images/login.png"
				/>
			</div>
			<div className="w-1/3 top-0 ms-4 mt-40 ml-10">
				<h1 className="font-bold text-3xl text-black">Welcome 👋</h1>
				<p className="text-gray-500 text-xl font-sans py-4">
					Please login here
				</p>

				<form onSubmit={onSubmit}>
					<div className="mb-8">
						<label
							htmlFor="email"
							className="mb-3 block text-sm text-dark font-sans"
						>
							Email Address
						</label>
						<input
							type="email"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your Email"
							className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300"
							style={{ border: "1px solid #131118", borderRadius: "10px" }}
						/>
						{errors.username && (
							<p className="text-red-500">{errors.username}</p>
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your Password"
							className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300"
							style={{ border: "1px solid #131118", borderRadius: "10px" }}
						/>
						{errors.password && (
							<p className="text-red-500">{errors.password}</p>
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
					</button>
					<div className="flex mb-4 py-4 justify-center">
						You don&apos;t have an account?
						<Link
							href="/auth/register"
							className="ms-1 underline hover:text-primary hover:font-bold"
						>
							Register here
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
}
