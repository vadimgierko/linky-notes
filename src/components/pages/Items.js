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
	const { state, dispatch } = useStore();
	const { search } = useLocation();

	const [filterTags, setFilterTags] = useState([]);
	const [searchLinkFromFilterTags, setSearchLinkFromFilterTags] =
		useState(null);

	const [filteredItems, setFilteredItems] = useState([]);

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

	if (!state.user) return <p>You need to be logged to see your items!</p>;
	//if (!state.fetchedItems) return <p>There are no user's items so far...</p>;

	// useEffect(() => {
	// 	if (search) {
	// 		//console.log("search:", search);
	// 		const searchValue = search.slice(6);
	// 		//console.log("searchValue", searchValue)
	// 		if (searchValue.length) {
	// 			// when search value changes, set filter tags:
	// 			setFilterTags(() => {
	// 				const tags = searchValue.split("+");
	// 				// decode tags from URL:
	// 				let convertedTags = [];
	// 				for (let n = 0; n < tags.length; n++) {
	// 					convertedTags.push(decodeURI(tags[n]));
	// 				}
	// 				setSearchLinkFromFilterTags(() => {
	// 					let link = "";
	// 					for (let i = 0; i < convertedTags.length; i++) {
	// 						if (i === 0) {
	// 							link = convertedTags[i];
	// 						} else {
	// 							link = link + "+" + convertedTags[i];
	// 						}
	// 					}
	// 					return link;
	// 				});
	// 				//console.log("converted tags:", convertedTags)
	// 				return [...convertedTags];
	// 			});
	// 		} else {
	// 			//console.log("there is no search value");
	// 			setFilterTags([]);
	// 			setSearchLinkFromFilterTags(null);
	// 		}
	// 	} else {
	// 		//console.log("There is no search value.");
	// 	}
	// }, [search]);

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
		>
			<TagSearchForm
				chosenTags={filterTags}
				setChosenTags={setFilterTags}
				searchLinkFromFilterTags={searchLinkFromFilterTags}
				setSearchLinkFromFilterTags={setSearchLinkFromFilterTags}
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
