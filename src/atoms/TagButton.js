export default function TagButton({ tag, onClick }) {
    return (
        <button
            type="button"
            className="btn btn-primary mb-2 mt-2 me-2"
            style={{ borderRadius: 20 }}
            onClick={onClick}
        >
            {tag}
        </button>
    );
}
  