import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
	const user = useSelector((state) => state.user.value);
	const location = useLocation();

	// only to check:
	useEffect(
		() => console.log("location in RequireAuth:", location),
		[location]
	);

	if (!user.id)
		return <Navigate to="/signin" state={{ from: location }} replace />;

	return children;
}
