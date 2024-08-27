import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
	username: string;
	role: string[];
}

interface AuthContextType {
	user: User | null;
	token: string | null;
	login: (email: string, password: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const storedToken = Cookies.get("authToken");
		if (storedToken) {
			const decodedToken: User = jwt_decode(storedToken);
			setUser(decodedToken);
			setToken(storedToken);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("http://localhost:5000/auth/login", {
				email,
				password,
			});
			const { token } = response.data;
			Cookies.set("authToken", token);
			const decodedToken: User = jwt_decode(token);
			setUser(decodedToken);
			setToken(token);
			router.push("/");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	const logout = () => {
		Cookies.remove("authToken");
		setUser(null);
		setToken(null);
		router.push("/auth/login");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
