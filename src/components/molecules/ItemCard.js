import TagButton from "../atoms/TagButton";
import { useTheme } from "../../hooks/use-theme";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";

export default function ItemCard({
    item,
    itemKey,
    deleteLink,
    editLink,
    deleteFunction
}) {
    const { theme } = useTheme();
    return (
        <div className={"card mb-2 bg-" + theme.mode}>
            <div className="card-header text-end">
                <EyeIconButton link={"/items/" + itemKey} />
                <PencilIconButton link={editLink} />
                <TrashIconButton link={deleteLink} onClick={deleteFunction} />
            </div>
            <div className="card-body">
                <p className="card-text text-secondary">{item.content}</p>
                {item.tags && item.tags.length
                ? item.tags.map((tag) => <TagButton key={"item-tag-" + tag} tag={tag} />)
                : null}    
            </div>
            <div className="card-footer text-muted">
                {item.createdAt} {item.updatedAt ? "-> " + item.updatedAt : null}
            </div>
        </div>
    );
}
