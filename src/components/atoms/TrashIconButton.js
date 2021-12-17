import { Link } from "react-router-dom";

export default function TrashIconButton({ link, onClick }) {
    return (
        <Link to={link}>
            <i
                className="bi bi-trash text-danger"
                onClick={onClick}
            ></i>
        </Link>
    );
}
