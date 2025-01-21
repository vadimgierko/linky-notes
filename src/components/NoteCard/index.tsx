"use client";
import useTheme from "@/context/useTheme";
import { Note } from "@/types";
import { Card, Row, Col } from "react-bootstrap";
import IconButton from "../IconButton";
import MarkdownRenderer from "../MarkdownRenderer";
import Link from "next/link";
import Tag from "../Tag";
import useNotes from "@/context/useNotes";

type NoteCardProps = {
	note: Note;
	noteKey: string;
	show140chars: boolean;
};

export default function NoteCard({
	note,
	noteKey,
	show140chars,
}: NoteCardProps) {
	const { theme } = useTheme();
	const { deleteNote } = useNotes();

	const ICON_BUTTONS = [
		{
			iconName: "eye",
			color: "secondary",
			href: "/notes/" + noteKey,
		},
		{
			iconName: "pencil",
			color: "info",
			href: "/notes/" + noteKey + "/update",
		},

		{
			iconName: "trash",
			color: "danger",
			onClick: async () => {
				if (
					confirm(
						"Are you sure you want to delete this note? This action cannot be undone!"
					)
				) {
					await deleteNote(noteKey);
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
						{ICON_BUTTONS.map((btn) =>
							btn.href ? (
								<Link href={btn.href} key={btn.iconName}>
									<IconButton
										iconName={btn.iconName}
										color={btn.color}
										onClick={btn.onClick || console.log}
									/>
								</Link>
							) : btn.onClick ? (
								<IconButton
									key={btn.iconName}
									iconName={btn.iconName}
									color={btn.color}
									onClick={btn.onClick || console.log}
								/>
							) : null
						)}
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
					Object.keys(note.tags).length > 0 &&
					Object.keys(note.tags).map((tagId) => (
						<Link href={`/notes?tags=${tagId}`} key={tagId}>
							<Tag value={`${note.tags![tagId].tag}`} />
						</Link>
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
