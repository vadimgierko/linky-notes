import { useTheme } from "../../hooks/use-theme";
import EyeIconButton from "../../components/atoms/EyeIconButton";
import PencilIconButton from "../../components/atoms/PencilIconButton";
import TrashIconButton from "../../components/atoms/TrashIconButton";

// if body prop includes text => add className="card-text" to <p>
// NOTE: now this Card is adapted for source item !!!!!!!!!!!!!!!!!!!!!!!!!!
export default function Card({
	item,
	itemKey,
	itemCategoryNameInThePlural,
	itemCategoryNameInTheSingular,
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
					<div className="col text-end">
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
