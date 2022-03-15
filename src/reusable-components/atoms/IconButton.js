import { Link } from "react-router-dom";

export default function IconButton({
	iconName, // check possible names in bootstrap icons docs
	color = "primary",
	link = "",
	onClick = (f) => f,
}) {
	if (link)
		return (
			<Link to={link}>
				<i
					className={`bi bi-${iconName} text-${color} me-2`}
					onClick={onClick}
				/>
			</Link>
		);

	return (
		<i
			className={`bi bi-${iconName} text-${color} me-2`}
			style={{ cursor: "pointer" }}
			onClick={onClick}
		/>
	);
}
