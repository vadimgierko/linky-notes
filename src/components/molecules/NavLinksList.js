import NavLink from "../atoms/NavLink";

export default function NavLinksList({ sectionsList, handleLinkClick }) {
  return (
    <ul className="navbar-nav me-auto">
      {sectionsList && sectionsList.length
        ? sectionsList.map((section) => (
            <li key={section + "navlink"} className="nav-item">
              <NavLink
                sectionName={section}
                handleLinkClick={handleLinkClick}
              />
            </li>
          ))
        : null}
    </ul>
  );
}
