import { Link } from "react-router-dom";

export default function TagLinkButton({ tag, tagKey }) {
	return (
		<Link to={"/search?name=" + tagKey}>
			<button
				type="button"
				className="btn btn-outline-primary mb-2 me-2"
				style={{ borderRadius: 20 }}
			>
				{tag}
			</button>
		</Link>
	);
}
