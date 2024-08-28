"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import Toast from "@/components/ui/Toast";
import * as Yup from "yup";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/utils/config";

const schema = Yup.object({
	username: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string()
		.min(6, "Password must be more than 5 characters")
		.matches(/^[a-zA-Z0-9]*$/, "Password must be alphanumeric")
		.required("Password is required"),
});
// Password must be more then  6 characters

export default function Register() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{
		username?: string;
		email?: string;
		password?: string;
	}>({});
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const mutation = useMutation({
		mutationFn: (data: any) => axios.post(`${API_BASE_URL}auth/register`, data),
		onSuccess: (data) => {
			if (data.status === 401) {
				setAlertMessage({
					title: "Register Failed",
					description: `User already exists`,
					variant: "error",
				});
				setTimeout(() => setAlertMessage(null), 3000);
				return;
			}
			setAlertMessage({
				title: "Register Successful",
				description: "You have registered successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 3000);
			router.push("/auth/login");
		},
		onError: () => {
			setAlertMessage({
				title: "Register Failed",
				description: "Something went wrong",
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
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
			<section className="flex flex-col lg:flex-row justify-center lg:justify-start items-center fixed">
				<div className="w-full lg:w-auto lg:h-auto h-full flex justify-center items-center">
					<h1 className=" fixed left-20 top-8 z-0  font-bold text-5xl">
						<span className="text-primary ">E-</span>commerce
					</h1>
					<Image
						width="945"
						height="1024"
						alt="Register"
						src="/images/register.png"
						className="w-full lg:w-auto lg:block hidden"
					/>
				</div>
				<div className="lg:w-1/2 w-full p-4 lg:p-0 flex-row  items-center justify-center   lg:static absolute inset-0 lg:mt-0 mt-0 mb-24  max-w-full">
					{alertMessage && (
						<div className="fixed bottom-4 lg:top-0 lg:right-4 right-4">
							<Toast
								title={alertMessage.title}
								description={alertMessage.description}
								variant={alertMessage.variant}
							/>
						</div>
					)}
					<div className="bg-white border rounded-xl px-10 py-4 w-full lg:w-auto mx-4">
						<h1 className="font-bold text-5xl text-black">
							Create New Account
						</h1>
						<p className="text-gray-500 text-xl font-sans py-4">
							Please enter details
						</p>

						<form onSubmit={onSubmit} className="">
							<div className="mb-4">
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
									className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300 w-"
									style={{
										border: "1px solid #131118",
										borderRadius: "10px",
									}}
									onChange={(e) => setUsername(e.target.value)}
								/>
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
									<p className="text-red-500">{errors.password}</p>
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
					</div>{" "}
				</div>
				{/*	<div className="lg:w-1/2 w-full p-4 lg:p-0 flex items-center  lg:static absolute inset-0 lg:mt-40 mt-0   max-w-full">
					<div className="bg-white border rounded-xl px-10 py-8 w-full lg:w-auto mx-4">
						<div className="">
							<h1 className="font-bold text-3xl text-black">
								Create New Account
							</h1>
							<p className="text-gray-500 text-xl font-sans py-4">
								Please enter details
							</p>

							<form onSubmit={onSubmit} className="">
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
										className="w-full rounded-md bg-white px-6 py-3 text-base outline-none transition-all duration-300 w-"
										style={{
											border: "1px solid #131118",
											borderRadius: "10px",
										}}
										onChange={(e) => setUsername(e.target.value)}
									/>
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
										<p className="text-red-500">{errors.password}</p>
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
				</div>*/}
			</section>
		</>
	);
}
