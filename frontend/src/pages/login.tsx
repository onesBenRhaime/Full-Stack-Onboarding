import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = Yup.object({
	username: Yup.string().required("Username is required"),
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
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="username">Username</label>
					<input id="username" {...register("username")} />
					{errors.username && <p>{errors.username.message}</p>}
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input id="password" type="password" {...register("password")} />
					{errors.password && <p>{errors.password.message}</p>}
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
