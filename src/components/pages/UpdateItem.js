import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import ItemForm from "../organisms/ItemForm";

export default function UpdateItem() {
	const { theme } = useTheme();
	const { state } = useStore();
	//const { items, updateItem, tags, addTags } = useDatabase();

	const { itemKey } = useParams();

	const [item, setItem] = useState(null);

	useEffect(() => {
		if (state.items && itemKey) {
			setItem({
				...state.items[itemKey],
				tags:
					state.items[itemKey].tags &&
					state.items[itemKey].tags.length
						? state.items[itemKey].tags
						: [],
			});
		}
	}, [state, itemKey]);

	return (
		<div style={{ background: theme.background, color: theme.color }}>
			{state.user && state.user.uid ? (
				item ? (
					<ItemForm
						tags={state.tags && state.tags.length ? state.tags : []}
						addTags={addTags}
						onItemFormClick={updateItem}
						link="/"
						buttonText="Update note"
						headerText="Update note!"
						passedItem={item ? item : null}
						passedItemKey={itemKey ? itemKey : null}
					/>
				) : (
					<h3>Downloading data...</h3>
				)
			) : (
				<h3>
					You need to log in to update this item if it belongs to
					you...
				</h3>
			)}
		</div>
	);
}
