import TagLinkButton from "../atoms/TagLinkButton";
import { useTheme } from "../../hooks/use-theme";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";
import { useStore } from "../../store/Store";
import deleteItem from "../../logic/deleteItem";

export default function ItemCard({ item, itemKey }) {
	const { theme } = useTheme();
	const { state, dispatch } = useStore();
	//const { sources } = useDatabase();

	// function fetchSourceObjectAndConvertIntoSourceRepresentation(sourceKey) {
	//   if (sources) {
	//     const sourceObject = sources[sourceKey];
	//     if (sourceObject) {
	//       return `${sourceObject.name} ${sourceObject.surname}, ${sourceObject.title}, ${sourceObject.city} ${sourceObject.year}`;
	//     } else {
	//       return "source was deleted probably...";
	//     }
	//   }
	// }

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
						{item.createdAt}{" "}
						{item.updatedAt ? "/ " + item.updatedAt : null}
					</div>
					<div className="col text-end">
						<EyeIconButton link={"/notes/" + itemKey} />
						<PencilIconButton
							link={"/notes/update-note/" + itemKey}
						/>
						<TrashIconButton
							handleOnTrashButtonClick={() =>
								deleteItem(itemKey, state.user.id, dispatch)
							}
						/>
					</div>
				</div>
			</div>
			<div className="card-body">
				<p className="item-content card-text">{item.content}</p>
				<div className="item-tags">
					{item.tags &&
						Object.entries(item.tags).map((tag) => (
							<TagLinkButton
								key={"item-tag-" + tag[0]}
								tag={tag[1].tag}
								tagLink={"/search?name=" + tag[0]}
							/>
						))}
				</div>
			</div>
			<div className="card-footer text-muted">
				{/* {item.source
          ? fetchSourceObjectAndConvertIntoSourceRepresentation(item.source) +
            " [" +
            item.page +
            "]"
          : null} */}
			</div>
		</div>
	);
}
