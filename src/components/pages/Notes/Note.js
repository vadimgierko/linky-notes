import { useTheme } from "../../../contexts/useTheme";
import { useSearchParams } from "react-router-dom";
// custom components:
import Tag from "./Tag";
// react-bootstrap components:
import { Card, Row, Col } from "react-bootstrap";

export default function Note({ note }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const { theme } = useTheme();
	if (!note) return null;

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
						{/* <EyeIconButton link={"/notes/" + itemKey} />
						<PencilIconButton link={"/notes/update-note/" + itemKey} />
						<TrashIconButton
							handleOnTrashButtonClick={() =>
								deleteItem(itemKey, state.user.id, dispatch)
							}
						/> */}
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
