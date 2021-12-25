import { Link } from "react-router-dom";

export default function TagButton({ tag }) {
    return (
        <Link to={"/search?name=" + tag}>
            <button
                type="button"
                className="btn btn-outline-primary mb-2 me-2"
                style={{ borderRadius: 20 }}
            >
                {tag}
            </button>
        </Link>
    );
}
  