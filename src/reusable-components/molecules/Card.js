import { useTheme } from "../../hooks/use-theme";
import EyeIconButton from "../../components/atoms/EyeIconButton";
import PencilIconButton from "../../components/atoms/PencilIconButton";
import TrashIconButton from "../../components/atoms/TrashIconButton";

// if body prop includes text => add className="card-text" to <p>
export default function Card({ item, itemKey, body, footer }) {
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
						<EyeIconButton link={"/sources/" + itemKey} />
						<PencilIconButton link={"/sources/update-source/" + itemKey} />
						<TrashIconButton
							handleOnTrashButtonClick={
								() => alert("There is no delete function for this item ;-)")
								//deleteItem(itemKey, state.user.id, dispatch)
							}
						/>
					</div>
				</div>
			</div>
			<div className="card-body">{body}</div>
			<div className="card-footer text-muted">{footer}</div>
		</div>
	);
}
