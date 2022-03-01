import { useTheme } from "../../../hooks/use-theme";

export default function ThemeSwitchButton({
	isNavCollapsed,
	handleNavCollapse,
}) {
	const { theme, switchToDark, switchToLight } = useTheme();

	return (
		<button
			className={
				theme.mode === "light"
					? "btn btn-secondary" +
					  (isNavCollapsed ? " me-3" : " d-block mt-2 w-100")
					: "btn btn-light" +
					  (isNavCollapsed ? " me-3" : " d-block mt-2 w-100")
			}
			type="button"
			onClick={() => {
				if (theme.mode === "light") {
					switchToDark();
				} else {
					switchToLight();
				}
				if (!isNavCollapsed) {
					handleNavCollapse();
				}
			}}
		>
			{theme.mode === "light" ? (
				<i className="bi bi-moon"></i>
			) : (
				<i className="bi bi-brightness-high"></i>
			)}
		</button>
	);
}
