import { useTheme } from "../../hooks/use-theme";
import { useEffect, useState } from "react";
import TagSearchForm from "../organisms/TagSearchForm";
import ItemsList from "../organisms/ItemsList";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/Store";

export default function Items() {
	const { theme } = useTheme();
	const { state } = useStore();

	const { search } = useLocation();

	const [filterTagsKeys, setFilterTagsKeys] = useState();
	const [filteredItems, setFilteredItems] = useState();

	const [searchLink, setSearchLink] = useState();

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
		if (search) {
			//console.log("search from useLocation():", search);

			const searchValue = search.slice(6);
			//console.log("searchValue (from search.slice(6)):", searchValue);

			if (searchValue.length) {
				const tagsKeys = searchValue.split("+"); // returns an array with tagKeys
				//console.log("tagKeys = array from searchValue:", tagsKeys);
				setFilterTagsKeys(tagsKeys);
				setSearchLink(searchValue);
				//console.log("searchLink = searchValue", searchValue);
			} else {
				//console.log("there is no search value");
				setFilterTagsKeys();
				setSearchLink();
			}
		} else {
			//console.log("there is no search");
			setFilterTagsKeys();
			setSearchLink();
		}
	}, [search]);

	useEffect(() => {
		//console.log("filterTagsKeys", filterTagsKeys);
		filterItems(filterTagsKeys);
	}, [filterTagsKeys]);

	// useEffect(
	// 	() => console.log("filteredItems:", filteredItems),
	// 	[filteredItems]
	// );

	//if (!state.user) return <p>You need to be logged to see your items!</p>;

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="items-page"
		>
			<TagSearchForm
				filterTagsKeys={filterTagsKeys}
				searchLink={searchLink}
			/>
			{filteredItems ? (
				<ItemsList items={filteredItems} />
			) : (
				<ItemsList items={state.fetchedItems} />
			)}
		</div>
	);
}
