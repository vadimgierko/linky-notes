import { useTheme } from "../../hooks/use-theme";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";
import NavLinksList from "../molecules/NavLinksList";
import LogButton from "../atoms/LogButton";

export default function Header() {
  const { theme, switchToDark, switchToLight } = useTheme();
  const { user, logOut } = useAuth();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const onLogButtonClick = () => {
    if (user) {
      logOut();
    }
    if (!isNavCollapsed) {
      handleNavCollapse();
    }
  };

  const sectionsList = [
    "about",
    "notes",
    "tags",
    //"sources",
    "add note",
    "add source"
  ];

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
            sectionsList={sectionsList}
            handleLinkClick={() => {
              if (!isNavCollapsed) {
                handleNavCollapse();
              }
            }}
          />
          {/** user email when loged */}
          {user ? (
            <div className="text-muted me-3">
              {user.email ? user.email : null}
            </div>
          ) : null}
          {/** switch mode btn */}
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
          <LogButton
            link={user ? "/about" : "/signin"}
            logButtonText={user ? "Log out" : "Sign in"}
            className={
              isNavCollapsed
                ? "btn btn-" + (user ? "danger" : "success") + " me-2"
                : "btn btn-" + (user ? "danger" : "success") + " d-block mt-2"
            }
            handleLogButtonClick={onLogButtonClick}
          />
        </div>
      </div>
    </nav>
  );
}
