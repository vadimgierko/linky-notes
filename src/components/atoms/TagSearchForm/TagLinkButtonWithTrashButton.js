import { Link } from "react-router-dom";

export default function TagLinkButtonWithTrashIcon({ tag, link }) {
	return (
		<button
			key={"tag-btn-with-trash-icon-for-" + tag}
			type="button"
			className="btn btn-outline-secondary mb-2 me-2"
			style={{ borderRadius: 20 }}
		>
			{tag}{" "}
			<Link to={link}>
				<i
					className="bi bi-trash text-white m-2"
					style={{
						backgroundColor: "red",
						cursor: "pointer",
					}}
				></i>
			</Link>
		</button>
	);
}
