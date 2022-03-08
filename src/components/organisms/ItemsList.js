import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import ItemCard from "../molecules/ItemCard";

export default function ItemsList({ search }) {
	const { theme } = useTheme();
	const { state } = useStore();
	const [itemsList, setItemsList] = useState();

	function filterItems(search) {
		const tagsKeysStringFromSearch = search.slice(6);

		if (tagsKeysStringFromSearch.length) {
			const tagsKeysArray = tagsKeysStringFromSearch.split("+");

			const filteredItemsKeys = Object.keys(state.items).filter(
				(itemKey) => {
					const itemTagsKeysArray = Object.keys(
						state.items[itemKey].tags
					);
					const containsAllTags = tagsKeysArray.every((element) =>
						itemTagsKeysArray.includes(element)
					);
					if (containsAllTags) {
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
						...state.items[filteredItemsKeys[i]],
					},
				};
			}
			setItemsList(filteredItems);
		} else {
			setItemsList();
		}
	}

	useEffect(() => {
		if (state && state.items && Object.entries(state.items).length) {
			if (search) {
				filterItems(search);
			} else {
				setItemsList(state.items);
			}
		} else {
			console.log(
				"There are no items in state... Wait until items will be fetched... or... there are no items at all..."
			);
			setItemsList();
		}
	}, [search, state]);

	if (!itemsList || !Object.entries(itemsList).length)
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
				{Object.entries(itemsList)
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
