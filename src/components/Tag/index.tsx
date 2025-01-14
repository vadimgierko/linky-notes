import Button from "react-bootstrap/Button";

type TagProps = {
    value: string,
    onClick?: () => void
}

export default function Tag({ value, onClick = () => {} }: TagProps) {
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