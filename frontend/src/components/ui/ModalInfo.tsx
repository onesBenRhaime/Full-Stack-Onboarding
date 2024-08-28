"use client";
import Link from "next/link";
import React from "react";

interface ModalConfirmeProps {
	isOpen: boolean;
	onClose: () => void;
}

const ModalInfo: React.FC<ModalConfirmeProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
				<h2 className="text-xl font-semibold mb-4 text-center">
					Acces Denied !
				</h2>
				<p className="text-gray-600 mb-6 text-center">
					You need to create an account to access this page. or login if you
					already have an account.
				</p>
				<div className="flex justify-center space-x-4">
					<Link
						href="/auth/login"
						className="bg-primary text-white py-2 px-4 rounded hover:bg-gray-800"
					>
						Login
					</Link>
					<Link
						href="/auth/register"
						className="bg-primary text-white py-2 px-4 rounded hover:bg-gray-800"
					>
						Create Account
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ModalInfo;
