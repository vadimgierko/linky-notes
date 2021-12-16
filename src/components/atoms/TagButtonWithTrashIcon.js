export default function TagButtonWithTrashIcon({ tag, onTrashIconClick }) {
    return (
        <button
            type="button"
            className="btn btn-outline-secondary mb-2 mt-2 me-2"
            style={{ borderRadius: 20 }}
        >
            {tag}{" "}
            <i
                className="bi bi-trash text-white m-2"
                style={{
                    backgroundColor: "red",
                    cursor: "pointer"
                }}
                onClick={onTrashIconClick}
            ></i>
        </button>
    );
}
