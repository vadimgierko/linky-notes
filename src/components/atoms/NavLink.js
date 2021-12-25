import { Link } from "react-router-dom";

export default function NavLink({ sectionName, handleLinkClick }) {
  let link;

  if (sectionName === "notes") {
    link = "/";
  } else {
    link = "/" + sectionName.replace(/ /g, "-").toLowerCase();
  }

  return (
    <Link className="nav-link" to={link} onClick={handleLinkClick}>
      {sectionName}
    </Link>
  );
}