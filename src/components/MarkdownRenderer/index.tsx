"use client"

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { AnchorHTMLAttributes } from "react";
import Link from "next/link";

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
		return <Link href={url.toString()} {...rest}>
			{props.children}
		</Link>
	}
}

interface MarkdownRendererProps {
	markdown: string;
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
	if (!markdown) return null;

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeRaw]} // enables rendering HTML tags
			components={{ a: NextLink }}
		>
			{markdown}
		</ReactMarkdown>
	);
}