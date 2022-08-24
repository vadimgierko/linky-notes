import Button from "react-bootstrap/Button";

export default function Tag({ value, onClick = (f) => f }) {
	if (!value) return null;

	return (
		<Button
			variant="outline-primary"
			size="sm"
			className="mb-2 me-2"
			style={{ borderRadius: 20 }}
			onClick={onClick}
		>
			{value}
		</Button>
	);
}
