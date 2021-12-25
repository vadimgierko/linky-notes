import { Link } from "react-router-dom";

export default function TagButtonGeneratedByInput({ tag, link, onClick }) {
    return (
        <Link to={link}>
            <button
                type="button"
                className="btn btn-outline-secondary mb-2 me-2"
                style={{ borderRadius: 20 }}
                onClick={onClick}
            >
                {tag}
            </button>
        </Link>
    );
}
  