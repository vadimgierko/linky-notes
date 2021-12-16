import TagButton from "../atoms/TagButton";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";

export default function ItemCard({
    item,
    itemKey,
    deleteLink,
    editLink,
    deleteFunction
}) {
    const { theme } = useTheme();
    return (
        <div className="card mb-3">
            <div className="card-header text-end">
                <PencilIconButton link={editLink} />
                <TrashIconButton link={deleteLink} onClick={deleteFunction} />
            </div>
            <div className="card-body">
                <Link
                    to={"/items/" + itemKey}
                    style={{ textDecoration: "none" }}
                >
                    <p className="card-text text-secondary">{item.content}</p>
                </Link>
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
