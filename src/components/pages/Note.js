import { useParams } from "react-router-dom";
import ItemPage from "../../reusable-components/pages/ItemPage";
import Card from "../../reusable-components/molecules/Card";

export default function Note() {
	const { itemKey } = useParams();

	if (!itemKey) return <p>Getting item key from the link...</p>;

	return (
		<ItemPage
			itemCategoryNameInTheSingular="item"
			itemCategoryNameInThePlural="items"
			itemKey={itemKey}
			RenderComponent={Card}
		/>
	);
}
