import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
	const user = useSelector((state) => state.user.value);
	const { pathname } = useLocation();

	if (!user.id)
		return <Navigate to="/signin" state={{ from: pathname }} replace />;

	return children;
}
