"use client";
import Tag from "@/components/Tag";
import useTags from "@/context/useTags";
import Link from "next/link";
import { useEffect } from "react";

const ALPHABET = [
	"a",
	"b",
	"c",
	"ć",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"ł",
	"m",
	"n",
	"o",
	"p",
	"r",
	"s",
	"ś",
	"t",
	"u",
	"w",
	"v",
	"x",
	"y",
	"z",
	"ź",
	"ż",
];

export default function Tags() {
	const { tags } = useTags();

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	if (!tags) return null;

	return (
		<>
			<h1 className="text-center mb-3">
				Your tags ({Object.keys(tags).length})
			</h1>
			{ALPHABET.map((letter) => (
				<div key={letter + "-section"}>
					<h5>{letter}</h5>
					<hr />
					<div>
						{Object.keys(tags).map((tagId) =>
							tags[tagId].tag[0].toLowerCase() === letter ? (
								<Link href={`/?tags=${tagId}`} key={tagId}>
									<Tag value={`${tags[tagId].tag}`} />
								</Link>
							) : null
						)}
					</div>
				</div>
			))}
		</>
	);
}
