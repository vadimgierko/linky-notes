import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import ItemForm from "../organisms/ItemForm";

export default function AddItem() {
	const { theme } = useTheme();
	const { state } = useStore();

	if (!state.user) return <p>You need to log in to add an item...</p>;

	return (
		<div
			className="add-item-page"
			style={{ background: theme.background, color: theme.color }}
		>
			<ItemForm />
		</div>
	);
}
