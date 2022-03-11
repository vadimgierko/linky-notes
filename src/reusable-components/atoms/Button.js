export default function Button({ onClick, text }) {
	return (
		<button
			className="btn btn-success d-block w-100 mb-2"
			type="button"
			onClick={onClick}
		>
			{text}
		</button>
	);
}
