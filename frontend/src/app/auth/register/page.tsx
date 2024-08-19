"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import * as Yup from "yup";

const schema = Yup.object({
	username: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

export default function Register() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{
		username?: string;
		email?: string;
		password?: string;
	}>({});
	const mutation = useMutation({
		mutationFn: (data: any) =>
			axios.post("http://localhost:5000/auth/register", data),
		onSuccess: (data) => {
			if (data.status === 401) {
				alert("Invalid credentials");
				return;
			}
			alert("Register successful");
		},
		onError: () => {
			alert("An error occurred");
		},
	});
	const validateForm = async () => {
		try {
			await schema.validate(
				{ username, email, password },
				{ abortEarly: false }
			);
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
			mutation.mutate({ username, email, password });
		}
	};

	return (
		<>
			<section className="relative flex flex-col md:flex-row justify-between items-center">
				<div className="w-full md:w-auto">
					<Image
						width="945"
						height="1024"
						alt="Register"
						src="/images/register.png"
						className="w-full h-auto md:h-full object-cover"
					/>
				</div>
				<div className="w-full md:w-1/3 lg:w-1/2 lg:m-8 p-4">
					<div className="">
						<h1 className="font-bold text-2xl md:text-3xl text-black">
							Create New Account
						</h1>
						<p className="text-gray-500 text-lg md:text-xl font-sans py-4">
							Please enter details
						</p>
						<div>
							{/* Form */}

							<form onSubmit={onSubmit}>
								<div className="mb-8">
									<label
										htmlFor="username"
										className="mb-3 block text-sm text-dark font-sans"
									>
										UserName
									</label>
									<input
										type="text"
										id="username"
										placeholder="Enter your UserName"
										className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300"
										style={{
											border: "1px solid #131118",
											borderRadius: "10px",
										}}
										onChange={(e) => setUsername(e.target.value)}
									/>{" "}
									{errors.username && (
										<p className="text-red-500">{errors.username}</p>
									)}
								</div>
								<div className="mb-8">
									<label
										htmlFor="email"
										className="mb-3 block text-sm text-dark font-sans"
									>
										Email Address
									</label>
									<input
										type="email"
										id="email"
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your Email Address"
										className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300"
										style={{
											border: "1px solid #131118",
											borderRadius: "10px",
										}}
									/>
								</div>
								{errors.email && <p className="text-red-500">{errors.email}</p>}
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
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter your Password"
										className="w-full rounded-md bg-white px-6 py-3 text-base text-black outline-none transition-all duration-300"
										style={{
											border: "1px solid #131118",
											borderRadius: "10px",
										}}
									/>
									{errors.password && (
										<p className="text-red-500">{errors.email}</p>
									)}
								</div>
								<div className="mb-4 flex items-center">
									<input
										type="checkbox"
										className="rounded-md bg-white me-2 accent-black"
									/>
									<span>
										I agree to the <b>Terms & Conditions</b>
									</span>
								</div>
								<div className="flex mb-2 justify-center">
									<span>Already have an account?</span>
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
									Sign Up
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
