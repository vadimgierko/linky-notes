import { useTheme } from "../../hooks/use-theme";
import EyeIconButton from "../../components/atoms/EyeIconButton";
import PencilIconButton from "../../components/atoms/PencilIconButton";
import TrashIconButton from "../../components/atoms/TrashIconButton";
import IconButton from "../atoms/IconButton";

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

const ICON_BUTTONS_GROUP = [
	{
		iconName: "eye",
		color: "secondary",
	},
	{
		iconName: "pencil",
		color: "primary",
	},
	{
		iconName: "trash",
		color: "danger",
	},
];

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
						{/* render ICON_BUTTONS_GROUP, but... maybe it will be: deleteButton, updateButton etc. or "do" prop */}
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
				{Object.keys(item).map((key) => {
					return typeof item[key] === "string" ? (
						<p key={key} className="card-text">
							<strong>{key}</strong>: {item[key]}
						</p>
					) : (
						<div key={key} className="mb-3">
							<p className="card-text">
								<strong>{key}</strong>:
							</p>
							{Object.keys(item[key]).map((subkey) => (
								<p key={subkey} className="card-text ms-3">
									<strong>{subkey}</strong>: {item[key][subkey]}
								</p>
							))}
						</div>
					);
				})}
			</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
}
