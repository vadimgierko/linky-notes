"use client";

import ReactMarkdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
	AnchorHTMLAttributes,
	ClassAttributes,
	createElement,
	HTMLAttributes,
	useEffect,
	useRef,
	useState,
} from "react";
import Link from "next/link";
import useTheme from "@/context/useTheme";
import rehypeHighlight from "rehype-highlight";
import { usePathname } from "next/navigation";
import slugify from "slugify";
import { BsLink45Deg } from "react-icons/bs";

function HeadingWithHashhashLinkToCopy({
	level,
	children,
	noteId,
	noteTitle,
}: {
	level: number;
	children: React.ReactNode;
	noteId: string;
	noteTitle: string;
}) {
	const { theme } = useTheme();
	const [isHovering, setIsHovering] = useState(false);
	const hashTitle = String(children);
	// id to assign to the heading:
	const id = slugify(hashTitle, { lower: true, trim: true });

	return createElement(
		`h${level}`,
		{ id },
		<span className="me-2">{children}</span>,
		<BsLink45Deg
			className={
				isHovering
					? theme === "dark"
						? "text-light"
						: "text-dark"
					: "text-secondary"
			}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			onClick={() => {
				const hashLinkToCopy =
					level === 1
						? `[${hashTitle}](/notes/${noteId})`
						: `[${noteTitle}/${hashTitle}](/notes/${noteId}#${id})`;

				navigator.clipboard.writeText(hashLinkToCopy);

				// Alert the copied text
				alert("Copied the text: " + hashLinkToCopy);
			}}
		/>
	);
}

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
	noteId: string;
}

export default function MarkdownRendererNoteMode({
	markdown,
	noteId,
}: MarkdownRendererProps) {
	const { theme } = useTheme();
	const pathname = usePathname();
	const markdownRef = useRef<HTMLDivElement | null>(null);
	const [hash, setHash] = useState<string | null>(null);

	// Extract headings from markdown
	const headings = markdown.match(/^(#{2,6})\s+(.*)$/gm) || [];
	const toc = headings.map((heading) => {
		const level = heading.match(/^#{2,6}/)?.[0].length || 0;
		const title = heading.replace(/^#{2,6}\s+/, "");
		const id = slugify(title, { lower: true, trim: true });
		return { level, title, id };
	});

	// FIX THIS, MAYBE ADD AS A CUSTOM COMPONENT TO MARKDOWN RENDERER:
	// const tocLinkIcon = (noteTitle: string, hashTitle: string, id: string) =>
	// 	createElement(
	// 		`span`,
	// 		{},
	// 		<BsLink45Deg
	// 			// className={
	// 			// 	isHovering
	// 			// 		? theme === "dark"
	// 			// 			? "text-light"
	// 			// 			: "text-dark"
	// 			// 		: "text-secondary"
	// 			// }
	// 			// onMouseEnter={() => setIsHovering(true)}
	// 			// onMouseLeave={() => setIsHovering(false)}
	// 			onClick={() => {
	// 				const hashLinkToCopy = `[${noteTitle}/${hashTitle}](/notes/${noteId}#${id})`;

	// 				navigator.clipboard.writeText(hashLinkToCopy);

	// 				// Alert the copied text
	// 				alert("Copied the text: " + hashLinkToCopy);
	// 			}}
	// 		/>
	// 	);

	// Generate TOC markdown
	const tocMarkdown = toc
		.map(({ level, title, id }) => {
			const indent = "   ".repeat(level - 2);
			return `${indent}1. [${title}](/notes/${noteId}#${id})`;
		})
		.join("\n");

	// ${tocLinkIcon(
	// 	noteId,
	// 	title,
	// 	id
	// )}

	// Insert TOC after h1 or at the beginning
	const updatedMarkdown = tocMarkdown.length
		? markdown.replace(
				/(^# .*$\n)/m,
				(match) => `${match}\n---\n## Table of Contents\n${tocMarkdown}\n`
		  ) || `## Table of Contents\n${tocMarkdown}\n${markdown}`
		: markdown;

	// Apply syntax highlighting styles dynamically
	useEffect(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href =
			theme === "dark"
				? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.css"
				: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs.css";

		document.head.appendChild(link);
		return () => {
			document.head.removeChild(link);
		};
	}, [theme]);

	// Track hash changes (for same-page navigation)
	useEffect(() => {
		const handleHashChange = () => {
			setHash(window.location.hash.replace("#", ""));
		};

		window.addEventListener("hashchange", handleHashChange);
		handleHashChange(); // Run once in case of direct navigation

		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	// Wait for Markdown content and scroll
	useEffect(() => {
		if (!hash) return;

		let observer: MutationObserver | null = null;
		let interval: NodeJS.Timeout | null = null;

		const scrollToElement = () => {
			const element = document.getElementById(hash);
			if (element) {
				// element.setAttribute("scroll-margin-top", "60px");
				element.scrollIntoView({ behavior: "smooth", block: "center" });

				// Clean up
				if (observer) observer.disconnect();
				if (interval) clearInterval(interval);
			}
		};

		// 1️⃣ Observe mutations inside the Markdown container
		if (markdownRef.current) {
			observer = new MutationObserver(scrollToElement);
			observer.observe(markdownRef.current, { childList: true, subtree: true });
		}

		// 2️⃣ Use an interval as a secondary check (runs every 100ms, stops once found)
		interval = setInterval(scrollToElement, 100);

		return () => {
			if (observer) observer.disconnect();
			if (interval) clearInterval(interval);
		};
	}, [hash, pathname]);

	if (!markdown) return null;

	return (
		<article ref={markdownRef}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, rehypeHighlight]}
				components={{
					a: NextLink,
					...Object.fromEntries(
						[1, 2, 3, 4, 5, 6].map((level) => [
							`h${level}`,
							(
								props: ClassAttributes<HTMLHeadingElement> &
									HTMLAttributes<HTMLHeadingElement> &
									ExtraProps
							) => (
								<HeadingWithHashhashLinkToCopy
									level={level}
									noteId={noteId}
									noteTitle={
										// get note title from extracting the first h1 tag, but without # symbol:
										markdown.match(/# (.*)/)?.[1] ||
										// if the first h1 tag is not found, use the first 30 characters of the markdown
										markdown.slice(0, 30).replace("#", "").trim() + "..."
									}
									{...props}
								>
									{props.children}
								</HeadingWithHashhashLinkToCopy>
							),
						])
					),
				}}
			>
				{updatedMarkdown}
			</ReactMarkdown>
		</article>
	);
}
