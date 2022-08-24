import Button from "react-bootstrap/Button";

export default function TagWithTrashIcon({ tag, onClick = (f) => f }) {
	if (!tag) return null;

	return (
		<Button
			variant="outline-secondary"
			size="sm"
			className="btn btn-outline-secondary mb-2 me-2"
			style={{ borderRadius: 20 }}
			onClick={onClick}
		>
			<span className="me-2">{tag.tag}</span>
			<i className="bi bi-trash text-danger"></i>
		</Button>
	);
}
