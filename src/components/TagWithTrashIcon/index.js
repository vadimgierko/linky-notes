export default function TagWithTrashIcon({ tag, onClick }) {
	if (!tag) return null;

	return (
		<button
			type="button"
			className="btn btn-outline-secondary mb-2 me-2"
			style={{ borderRadius: 20 }}
			onClick={onClick}
		>
			{tag.tag} <i className="bi bi-trash text-danger"></i>
		</button>
	);
}
