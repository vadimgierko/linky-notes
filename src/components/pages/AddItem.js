import { useTheme } from "../../hooks/use-theme";
import ItemForm from "../organisms/ItemForm";
import { useStore } from "../../store/Store";
import addItem from "../../logic/addItem";

export default function AddItem() {
	const { theme } = useTheme();
	const { state } = useStore();

	if (!state.user) return <p>You need to log in to add an item...</p>;

	return (
		<div
			className="add-item-form"
			style={{ background: theme.background, color: theme.color }}
		>
			<ItemForm
				onItemFormClick={addItem}
				link="/"
				buttonText="Add a new note"
				headerText="Create a new note!"
			/>
		</div>
	);
}
