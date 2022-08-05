import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/useTheme";
// custom components:
import Tag from "../components/Tag";

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
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const TAGS = useSelector((state) => state.tags.value);
	const navigate = useNavigate();

	if (!user.id)
		return (
			<div
				className="tags-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				You need to be logged to see your tags...
			</div>
		);

	if (!TAGS || !Object.keys(TAGS).length)
		return (
			<div
				className="tags-page"
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
			>
				There are no tags yet...
			</div>
		);

	return (
		<div
			className="tags-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<h1 className="text-center mb-3">Your tags</h1>
			{ALPHABET.map((letter) => (
				<div
					key={letter + "-section"}
					style={{
						backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
						color: theme === "light" ? "black" : "white",
					}}
				>
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
									value={TAGS[tagId].tag}
								/>
							) : null
						)}
					</div>
				</div>
			))}
		</div>
	);
}
