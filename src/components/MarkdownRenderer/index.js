import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../../contexts/useTheme";

/**
 * @returns `<Link />` from react-router-dom if the link is internal or `<a>` redirecting to a new tab if the link is external
 */
function LinkRenderer(props) {
	return props.href.match(/^(https?:)?\/\//) ? (
		<a href={props.href} target="_blank" rel="noreferrer">
			{props.children}
		</a>
	) : (
		<Link to={props.href}>{props.children}</Link>
	);
}

export default function MarkdownRenderer({ markdown }) {
	const { theme } = useTheme();

	// css for highlighting code in github style (without this rehype-highlight will not be working)
	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = theme === "dark"
			? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.css" // Dark mode styles
			: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs.css"; // Light mode styles

		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link); // Clean up the previous stylesheet when unmounting or switching modes
		};
	}, [theme]);

	if (!markdown) return null;

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[
				// enables rendering HTML tags:
				rehypeRaw,
				// emables code highlighting:
				rehypeHighlight
			]}
			components={{ a: LinkRenderer }}
		>
			{markdown}
		</ReactMarkdown>
	);
}
