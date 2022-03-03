import { useTheme } from "../../hooks/use-theme";
import ItemCard from "../molecules/ItemCard";

export default function ItemsList({ items }) {
	const { theme } = useTheme();

	function filterItems(filterTagsKeys) {
		if (filterTagsKeys) {
			if (state.fetchedItems) {
				let items = {}; // object with filtered items objects
				const stateFetchedItemsArray = Object.entries(
					state.fetchedItems
				);
				//console.log("stateFetchedItemsArray", stateFetchedItemsArray);
				for (let i = 0; i < stateFetchedItemsArray.length; i++) {
					const itemTagsArray = Object.entries(
						stateFetchedItemsArray[i][1].tags
					);
					//console.log("itemTagsArray", itemTagsArray);
					let sameTagsNum = 0;
					for (let j = 0; j < filterTagsKeys.length; j++) {
						for (let n = 0; n < itemTagsArray.length; n++) {
							if (itemTagsArray[n][0] === filterTagsKeys[j]) {
								sameTagsNum++;
								if (sameTagsNum === filterTagsKeys.length) {
									items = {
										...items,
										[stateFetchedItemsArray[i][0]]: {
											...stateFetchedItemsArray[i][1],
										},
									};
								}
							}
						}
						if (j === filterTagsKeys.length - 1) {
							sameTagsNum = 0;
						}
					}
				}
				if (Object.entries(items).length) {
					setFilteredItems(items);
				} else {
					setFilteredItems();
				}
			}
		} else {
			setFilteredItems();
		}
	}

	useEffect(() => {
		//console.log("filterTagsKeys", filterTagsKeys);
		filterItems(filterTagsKeys);
	}, [filterTagsKeys]);

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
