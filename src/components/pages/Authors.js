import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import List from "../../reusable-components/molecules/List";
import Card from "../../reusable-components/molecules/Card";

export default function Authors() {
	const { theme } = useTheme();
	const { state } = useStore();

	//if (!state.user) return <p>You need to be logged to see your items!</p>;
	if (!state.authors || !Object.entries(state.authors).length)
		return (
			<p className="authors-page">
				There are no authors in the store yet or the're loading now...
			</p>
		);

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="sources-page"
		>
			<List
				items={state.authors}
				ListItemComponent={Card}
				itemCategoryNameInThePlural="authors"
				itemCategoryNameInTheSingular="author"
			/>
		</div>
	);
}
