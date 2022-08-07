import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";

/**
 * This is the Page Container template for private routes when user is logged.
 * Created for reducing code amount && repeatable code, like:
 * applying theme, checking if user is logged.
 * @param {*}
 * @returns
 */
export default function PrivatePageContainer({
	pageNameWithoutWordPage,
	youNeedToLogInTo,
	children,
}) {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);

	return (
		<div
			className={pageNameWithoutWordPage + "-page"}
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			{user.id ? children : <p>You need to log in to {youNeedToLogInTo}...</p>}
		</div>
	);
}
