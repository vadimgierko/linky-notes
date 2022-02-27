import { useTheme } from "../../hooks/use-theme";
import ItemCard from "../molecules/ItemCard";

export default function ItemsList({ items }) {
	const { theme } = useTheme();

	if (!items) return <p>There are no items so far...</p>;

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
		>
			<div>
				{Object.entries(items)
					.slice()
					.reverse()
					.map((itemArray) => {
						const itemKey = itemArray[0];
						const item = itemArray[1];
						return (
							<ItemCard
								key={"item-" + itemKey}
								item={item}
								itemKey={itemKey}
							/>
						);
					})}
			</div>
		</div>
	);
}
