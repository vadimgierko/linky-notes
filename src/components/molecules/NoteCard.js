import { useTheme } from "../../contexts/useTheme";
import { useStore } from "../../store/Store";
import deleteItem from "../../logic/deleteItem";
// custom components:
import TagLinkButton from "../atoms/TagLinkButton";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";
// react-bootstrap components:
import { Card, Row, Col } from "react-bootstrap";

export default function NoteCard({ item, itemKey }) {
	const { theme } = useTheme();
	const { state, dispatch } = useStore();

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
						{item.createdAt} {item.updatedAt ? "/ " + item.updatedAt : null}
					</Col>
					<Col xs={4} className="text-end">
						<EyeIconButton link={"/notes/" + itemKey} />
						<PencilIconButton link={"/notes/update-note/" + itemKey} />
						<TrashIconButton
							handleOnTrashButtonClick={() =>
								deleteItem(itemKey, state.user.id, dispatch)
							}
						/>
					</Col>
				</Row>
			</Card.Header>
			<Card.Body>
				<Card.Text>{item.content}</Card.Text>
				{item.tags &&
					Object.entries(item.tags).map((tag) => (
						<TagLinkButton
							key={"item-tag-" + tag[0]}
							tag={tag[1].tag}
							tagLink={"/search?name=" + tag[0]}
						/>
					))}
			</Card.Body>
			<Card.Footer></Card.Footer>
		</Card>
	);
}
