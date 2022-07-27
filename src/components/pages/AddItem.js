import { useSelector } from "react-redux";
import { useTheme } from "../../hooks/use-theme";
import ItemForm from "../organisms/ItemForm";

export default function AddItem() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);

	if (!user.id) return <p>You need to log in to add an item...</p>;

	return (
		<div
			className="add-item-page"
			style={{ background: theme.background, color: theme.color }}
		>
			<ItemForm />
		</div>
	);
}
