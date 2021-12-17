import { Link } from "react-router-dom";

export default function PencilIconButton({ link }) {
    return (
        <Link to={link}>
            <i className="bi bi-pencil text-info me-2"></i>
        </Link>
    );
}
