import NavLink from "../atoms/NavLink";

export default function NavLinksList({ sectionsList, handleLinkClick }) {
	if (!sectionsList || !sectionsList.length) return null;

	return (
		<ul className="nav-links-list navbar-nav me-auto">
			{sectionsList.map((section) => (
				<li key={section + "-navlink"} className="nav-item">
					<NavLink
						sectionName={section}
						handleLinkClick={handleLinkClick}
					/>
				</li>
			))}
		</ul>
	);
}
