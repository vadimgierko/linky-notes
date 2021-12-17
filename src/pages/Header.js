import { useTheme } from "../hooks/use-theme";
import { useAuth } from "../hooks/use-auth";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { theme, switchToDark, switchToLight } = useTheme();
  const { user, logOut } = useAuth();

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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={() => {
                  if (!isNavCollapsed) {
                    handleNavCollapse();
                  }
                }}
              >
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/items"
                onClick={() => {
                  if (!isNavCollapsed) {
                    handleNavCollapse();
                  }
                }}
              >
                notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/tags"
                onClick={() => {
                  if (!isNavCollapsed) {
                    handleNavCollapse();
                  }
                }}
              >
                tags
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/sources"
                onClick={() => {
                  if (!isNavCollapsed) {
                    handleNavCollapse();
                  }
                }}
              >
                sources
              </Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/add-item"
                  onClick={() => {
                    if (!isNavCollapsed) {
                      handleNavCollapse();
                    }
                  }}
                >
                  add note
                </Link>
              </li>
            ) : null}
          </ul>
          {user ? (
            <div className="text-muted me-3">
              {user.email ? user.email : null}
            </div>
          ) : null}
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
          {user ? (
            <Link
              to="/about"
              type="button"
              className={
                isNavCollapsed
                  ? "btn btn-danger me-2"
                  : "btn btn-danger d-block mt-2"
              }
              onClick={() => {
                logOut();
                if (!isNavCollapsed) {
                  handleNavCollapse();
                }
              }}
            >
              Log out
            </Link>
          ) : (
            <div>
              <Link
                to="/signin"
                type="button"
                className={
                  isNavCollapsed
                    ? "btn btn-success"
                    : "btn btn-success d-block mt-2"
                }
                onClick={() => {
                  if (!isNavCollapsed) {
                    handleNavCollapse();
                  }
                }}
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
