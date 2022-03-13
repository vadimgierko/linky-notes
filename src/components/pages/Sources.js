import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import List from "../../reusable-components/molecules/List";
import Card from "../../reusable-components/molecules/Card";

export default function Sources() {
	const { theme } = useTheme();
	const { state } = useStore();

	//if (!state.user) return <p>You need to be logged to see your items!</p>;
	if (!state.sources || !Object.entries(state.sources).length)
		return (
			<p className="sources-page">
				There are no sources in the store yet or the're loading now...
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
				items={state.sources}
				ListItemComponent={Card}
				itemCategoryNameInThePlural="sources"
				itemCategoryNameInTheSingular="source"
			/>
		</div>
	);
}
