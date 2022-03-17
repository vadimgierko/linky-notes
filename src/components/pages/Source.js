import { useParams } from "react-router-dom";
import ItemPage from "../../reusable-components/pages/ItemPage";
import Card from "../../reusable-components/molecules/Card";

export default function Source() {
	const { itemKey } = useParams();

	if (!itemKey) return <p>Getting source key from the link...</p>;

	return (
		<ItemPage
			itemCategoryNameInTheSingular="source"
			itemCategoryNameInThePlural="sources"
			itemKey={itemKey}
			RenderComponent={Card}
		/>
	);
}
