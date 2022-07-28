import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
// components:
import TagSearchForm from "../organisms/TagSearchForm";
import ItemsList from "../organisms/ItemsList";

export default function Items() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const { search } = useLocation();

	if (!user.id) return <p>You need to be logged to see your items!</p>;

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="items-page"
		>
			<TagSearchForm search={search} />
			<ItemsList search={search} />
		</div>
	);
}
