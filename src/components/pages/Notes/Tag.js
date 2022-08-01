export default function Tag({ value, onClick = (f) => f }) {
	return (
		<button
			className="btn btn-outline-primary mb-2 me-2"
			style={{ borderRadius: 20 }}
			onClick={onClick}
		>
			{value}
		</button>
	);
}
