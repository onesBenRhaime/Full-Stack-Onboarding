import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const schema = Yup.object({
	username: Yup.string().required("Username is required"),
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const mutation = useMutation({
		mutationFn: (data: any) => axios.post("/register", data),
		onSuccess: () => {
			alert("Registration successful");
		},
	});

	const onSubmit = (data: any) => {
		mutation.mutate(data);
	};

	return (
		<>
			<header className="w-full py-4 mt-5  text-black">
				<div className="container mx-auto flex justify-between items-center">
					<div className="text-2xl font-bold">E-commerce-Fullstack</div>
					<nav>
						<ul className="flex space-x-4">
							<li>
								<Link href="/login" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/login" className="hover:underline">
									Login
								</Link>
							</li>
							<li>
								<Link href="/register" className="hover:underline">
									Register
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
			<section className="relative z-10 overflow-hidden pb-16  md:pb-20 lg:pb-28 lg:pt-[80px]">
				<div className="container">
					<div className="-mx-4 flex flex-wrap">
						<div className="w-full px-4">
							<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
								<h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
									Create your account
								</h3>
								<p className="mb-11 text-center text-base font-medium text-body-color">
									It’s totally free and super easy
								</p>

								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mb-8">
										<label
											htmlFor="username"
											className="mb-3 block text-sm text-dark dark:text-white"
										>
											Full Name
										</label>
										<input
											id="username"
											{...register("username")}
											placeholder="Enter your full name"
											className={`border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none ${
												errors.username ? "border-red-500" : ""
											}`}
										/>
										{errors.username && (
											<p className="text-red-500 text-sm">
												{errors.username.message}
											</p>
										)}
									</div>

									<div className="mb-8">
										<label
											htmlFor="email"
											className="mb-3 block text-sm text-dark dark:text-white"
										>
											Your Email
										</label>
										<input
											id="email"
											type="email"
											{...register("email")}
											placeholder="Enter your Email"
											className={`border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none ${
												errors.email ? "border-red-500" : ""
											}`}
										/>
										{errors.email && (
											<p className="text-red-500 text-sm">
												{errors.email.message}
											</p>
										)}
									</div>

									<div className="mb-8">
										<label
											htmlFor="password"
											className="mb-3 block text-sm text-dark dark:text-white"
										>
											Your Password
										</label>
										<input
											id="password"
											type="password"
											{...register("password")}
											placeholder="Enter your Password"
											className={`border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none ${
												errors.password ? "border-red-500" : ""
											}`}
										/>
										{errors.password && (
											<p className="text-red-500 text-sm">
												{errors.password.message}
											</p>
										)}
									</div>

									<button
										type="submit"
										className="w-full rounded-sm bg-primary py-3 px-6 text-base font-medium text-white transition-all duration-300 hover:bg-opacity-90"
									>
										Register
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default RegisterPage;
