import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// custom components:
import Tag from "../Tag";
import IconButton from "../IconButton";
// react-bootstrap components:
import { Card, Row, Col } from "react-bootstrap";
// thunks:
import { deleteNote } from "../../thunks/notes/deleteNote";
import MarkdownRenderer from "../MarkdownRenderer";

export default function NoteCard({ note, noteKey, show140chars = false }) {
	const { theme } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.value);

	const ICON_BUTTONS = [
		{
			iconName: "eye",
			color: "secondary",
			onClick: () => navigate("/notes/" + noteKey),
		},
		{
			iconName: "pencil",
			color: "info",
			onClick: () => navigate("/notes/update-note/" + noteKey),
		},

		{
			iconName: "trash",
			color: "danger",
			onClick: () => {
				if (
					confirm(
						"Are you sure you want to delete this note? This action cannot be undone!"
					)
				) {
					dispatch(
						deleteNote({
							reference: "items/" + user.id + "/" + noteKey,
							itemKey: noteKey,
						})
					);
				} else {
					return;
				}
			},
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
				<Card.Text className="text-muted">{noteKey}</Card.Text>
				<MarkdownRenderer
					markdown={
						show140chars ? note.content.slice(0, 137) + "..." : note.content
					}
				/>
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
								window.scrollTo({ top: 0, behavior: "smooth" });

								// 2. that works, but looks bad:
								//navigate("/?tags=" + tagId);
							}}
						/>
					))}
			</Card.Body>
			<Card.Footer>
				<Card.Text className="text-muted">
					to link to this note in other one, copy this:
					<br />
					[some text goes here](/notes/{noteKey})
				</Card.Text>
			</Card.Footer>
		</Card>
	);
}
