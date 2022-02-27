export default function TrashIconButton({ handleOnTrashButtonClick }) {
	return (
		<i
			className="bi bi-trash text-danger"
			style={{ cursor: "pointer" }}
			onClick={handleOnTrashButtonClick}
		></i>
	);
}
