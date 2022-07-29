import { useParams } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
import { useStore } from "../../store/Store";
import ItemForm from "../organisms/ItemForm";

export default function UpdateItem() {
	const { theme } = useTheme();
	const { state } = useStore();
	const { itemKey } = useParams();

	if (!state.user) return <p>You need to be logged to update item!</p>;

	return (
		<div
			className="update-item-page"
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<ItemForm itemKey={itemKey} />
		</div>
	);
}
