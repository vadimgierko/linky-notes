import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import EyeIconButton from "../../components/atoms/EyeIconButton";
import PencilIconButton from "../../components/atoms/PencilIconButton";
import TrashIconButton from "../../components/atoms/TrashIconButton";

/**
 * NOTE: now this Card is adapted for source item !
 *
 * TO DO:
 * - split Card into header, body & footer to control them:
 *   - create these 3 components & pass them as the default props
 * - reusable iconButton
 * - reusable created/updated ???
 *
 * Issue:
 * - if we fetch objects from firebase, they are in alphabetical order...
 * that means, that if we want map them, then it will be not original order (like in card-body now)
 * Solutions:
 * 1. need to hardcode their order?
 * 2. use structure for form as a template? => put structure form in store & share?
 * 3. order them when fetch?
 */

export default function Card({
	item,
	itemKey,
	itemCategoryNameInThePlural, // if need it for a link
	itemCategoryNameInTheSingular, // if need it for a link
}) {
	const { theme } = useTheme();

	return (
		<div
			className={
				"item-card card mb-2 shadow bg-" +
				theme.mode +
				(theme.mode === "dark" ? " border-secondary" : "")
			}
		>
			<div className="card-header">
				<div className="row">
					<div className="col text-muted">
						{item.createdAt} {item.updatedAt ? "/ " + item.updatedAt : null}
					</div>
					<div className="icon-buttons-group col text-end">
						{/* maybe it will be: deleteButton, updateButton etc. or "do" prop */}
						<EyeIconButton
							link={"/" + itemCategoryNameInThePlural + "/" + itemKey}
						/>
						<PencilIconButton
							link={
								"/" +
								itemCategoryNameInThePlural +
								"/update-" +
								itemCategoryNameInTheSingular +
								"/" +
								itemKey
							}
						/>
						<TrashIconButton
							handleOnTrashButtonClick={
								() => alert("There is no delete function for this item ;-)")
								//deleteItem(itemKey, state.user.id, dispatch)
							}
						/>
					</div>
				</div>
			</div>
			<div className="card-body">
				<CardBody
					item={item}
					itemCategoryNameInTheSingular={itemCategoryNameInTheSingular}
				/>
			</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
}

function CardBody({ item, itemCategoryNameInTheSingular }) {
	const { state } = useStore();

	if (state.authors || Object.entries(state.authors).length) {
		if (itemCategoryNameInTheSingular === "source")
			return (
				<>
					<h3>{item.title}</h3>
					<p className="card-text">
						{item.subtitle ? item.subtitle : "[no subtitle data]"}
					</p>
					<p className="card-text">
						by {state.authors[item.authorKey].firstName}{" "}
						{state.authors[item.authorKey].lastName}
					</p>
					<hr />
					<p className="card-text">
						Published by{" "}
						{item.publisher ? item.publisher : "[no publisher data]"} in{" "}
						{item.placeOfPublication} in {item.yearOfPublication}
					</p>
				</>
			);
	} else {
		return <p className="card-text text-danger">Downloading source data...</p>;
	}
}

//======================= mapping list object with nested (object) & non-nested (string) objects:
// Object.keys(item).map((key) => {
// 	return typeof item[key] === "string" ? (
// 		<p key={key} className="card-text">
// 			<strong>{key}</strong>: {item[key]}
// 		</p>
// 	) : (
// 		<div key={key} className="mb-3">
// 			<p className="card-text">
// 				<strong>{key}</strong>:
// 			</p>
// 			{Object.keys(item[key]).map((subkey) => (
// 				<p key={subkey} className="card-text ms-3">
// 					<strong>{subkey}</strong>: {item[key][subkey]}
// 				</p>
// 			))}
// 		</div>
// 	);
// })
