"use client";
import useTheme from "@/context/useTheme";
import { Note, Tag as ITag, Tags } from "@/types";
import { Card, Row, Col } from "react-bootstrap";
import IconButton from "../IconButton";
import Link from "next/link";
import Tag from "../Tag";
import useNotes from "@/context/useNotes";
import useTags from "@/context/useTags";
import sortTagsAlphabetically from "@/lib/sortTagsAlphabetically";
import date from "@/lib/date";
import MarkdownRendererNoteMode from "../MarkdownRenderer/NoteMode";

type NoteCardProps = {
	note: Note;
	noteKey: string;
	show140chars: boolean;
	closeModal?: () => void;
};

export default function NoteCard({
	note,
	noteKey,
	show140chars,
	closeModal,
}: NoteCardProps) {
	const { theme } = useTheme();
	const { deleteNote } = useNotes();
	const { getTagNotesNum, getTagById } = useTags();

	const ICON_BUTTONS: {
		iconName: string;
		color: string;
		href?: string;
		onClick?: () => void | Promise<void>;
	}[] = [
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

	// sort tags alphabetically:
	const noteTags: ITag[] = Object.keys(note.tags)
		.map((tagId) => getTagById(tagId))
		.filter((t) => t !== null) as ITag[];
	const noteTagsObject = noteTags.reduce(
		(tagsObject, tag) => ({ ...tagsObject, [tag.id]: tag }),
		{} as Tags
	);
	const noteTagsSortedAlphabetically = sortTagsAlphabetically(noteTagsObject);

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
						{date.getDateFromTimestamp(note.createdAt.auto)} /{" "}
						{date.getDateFromTimestamp(note.updatedAt)}
					</Col>
					<Col xs={4} className="text-end">
						{ICON_BUTTONS.map((btn) =>
							btn.href ? (
								<Link href={btn.href} key={btn.iconName}>
									<IconButton
										iconName={btn.iconName}
										color={btn.color}
										onClick={() => {
											if (closeModal) {
												closeModal();
											}
											if (btn.onClick) {
												btn.onClick();
											}
										}}
									/>
								</Link>
							) : btn.onClick ? (
								<IconButton
									key={btn.iconName}
									iconName={btn.iconName}
									color={btn.color}
									onClick={() => {
										if (closeModal) {
											closeModal();
										}
										if (btn.onClick) {
											btn.onClick();
										}
									}}
								/>
							) : null
						)}
					</Col>
				</Row>
			</Card.Header>
			<Card.Body>
				<Card.Text className="text-muted">{noteKey}</Card.Text>
				<MarkdownRendererNoteMode
					noteId={noteKey}
					markdown={
						show140chars
							? note.children[0].value.slice(0, 137) + "..."
							: note.children[0].value
					}
				/>
				<div id="note-tags">
					{noteTagsSortedAlphabetically.map((tag) => (
						<Link href={`/notes?tags=${tag.id}`} key={tag.id}>
							<Tag value={`${tag.value} (${getTagNotesNum(tag.id)})`} />
						</Link>
					))}
				</div>
			</Card.Body>
			{/* <Card.Footer>
				<Card.Text className="text-muted">
					to link to this note in other one, copy this:
					<br />
					[some text goes here](/notes/{noteKey})
				</Card.Text>
			</Card.Footer> */}
		</Card>
	);
}
