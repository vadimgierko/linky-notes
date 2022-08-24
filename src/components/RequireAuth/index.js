import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth() {
	const { pathname } = useLocation();

	return <Navigate to="/signin" state={{ from: pathname }} replace />;
}
