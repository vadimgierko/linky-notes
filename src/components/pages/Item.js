import { useTheme } from "../../hooks/use-theme";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemCard from "../molecules/ItemCard";
import { useStore } from "../../store/Store";

export default function Item() {
	const { theme } = useTheme();
	const { state } = useStore();

	const { itemKey } = useParams();

	const [item, setItem] = useState();

	useEffect(() => {
		if (state.fetchedItems) {
			if (state.fetchedItems[itemKey]) {
				setItem(state.fetchedItems[itemKey]);
				console.log(
					"The item with the key",
					itemKey,
					"is in fetched items, so there's no need to fetch it."
				);
			} else {
				setItem(null);
				console.log(
					"There is no item with the key",
					itemKey,
					"in fetched items."
				);
			}
		}
	}, [state]);

	if (!item) return <p>Loading item or there is no such item...</p>;

	return (
		<div
			className="item-page"
			style={{
				background: theme.background,
				color: theme.color,
			}}
		>
			<ItemCard key={"item-" + itemKey} item={item} itemKey={itemKey} />
		</div>
	);
}
