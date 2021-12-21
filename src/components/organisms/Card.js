import { useTheme } from "../../hooks/use-theme";
import TagButton from "../atoms/TagButton";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";
import { useDatabase } from "../../hooks/use-database";

export default function Card() {
  const { theme } = useTheme();

  return (
    <div className={"card mb-2 shadow bg-" + theme.mode}>
      <div className="card-header"></div>
      <div className="card-body">
        <h5 className="card-text"></h5>
        <p className="card-text"></p>
      </div>
      <div className="card-footer text-muted"></div>
    </div>
  );
}
