import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import ItemCard from "../molecules/ItemCard";

export default function ItemsList({ search }) {
	const { theme } = useTheme();
	const { state } = useStore();
	const [items, setItems] = useState();

	function filterItems(search) {
		const tagsKeysStringFromSearch = search.slice(6);

		if (tagsKeysStringFromSearch.length) {
			const tagsKeysArray = tagsKeysStringFromSearch.split("+");

			const filteredItemsKeys = Object.keys(state.fetchedItems).filter(
				(itemKey) => {
					const itemTagsKeysArray = Object.keys(
						state.fetchedItems[itemKey].tags
					);
					const containsAll = tagsKeysArray.every((element) =>
						itemTagsKeysArray.includes(element)
					);
					if (containsAll) {
						return itemKey;
					} else {
						return null;
					}
				}
			);
			//console.log("filteredItemsKeys:", filteredItemsKeys);
			let filteredItems = {};
			for (let i = 0; i < filteredItemsKeys.length; i++) {
				filteredItems = {
					...filteredItems,
					[filteredItemsKeys[i]]: {
						...state.fetchedItems[filteredItemsKeys[i]],
					},
				};
			}
			setItems(filteredItems);
		} else {
			setItems();
		}
	}

	useEffect(() => {
		if (
			state &&
			state.fetchedItems &&
			Object.entries(state.fetchedItems).length
		) {
			if (search) {
				filterItems(search);
			} else {
				setItems(state.fetchedItems);
			}
		} else {
			console.log(
				"There are no fetched items in state... Wait until items will be fetched... or... there are no items at all..."
			);
			setItems();
		}
	}, [search, state]);

	if (!items || !Object.entries(items).length)
		return <p>There are no items so far...</p>;

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="items-list"
		>
			<div>
				{Object.entries(items)
					.slice()
					.reverse()
					.map((itemArray) => {
						const itemKey = itemArray[0];
						const item = itemArray[1];
						return (
							<ItemCard
								key={"item-" + itemKey}
								item={item}
								itemKey={itemKey}
							/>
						);
					})}
			</div>
		</div>
	);
}
