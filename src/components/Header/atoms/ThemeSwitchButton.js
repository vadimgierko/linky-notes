import { useTheme } from "../../../contexts/useTheme";

export default function ThemeSwitchButton({
	isNavCollapsed,
	handleNavCollapse,
}) {
	const { theme, switchTheme } = useTheme();

	return (
		<button
			className={
				theme === "light"
					? "btn btn-secondary" +
					  (isNavCollapsed ? " me-3" : " d-block mt-2 w-100")
					: "btn btn-light" + (isNavCollapsed ? " me-3" : " d-block mt-2 w-100")
			}
			type="button"
			onClick={() => {
				switchTheme();
				if (!isNavCollapsed) {
					handleNavCollapse();
				}
			}}
		>
			{theme === "light" ? (
				<i className="bi bi-moon"></i>
			) : (
				<i className="bi bi-brightness-high"></i>
			)}
		</button>
	);
}
