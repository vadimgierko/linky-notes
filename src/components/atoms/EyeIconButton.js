import { Link } from "react-router-dom";

export default function EyeIconButton({ link }) {
    return (
        <Link to={link}>
            <i className="bi bi-eye text-secondary me-2"></i>
        </Link>
    );
}