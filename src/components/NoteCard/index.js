import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";
// custom components:
import Tag from "../Tag";
// react-bootstrap components:
import { Card, Row, Col } from "react-bootstrap";
import IconButton from "../IconButton";
// thunks:
import { deleteNote } from "../../thunks/notes/deleteNote";

export default function Note({ note, noteKey }) {
	const { theme } = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

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
						<IconButton iconName="eye" color="secondary" onClick={(f) => f} />
						<IconButton iconName="pencil" color="info" onClick={(f) => f} />
						<IconButton
							iconName="trash"
							color="danger"
							onClick={() =>
								dispatch(
									deleteNote({
										reference: "items/" + user.id + "/" + noteKey,
										itemKey: noteKey,
									})
								)
							}
						/>
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
							onClick={() => setSearchParams({ tags: tagId })}
						/>
					))}
			</Card.Body>
			<Card.Footer></Card.Footer>
		</Card>
	);
}
