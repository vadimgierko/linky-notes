import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import addItem from "../../logic/addItem";
import updateItem from "../../logic/updateItem";
import TagSearchForm from "./TagSearchForm";
//import SourceForm from "./SourceForm";

export default function ItemForm({ itemKey }) {
	const { theme } = useTheme();
	const { state, dispatch } = useStore();
	const [item, setItem] = useState();

	function addExistingTag(tagKey) {
		if (tagKey) {
			setItem({
				...item,
				existingTags: {
					...item.existingTags,
					[tagKey]: { ...state.tags[tagKey] },
				},
			});
		}
	}

	function deleteExistingTag(tagKey) {
		if (tagKey) {
			const updatedTags = { ...item.existingTags };
			delete updatedTags[tagKey];
			setItem({
				...item,
				existingTags: {
					...updatedTags,
				},
			});
		}
	}

	function addNewTag(tag) {
		if (tag) {
			setItem({
				...item,
				newTags: [...item.newTags, tag],
			});
		}
	}

	function deleteNewTag(tag) {
		if (tag) {
			const updatedTags = item.newTags.filter(
				(element) => element !== tag
			);
			setItem({
				...item,
				newTags: updatedTags,
			});
		}
	}

	function handleFormSubmit(item, itemKey) {
		if (itemKey) {
			//updateItem(item, passedItemKey, state.user.id, dispatch);
			console.log("updated item:", item);
		} else {
			//addItem(item, state.user.id, dispatch);
			console.log("added item:", item);
		}
	}

	useEffect(() => {
		if (itemKey) {
			//getItemByItemKey(itemKey)
		} else {
			setItem({
				content: "",
				existingTags: {},
				newTags: [],
			});
		}
	}, [itemKey]);

	useEffect(() => console.log("item:", item), [item]);

	if (!item) return null;

	return (
		<div
			className={
				"card mb-2 shadow bg-" +
				theme.mode +
				(theme.mode === "dark" ? " border-secondary" : "")
			}
		>
			<div className="card-header fw-bold text-center">
				{itemKey ? "Update item!" : "Add item!"}
			</div>
			<div className="card-body">
				<form>
					<textarea
						className={
							"form-control mb-2 + bg-" +
							theme.mode +
							" text-" +
							(theme.mode === "dark" ? "light" : "dark")
						}
						placeholder="note content goes here"
						defaultValue={item ? item.content : ""}
						onChange={(e) =>
							setItem({ ...item, content: e.target.value })
						}
					></textarea>
					<TagSearchForm
						form={true}
						addExistingTag={addExistingTag}
						addNewTag={addNewTag}
						deleteExistingTag={deleteExistingTag}
						deleteNewTag={deleteNewTag}
						existingTags={item.existingTags}
						newTags={item.newTags}
					/>
				</form>
			</div>
			<div className="card-footer">
				<Link
					to={itemKey ? "/notes/" + itemKey : "/"}
					type="button"
					className="btn btn-success mb-2 d-block text-white"
					onClick={() => handleFormSubmit(item, itemKey)}
				>
					{itemKey ? "Update item" : "Add item"}
				</Link>
			</div>
		</div>
	);
}
