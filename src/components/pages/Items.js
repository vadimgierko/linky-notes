import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import TagSearchForm from "../organisms/TagSearchForm";
import ItemsList from "../organisms/ItemsList";

export default function Items() {
	const { theme } = useTheme();
	const { state } = useStore(); // need when uncomment checking if user is logged
	const { search } = useLocation();

	//if (!state.user) return <p>You need to be logged to see your items!</p>;

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="items-page"
		>
			<TagSearchForm search={search} />
			{/* <ItemsList search={search} /> */}
		</div>
	);
}
