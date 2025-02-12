"use client";
import useTags from "@/context/useTags";
import { Tag } from "@/types";
import Link from "next/link";
import { Dropdown, DropdownButton } from "react-bootstrap";

type TagComponentProps = {
	tag: Tag;
};

export default function TagComponent({ tag }: TagComponentProps) {
	const { getTagNotesNum, updateTag, deleteTag } = useTags();

	return (
		<DropdownButton
			title={`${tag.value} (${getTagNotesNum(tag.id)})`}
			variant="outline-primary"
			key={tag.id}
			className="mb-2 me-2"
			style={{
				display: "inline-block",
				borderRadius: 20,
			}}
		>
			<Link href={`/notes?tags=${tag.id}`} passHref legacyBehavior>
				<Dropdown.Item>🔎 see tag&apos;s notes</Dropdown.Item>
			</Link>

			<Dropdown.Item
				onClick={async () => {
					const newTagValue = prompt(
						`Provide the new tag value for ${tag.value}:`,
						tag.value
					);

					if (newTagValue && newTagValue.trim().length) {
						await updateTag(newTagValue, tag.id);
						alert(`${tag.value} tag was updated to ${newTagValue}!`);
					} else {
						alert("New tag value should have at least 1 character!");
					}
				}}
			>
				✏️ edit tag&apos;s value
			</Dropdown.Item>
			<Dropdown.Item
				onClick={async () => {
					const agreed = confirm(
						`Are you sure you want to delete the tag ${tag.value}?`
					);

					if (!agreed) return;

					if (tag.notes)
						return alert(
							"Cannot delete tag with notes assigned... Remove the tag from it's notes, than try to delete the tag."
						);

					await deleteTag(tag);
					alert(`${tag.value} tag was removed!`);
				}}
			>
				🗑️ delete tag
			</Dropdown.Item>
		</DropdownButton>
	);
}
