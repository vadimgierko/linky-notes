import { useSelector } from "react-redux";
import { useStore } from "../../store/Store";
import TagLinkButton from "../atoms/TagLinkButton";

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
	const { state } = useStore();
	const user = useSelector((state) => state.user.value);

	if (!user.id) return <p>You need to be logged to see your tags...</p>;

	if (!state.tags || !Object.entries(state.tags).length)
		return <p>There are no tags so far...</p>;

	return (
		<div className="tags-page">
			<div className="tags-list">
				{ALPHABET.map((letter) => (
					<div
						key={letter + "-section"}
						className="letter-section-in-tags-list"
					>
						<h5>{letter}</h5>
						<hr />
						<div>
							{Object.entries(state.tags).map((tag) =>
								tag[1].tag[0] === letter ? (
									<TagLinkButton
										key={tag[0]}
										tagLink={"/search?name=" + tag[0]}
										tag={tag[1].tag}
									/>
								) : null
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
