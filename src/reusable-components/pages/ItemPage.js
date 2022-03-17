import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";

/**
 * ItemPage is a reusable & customizable page layout component.
 * It's dedicated for displaying a page for an item, like article, post, note etc.
 * ItemPage gets the item object from the store (state) by itemKey
 * & passes it to the passed via props RenderComponent.
 * If the item is loading or there is no such item ItemPage renders an info about it.
 */

export default function ItemPage({
	itemCategoryNameInTheSingular,
	itemCategoryNameInThePlural,
	itemKey,
	RenderComponent,
}) {
	const { theme } = useTheme();
	const { state } = useStore();

	if (!state.user) return <p>You need to be logged to see this page!</p>;

	if (!state[itemCategoryNameInThePlural][itemKey])
		return (
			<p>
				{`Loading ${itemCategoryNameInTheSingular} or there is no such ${itemCategoryNameInTheSingular}...`}
			</p>
		);

	return (
		<div
			className={`${itemCategoryNameInTheSingular}-page`}
			style={{
				background: theme.background,
				color: theme.color,
			}}
		>
			<RenderComponent
				item={state[itemCategoryNameInThePlural][itemKey]}
				itemKey={itemKey}
				itemCategoryNameInThePlural={itemCategoryNameInThePlural}
				itemCategoryNameInTheSingular={itemCategoryNameInTheSingular}
			/>
		</div>
	);
}
