import ItemsPage from "../../reusable-components/pages/ItemsPage";
import Card from "../../reusable-components/molecules/Card";

export default function Sources() {
	return (
		<ItemsPage
			itemCategoryNameInTheSingular="source"
			itemCategoryNameInThePlural="sources"
			RenderComponent={Card}
		/>
	);
}
