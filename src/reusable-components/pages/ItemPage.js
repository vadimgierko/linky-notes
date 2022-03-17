import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";

/**
 * ItemPage is a reusable & customizable page layout component.
 * It's dedicated for displaying a page for an item, like article, post, note etc.
 * ItemPage gets the item object from store (state) by itemKey
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
	const [item, setItem] = useState();

	useEffect(() => {
		if (state[itemCategoryNameInThePlural]) {
			if (state[itemCategoryNameInThePlural][itemKey]) {
				setItem(state[itemCategoryNameInThePlural][itemKey]);
				console.log(
					`The ${itemCategoryNameInTheSingular} with the key ${itemKey} is in	${itemCategoryNameInThePlural}, so there's no need to fetch it.`
				);
			} else {
				setItem();
				console.log(
					`There is no ${itemCategoryNameInTheSingular} with the key ${itemKey} in ${itemCategoryNameInThePlural}...`
				);
			}
		}
	}, [state]);

	if (!state.user) return <p>You need to be logged to see this page!</p>;

	if (!item)
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
				item={item}
				itemKey={itemKey}
				itemCategoryNameInThePlural={itemCategoryNameInThePlural}
				itemCategoryNameInTheSingular={itemCategoryNameInTheSingular}
			/>
		</div>
	);
}
