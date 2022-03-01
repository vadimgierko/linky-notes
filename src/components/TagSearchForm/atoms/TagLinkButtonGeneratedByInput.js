import { Link } from "react-router-dom";

export default function TagLinkButtonGeneratedByInput({ tag, link }) {
	return (
		<Link
			to={link}
			type="button"
			className="btn btn-outline-secondary mb-2 me-2"
			style={{ borderRadius: 20 }}
		>
			{tag}
		</Link>
	);
}
