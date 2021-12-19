import { Link } from "react-router-dom";

export default function Button({ buttonText, handleClick }) {
    return (
        <button
            type="button"
            className="btn btn-success mb-2 d-block text-white"
            onClick={handleClick}
        >
            {buttonText}
        </button>
    );
}