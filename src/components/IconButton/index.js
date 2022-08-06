export default function IconButton({
	iconName,
	color,
	additionalStyle = {},
	onClick = (f) => f,
}) {
	return (
		<i
			className={`bi bi-${iconName} me-2 text-${color}`}
			style={{ ...additionalStyle, cursor: "pointer" }}
			onClick={onClick}
		></i>
	);
}
