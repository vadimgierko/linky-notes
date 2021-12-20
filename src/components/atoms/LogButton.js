import { Link } from "react-router-dom";

export default function LogButton({
  link,
  className,
  handleLogButtonClick,
  logButtonText
}) {
  return (
    <Link
      to={link}
      type="button"
      className={className}
      onClick={handleLogButtonClick}
    >
      {logButtonText}
    </Link>
  );
}
