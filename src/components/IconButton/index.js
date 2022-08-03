export default function IconButton({ iconName, color, onClick = (f) => f }) {
	return (
		<i
			className={`bi bi-${iconName} me-2 text-${color}`}
			style={{ cursor: "pointer" }}
			onClick={onClick}
		></i>
	);
}
