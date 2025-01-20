"use client";
import PrivateRoute from "@/components/PrivateRoute";
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

export default function TagsPage() {
	return (
		<PrivateRoute>
			<Tags />
		</PrivateRoute>
	);
}

function Tags() {
	const { tags } = useTags();

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			<h1 className="text-center mb-3">
				Your tags ({tags ? Object.keys(tags).length : 0})
			</h1>
			{ALPHABET.map((letter) => (
				<div key={letter + "-section"}>
					<h5>{letter}</h5>
					<hr />
					<div>
						{tags && Object.keys(tags).map((tagId) =>
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
