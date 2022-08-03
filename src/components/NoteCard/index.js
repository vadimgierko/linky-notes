import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// custom components:
import Tag from "../Tag";
// react-bootstrap components:
import { Card, Row, Col } from "react-bootstrap";
import IconButton from "../IconButton";
// thunks:
import { deleteNote } from "../../thunks/notes/deleteNote";

export default function NoteCard({ note, noteKey }) {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.value);

	const ICON_BUTTONS = [
		{
			iconName: "eye",
			color: "secondary",
			onClick: () => navigate("notes/" + noteKey),
		},
		{
			iconName: "pencil",
			color: "info",
			onClick: () => navigate("/notes/update-note/" + noteKey),
		},

		{
			iconName: "trash",
			color: "danger",
			onClick: () =>
				dispatch(
					deleteNote({
						reference: "items/" + user.id + "/" + noteKey,
						itemKey: noteKey,
					})
				),
		},
	];

	if (!note || !noteKey) return null;

	return (
		<Card
			className={
				"mb-2 shadow bg-" +
				theme +
				(theme === "dark" ? " border-secondary" : "")
			}
		>
			<Card.Header>
				<Row>
					<Col className="text-muted">
						{note.createdAt} {note.updatedAt ? "/ " + note.updatedAt : null}
					</Col>
					<Col xs={4} className="text-end">
						{ICON_BUTTONS.map((btn) => (
							<IconButton
								key={btn.iconName}
								iconName={btn.iconName}
								color={btn.color}
								onClick={btn.onClick}
							/>
						))}
					</Col>
				</Row>
			</Card.Header>
			<Card.Body>
				<Card.Text>{note.content}</Card.Text>
				{note.tags &&
					Object.keys(note.tags).map((tagId) => (
						<Tag
							key={tagId}
							value={note.tags[tagId].tag}
							onClick={() => {
								// There are 3 ways to go back to main page
								// & search for tag:

								// 1. that is the most elegant way:
								navigate({
									pathname: "/",
									search: `?tags=${tagId}`,
								});

								// 2. that works, but looks bad:
								//navigate("/?tags=" + tagId);

								// 3. that was the firs version
								// but if the card is opened in separate window
								// (not on the main page "/")
								// then it sets searchParams for current page...
								// so use it only on the page you want to search:
								//setSearchParams({ tags: tagId });
							}}
						/>
					))}
			</Card.Body>
			<Card.Footer></Card.Footer>
		</Card>
	);
}
