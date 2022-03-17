import ItemsPage from "../../reusable-components/pages/ItemsPage";
import Card from "../../reusable-components/molecules/Card";

export default function Authors() {
	return (
		<ItemsPage
			itemCategoryNameInTheSingular="author"
			itemCategoryNameInThePlural="authors"
			RenderComponent={Card}
		/>
	);
}
