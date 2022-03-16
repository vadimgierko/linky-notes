import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import Card from "../../reusable-components/molecules/Card";

/*
Source Page is just a copy of Item Page...
=> TO DO: create template
*/

export default function Source() {
	const { theme } = useTheme();
	const { state } = useStore();

	const { itemKey } = useParams();

	const [item, setItem] = useState();

	useEffect(() => {
		if (state.sources) {
			if (state.sources[itemKey]) {
				setItem(state.sources[itemKey]);
				console.log(
					"The source with the key",
					itemKey,
					"is in sources, so there's no need to fetch it."
				);
			} else {
				setItem();
				console.log("There is no source with the key", itemKey, "in items.");
			}
		}
	}, [state]);

	if (!item) return <p>Loading source or there is no such source...</p>;

	return (
		<div
			className="source-page"
			style={{
				background: theme.background,
				color: theme.color,
			}}
		>
			<Card
				item={item}
				itemKey={itemKey}
				itemCategoryNameInThePlural="sources"
				itemCategoryNameInTheSingular="source"
			/>
		</div>
	);
}
