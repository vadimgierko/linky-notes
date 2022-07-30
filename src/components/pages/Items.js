import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// components:
import TagSearchForm from "../organisms/TagSearchForm";
import ItemsList from "../organisms/ItemsList";

export default function Items() {
	const { theme } = useTheme();
	const user = useSelector((state) => state.user.value);
	const { search } = useLocation();

	if (!user.id)
		return (
			<div
				style={{
					backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
					color: theme === "light" ? "black" : "white",
				}}
				className="items-page"
			>
				<p>You need to be logged to see your items!</p>
			</div>
		);

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
			className="items-page"
		>
			<TagSearchForm search={search} />
			<ItemsList search={search} />
		</div>
	);
}
