import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const schema = Yup.object({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
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
			<header className="w-full py-4  mt-5 text-black">
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
			<section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[8 0px]">
				<div className="container">
					<div className="-mx-4 flex flex-wrap">
						<div className="w-full px-4">
							<div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
								<div className="mb-8 flex items-center justify-center">
									<span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
									<p className="w-full px-5 text-center text-base font-medium text-body-color">
										Login
									</p>
									<span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
								</div>
								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="mb-8">
										<label
											htmlFor="email"
											className="mb-3 block text-sm text-dark dark:text-white"
										>
											Your Email
										</label>
										<input
											type="email"
											id="email"
											{...register("email")}
											placeholder="Enter your Email"
											className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
										/>
										{errors.email && (
											<p className="text-red-500">{errors.email.message}</p>
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
											type="password"
											id="password"
											{...register("password")}
											placeholder="Enter your Password"
											className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
										/>
										{errors.password && (
											<p className="text-red-500">{errors.password.message}</p>
										)}
									</div>
									<button
										type="submit"
										className="w-full bg-primary text-white rounded-sm py-3"
									>
										Login
									</button>
								</form>
								<div className="mb-8  flex items-center justify-center">
									<span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
									<p className="w-full px-5 text-center text-base font-medium text-body-color">
										or Register
									</p>
									<span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LoginPage;
