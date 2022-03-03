import { Link } from "react-router-dom";

export default function NavLink({ sectionName, handleLinkClick }) {
	const link =
		sectionName === "notes"
			? "/"
			: "/" + sectionName.replace(/ /g, "-").toLowerCase();

	return (
		<Link className="nav-link" to={link} onClick={handleLinkClick}>
			{sectionName}
		</Link>
	);
}
