export default function TagButton({ tag, onClick }) {
    return (
        <button
            type="button"
            className="btn btn-outline-primary mb-2 me-2"
            style={{ borderRadius: 20 }}
            onClick={onClick}
        >
            {tag}
        </button>
    );
}
  