import { useTheme } from "../../hooks/use-theme";
import { useEffect, useState } from "react";
import TagSearchForm from "../organisms/TagSearchForm";
import ItemsList from "../organisms/ItemsList";
import { useLocation } from "react-router-dom";
import { useStore } from "../../store/Store";
import fetchItems from "../../logic/fetchItems";
import fetchTags from "../../logic/fetchTags";

export default function Items() {
	const { theme } = useTheme();
	const { state } = useStore();

	const { search } = useLocation();

	const [filterTagsKeys, setFilterTagsKeys] = useState();
	const [filteredItems, setFilteredItems] = useState();

	const [searchLink, setSearchLink] = useState();

	// useEffect(() => {
	// 	if (state.user) {
	// 		if (!state.fetchedItems) {
	// 			fetchItems(state.user.id, dispatch);
	// 		} else {
	// 			console.log(
	// 				"Fetched items are already fetched. No need to fetch again."
	// 			);
	// 		}
	// 		if (!state.tags) {
	// 			fetchTags(state.user.id, dispatch);
	// 		} else {
	// 			console.log(
	// 				"Fetched tags are already fetched. No need to fetch again."
	// 			);
	// 		}
	// 	}
	// }, [state]);

	//if (!state.user) return <p>You need to be logged to see your items!</p>;

	useEffect(() => {
		if (search) {
			console.log("search from useLocation():", search);

			const searchValue = search.slice(6);
			console.log("searchValue (from search.slice(6):", searchValue);

			if (searchValue.length) {
				const tagsKeys = searchValue.split("+"); // returns an array with tagKeys
				console.log("tagKeys = array from searchValue:", tagsKeys);
				setFilterTagsKeys(tagsKeys);
				setSearchLink(searchValue);
				console.log("searchLink = searchValue", searchValue);
			} else {
				console.log("there is no search value");
				setFilterTagsKeys([]);
				setSearchLink();
			}
		}
	}, [search]);

	// function filterItems(filterTags) {
	// 	if (state.items) {
	// 		if (filterTags && filterTags.length) {
	// 			let filteredItemsArray = [];
	// 			const itemsArray = Object.entries(state.items);
	// 			for (let i = 0; i < itemsArray.length; i++) {
	// 				const item = itemsArray[i][1];
	// 				let sameNum = 0;
	// 				for (let n = 0; n < filterTags.length; n++) {
	// 					for (let m = 0; m < item.tags.length; m++) {
	// 						if (item.tags[m] === filterTags[n]) {
	// 							sameNum++;
	// 							if (sameNum === filterTags.length) {
	// 								filteredItemsArray.push([...itemsArray[i]]);
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 			setFilteredItems([...filteredItemsArray]);
	// 		}
	// 	}
	// }

	// useEffect(() => {
	// 	//console.log("filterTags:", filterTags);
	// 	filterItems(filterTags);
	// }, [filterTags, items]);

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
			{/* {filterTags && filterTags.length ? (
				filteredItems && filteredItems.length ? (
					<ItemsList items={filteredItems} />
				) : (
					<div>There are no notes including this tag/tags...</div>
				)
			) : (
				<ItemsList items={items ? Object.entries(items) : []} />
			)} */}
			<ItemsList items={state.fetchedItems} />
		</div>
	);
}
