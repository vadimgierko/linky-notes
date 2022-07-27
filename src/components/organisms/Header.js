import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../hooks/use-theme";
import NavLinksList from "../Header/molecules/NavLinksList";
import ThemeSwitchButton from "../Header/atoms/ThemeSwitchButton";
import logOut from "../../auth/logOut";
import LoggedUserEmail from "../Header/atoms/LoggedUserEmail";
import LogButtonsSection from "../Header/molecules/LogButtonsSection";

const SECTIONS_LIST = ["about", "notes", "tags", "add note"];

export default function Header() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);

	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => {
		setIsNavCollapsed(!isNavCollapsed);
	};

	return (
		<nav
			className={
				theme.mode === "light"
					? "navbar navbar-expand-lg navbar-light bg-light fixed-top"
					: "navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
			}
		>
			<div className="container">
				<span className="navbar-brand mb-0 h1">linky_notes</span>
				<button
					className="navbar-toggler collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarColor01"
					aria-controls="navbarColor01"
					aria-expanded={isNavCollapsed ? true : false}
					aria-label="Toggle navigation"
					onClick={handleNavCollapse}
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div
					className={`${isNavCollapsed ? "collapse" : null} navbar-collapse`}
					id="navbarColor01"
				>
					<NavLinksList
						sectionsList={SECTIONS_LIST}
						handleLinkClick={() => {
							if (!isNavCollapsed) {
								handleNavCollapse();
							}
						}}
					/>
					<LoggedUserEmail user={user} />
					<ThemeSwitchButton
						isNavCollapsed={isNavCollapsed}
						handleNavCollapse={handleNavCollapse}
					/>
					<LogButtonsSection
						user={user}
						isNavCollapsed={isNavCollapsed}
						onLogButtonClick={() => {
							if (user.id) {
								logOut();
							}
							if (!isNavCollapsed) {
								handleNavCollapse();
							}
						}}
					/>
				</div>
			</div>
		</nav>
	);
}
