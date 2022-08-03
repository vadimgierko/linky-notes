export default function TagWithTrashIcon({ tag, onClick }) {
	if (!tag) return null;

	return (
		<button
			type="button"
			className="btn btn-outline-secondary mb-2 me-2"
			style={{ borderRadius: 20 }}
		>
			{tag.tag}{" "}
			<i
				className="bi bi-trash text-white m-2"
				style={{
					backgroundColor: "red",
					cursor: "pointer",
				}}
				onClick={onClick}
			></i>
		</button>
	);
}
