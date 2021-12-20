import { Link } from "react-router-dom";

export default function TrashIconButton({ link, handleOnTrashButtonClick }) {
    return (
        <Link to={link}>
            <i
                className="bi bi-trash text-danger"
                onClick={handleOnTrashButtonClick}
            ></i>
        </Link>
    );
}
