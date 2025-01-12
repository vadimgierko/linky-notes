import { CSSProperties } from "react";

type IconButtonProps = {
	iconName: string;
	color: string;
	additionalStyle?: CSSProperties;
	onClick: () => void;
};

export default function IconButton({
	iconName,
	color,
	additionalStyle = {},
	onClick = () => {},
}: IconButtonProps) {
	return (
		<i
			className={`bi bi-${iconName} me-2 text-${color}`}
			style={{ ...additionalStyle, cursor: "pointer" }}
			onClick={onClick}
		></i>
	);
}
