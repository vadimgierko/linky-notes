import TagButton from "../atoms/TagButton";
import { useTheme } from "../../hooks/use-theme";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";
import { useDatabase } from "../../hooks/use-database";

export default function ItemCard({
  item,
  itemKey,
  deleteLink,
  editLink,
  deleteFunction
}) {
  const { theme } = useTheme();
  const { sources } = useDatabase();

  function fetchSourceObjectAndConvertIntoSourceRepresentation(sourceKey) {
    if (sources) {
      const sourceObject = sources[sourceKey];
      if (sourceObject) {
        return `${sourceObject.name} ${sourceObject.surname}, ${sourceObject.title}, ${sourceObject.city} ${sourceObject.year}`;
      } else {
        return "source was deleted probably...";
      }
    }
  }

  return (
    <div className={"card mb-2 shadow bg-" + theme.mode}>
      <div className="card-header">
        <div className="row">
          <div className="col text-muted">
            {item.createdAt} {item.updatedAt ? "/ " + item.updatedAt : null}
          </div>
          <div className="col text-end">
            <EyeIconButton link={"/notes/" + itemKey} />
            <PencilIconButton link={editLink} />
            <TrashIconButton
              link={deleteLink}
              handleOnTrashButtonClick={deleteFunction}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="card-text">{item.content}</p>
        {item.tags && item.tags.length
          ? item.tags.map((tag) => (
              <TagButton key={"item-tag-" + tag} tag={tag} />
            ))
          : null}
      </div>
      <div className="card-footer text-muted">
        {item.source
          ? fetchSourceObjectAndConvertIntoSourceRepresentation(item.source) +
            " [" +
            item.page +
            "]"
          : null}
      </div>
    </div>
  );
}
