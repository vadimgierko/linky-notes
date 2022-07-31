import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/useTheme";
//import { useStore } from "../../store/Store";
import NoteCard from "../molecules/NoteCard";

export default function ItemsList({ search }) {
	const { theme } = useTheme();
	const notes = useSelector((state) => state.notes.value);
	//const { state } = useStore();
	const [itemsList, setItemsList] = useState();

	function filterItems(search) {
		const tagsKeysStringFromSearch = search.slice(6);

		if (tagsKeysStringFromSearch.length) {
			const tagsKeysArray = tagsKeysStringFromSearch.split("+");

			const filteredItemsKeys = Object.keys(notes).filter((itemKey) => {
				const itemTagsKeysArray = Object.keys(notes[itemKey].tags);
				const containsAllTags = tagsKeysArray.every((element) =>
					itemTagsKeysArray.includes(element)
				);
				if (containsAllTags) {
					return itemKey;
				} else {
					return null;
				}
			});
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
		if (notes && Object.entries(notes).length) {
			if (search) {
				filterItems(search);
			} else {
				setItemsList(notes);
			}
		} else {
			console.log(
				"There are no items in state... Wait until items will be fetched... or... there are no items at all..."
			);
			setItemsList();
		}
	}, [search, notes]);

	if (!itemsList || !Object.entries(itemsList).length)
		return <p>There are no notes so far...</p>;

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
			className="notes-list"
		>
			<div>
				{Object.entries(itemsList)
					.slice()
					.reverse()
					.map((itemArray) => {
						const itemKey = itemArray[0];
						const item = itemArray[1];
						return (
							<NoteCard key={"item-" + itemKey} item={item} itemKey={itemKey} />
						);
					})}
			</div>
		</div>
	);
}
