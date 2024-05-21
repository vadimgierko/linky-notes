import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// custom components:
import Tag from "../components/Tag";
import { getTagNotesNum } from "../helper-functions/tags";

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
	const TAGS = useSelector((state) => state.tags.value);
	const NOTES = useSelector((state) => state.notes.value);

	const navigate = useNavigate();

	useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);

	return (
		<>
			<h1 className="text-center mb-3">
				Your tags ({Object.keys(TAGS).length})
			</h1>
			{ALPHABET.map((letter) => (
				<div key={letter + "-section"}>
					<h5>{letter}</h5>
					<hr />
					<div>
						{Object.keys(TAGS).map((tagId) =>
							TAGS[tagId].tag[0] === letter ? (
								<Tag
									key={tagId}
									onClick={() =>
										navigate({
											pathname: "/",
											search: `?tags=${tagId}`,
										})
									}
									value={`${TAGS[tagId].tag} (${getTagNotesNum(tagId, NOTES)})`}
								/>
							) : null
						)}
					</div>
				</div>
			))}
		</>
	);
}
