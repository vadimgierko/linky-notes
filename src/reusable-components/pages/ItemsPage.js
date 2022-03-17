import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import List from "../../reusable-components/molecules/List";

export default function ItemsPage({
	itemCategoryNameInTheSingular,
	itemCategoryNameInThePlural,
	RenderComponent,
}) {
	const { theme } = useTheme();
	const { state } = useStore();

	if (!state.user)
		return (
			<p>You need to be logged to see your {itemCategoryNameInThePlural}!</p>
		);

	if (
		!state[itemCategoryNameInThePlural] ||
		!Object.entries(state[itemCategoryNameInThePlural]).length
	)
		return (
			<p className={`${itemCategoryNameInThePlural}-page`}>
				There are no {itemCategoryNameInThePlural} in the store yet or the're
				loading now...
			</p>
		);

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className={`${itemCategoryNameInThePlural}-page`}
		>
			<List
				items={state[itemCategoryNameInThePlural]}
				ListItemComponent={RenderComponent}
				itemCategoryNameInThePlural={itemCategoryNameInThePlural}
				itemCategoryNameInTheSingular={itemCategoryNameInTheSingular}
			/>
		</div>
	);
}
