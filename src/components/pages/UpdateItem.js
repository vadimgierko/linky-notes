import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import ItemForm from "../organisms/ItemForm";

export default function UpdateItem() {
	const { theme } = useTheme();
	const { state } = useStore();

	const { itemKey } = useParams();

	// const [item, setItem] = useState();

	// useEffect(() => {
	// 	if (state.fetchedItems) {
	// 		if (state.fetchedItems[itemKey]) {
	// 			setItem(state.fetchedItems[itemKey]);
	// 			console.log(
	// 				"The item with the key",
	// 				itemKey,
	// 				"is in fetched items, so there's no need to fetch it."
	// 			);
	// 		} else {
	// 			setItem(null);
	// 			console.log(
	// 				"There is no item with the key",
	// 				itemKey,
	// 				"in fetched items."
	// 			);
	// 		}
	// 	}
	// }, [state]);

	//if (!state.user) return <p>You need to be logged to update item!</p>;

	//if (!item) return <p>Loading item or there is no such item...</p>;

	return (
		<div
			className="update-item-page"
			style={{ background: theme.background, color: theme.color }}
		>
			<ItemForm itemKey={itemKey} />
		</div>
	);
}
