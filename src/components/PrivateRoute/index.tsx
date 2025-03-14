"use client";
import useUser from "@/context/useUser";
import { ReactNode } from "react";

export default function PrivateRoute({ children }: { children: ReactNode }) {
	const { user } = useUser();

	if (!user)
		return (
			<p className="text-danger text-center">
				You need to be logged to have an access to this page...
			</p>
		);

	return children;
}
