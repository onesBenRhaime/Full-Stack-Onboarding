"use client";
import { useAuth } from "@/Context/AuthContext";
import Image from "next/image";
import AccessDenied from "../AccessDenied";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_BASE_URL from "@/utils/config";
import { User } from "../../../types/user";
import { useState } from "react";
import Toast from "../ui/Toast";

export default function ListUsers() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState<{
		title: string;
		description: string;
		variant: "success" | "error" | "info" | "warning";
	} | null>(null);
	const { user, token } = useAuth();

	const fetchUsers = async () => {
		const response = await axios.get(`${API_BASE_URL}users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.data) {
			throw new Error("Network response problem");
		}
		return response.data;
	};

	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
		staleTime: Infinity,
	});

	const assignRole = async (userId: number, roleName: string) => {
		try {
			console.log("assignRole", userId, roleName);

			const response = await axios.post(
				`${API_BASE_URL}users/${userId}/assign-role`,

				{ role: roleName },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			console.error("Error assigning role:", error);
			throw new Error("Failed to assign role");
		}
	};
	const banUser = async (userId: number) => {
		try {
			const response = await axios.post(
				`${API_BASE_URL}users/${userId}/ban`,
				{}, // No body needed for this request
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("banUser", userId);
			console.log("response", response.data);

			return response.data;
		} catch (error) {
			console.error("Error banning user:", error);
			throw new Error("Failed to ban user");
		}
	};

	const banMutation = useMutation({
		mutationFn: banUser,
		onSuccess: () => {
			setAlertMessage({
				title: "user banned",
				description: "user has been banned successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 3000);
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to ban user.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to ban user",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});
	const mutation = useMutation({
		mutationFn: (data: { userId: number; roleName: string }) =>
			assignRole(data.userId, data.roleName),
		onSuccess: () => {
			setAlertMessage({
				title: "Role Assigned",
				description: "Role has been assigned successfully.",
				variant: "success",
			});
			setTimeout(() => {
				setAlertMessage(null);
			}, 3000);
		},
		onError: (error: Error) => {
			let errorMessage = "Failed to assign role.";
			if ((error as any).response?.status === 401) {
				errorMessage = "Unauthorized. Please log in.";
			}
			setAlertMessage({
				title: "Failed to assign role",
				description: errorMessage,
				variant: "error",
			});
			setTimeout(() => setAlertMessage(null), 3000);
		},
	});

	const handleAssignRole = async (userId: number, roleName: string) => {
		try {
			await mutation.mutateAsync({ userId, roleName });
		} catch (error) {
			console.error("Error assigning role:", error);
		}
	};
	const handleBanUser = async (userId: number) => {
		try {
			await banMutation.mutateAsync(userId);
		} catch (error) {
			console.error("Error banning user:", error);
		}
	};

	if (!user?.role.includes("admin")) {
		return <AccessDenied />;
	}

	return (
		<div className="flex-1 p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">All Users</h1>
				<button className="bg-primary text-black px-4 py-2 rounded-xl hover:bg-white hover:text-primary border-collapse border-2 border-primary">
					+ ADD NEW USER
				</button>
			</div>
			{alertMessage && (
				<div className="fixed bottom-4 top-20 right-4">
					<Toast
						title={alertMessage.title}
						description={alertMessage.description}
						variant={alertMessage.variant}
					/>
				</div>
			)}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead>
						<tr className="w-full text-gray-600 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Profile</th>
							<th className="py-3 px-6 text-left">Name</th>
							<th className="py-3 px-6 text-left">Username</th>
							<th className="py-3 px-6 text-left">Address</th>
							<th className="py-3 px-6 text-left">Action</th>
						</tr>
					</thead>
					<tbody className="text-gray-600 text-sm font-light">
						{users?.map((user: User, index: number) => (
							<tr key={index} className="border-b hover:bg-purple-200">
								<td className="py-3 px-6 text-left whitespace-nowrap">
									<div className="flex items-center">
										<div className="w-10 h-10">
											<Image
												src={`/users/${user.image}`}
												alt={user.username}
												width={40}
												height={40}
												className="rounded-full"
											/>
										</div>
									</div>
								</td>
								<td className="py-3 px-6 text-left">
									<span className="font-medium">{user.username}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{user.username}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<span>{user.email}</span>
								</td>
								<td className="py-3 px-6 text-left">
									<button
										className="text-black border-collapse border-2 me-2 border-primary rounded-xl p-2"
										onClick={() => handleAssignRole(user.id, "admin")}
									>
										Give Admin Role
									</button>
									<button
										onClick={() => handleBanUser(user.id)}
										className="text-black border-collapse border-2 border-red-600 rounded-xl p-2"
									>
										{user.status === "active" ? "" : "Un"}Ban User
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
