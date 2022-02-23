import { useTheme } from "../../hooks/use-theme";
import { useDatabase } from "../../hooks/use-database";
import ItemForm from "../organisms/ItemForm";
import { useAuth } from "../../hooks/use-auth";

export default function AddItem() {
	const { theme } = useTheme();
	const { user } = useAuth();
	const { addItem, tags, addTags } = useDatabase();

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			{user && user.uid ? (
				<ItemForm
					tags={tags && tags.length ? tags : []}
					addTags={addTags}
					onItemFormClick={addItem}
					link="/"
					buttonText="Add a new note"
					headerText="Create a new note!"
				/>
			) : (
				<h3>You need to log in to add an item...</h3>
			)}
		</div>
	);
}
