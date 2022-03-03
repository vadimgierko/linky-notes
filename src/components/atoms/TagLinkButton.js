import { Link } from "react-router-dom";

export default function TagLinkButton({ tag, tagLink }) {
	return (
		<Link
			to={tagLink}
			className="btn btn-outline-primary mb-2 me-2"
			style={{ borderRadius: 20 }}
		>
			{tag}
		</Link>
	);
}
