"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { AnchorHTMLAttributes, useEffect } from "react";
import Link from "next/link";
import useTheme from "@/context/useTheme";
import rehypeHighlight from "rehype-highlight";

// interface NextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

/**
 * convert all internal links into React Router link,
 * open external links in the new tab,
 * scroll to top after internal redirecting
 */
function NextLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
	const { href, ...rest } = props;

	if (href && href.match(/^(https?:)?\/\//)) {
		return (
			<a href={href} target="_blank" rel="noreferrer" {...rest}>
				{props.children}
			</a>
		);
	}

	if (typeof window !== "undefined") {
		const url = new URL(href || "", window.location.origin);
		return (
			<Link href={url.toString()} {...rest}>
				{props.children}
			</Link>
		);
	}
}

interface MarkdownRendererProps {
	markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
	const { theme } = useTheme();

	// css for highlighting code in github style (without this rehype-highlight will not be working)
	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href =
			theme === "dark"
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
				rehypeHighlight,
			]}
			components={{ a: NextLink }}
		>
			{markdown}
		</ReactMarkdown>
	);
}
