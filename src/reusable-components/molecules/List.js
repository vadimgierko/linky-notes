/**
 * Reusable, customisable & flexible List component.
 *
 * Props:
 * - items {} (object containing list of objects)
 * - ListItemComponent </> (any component we want to render as list item; passed without props => add props while mapping items)
 * - itemCategoryNameInThePlural "" (needed for creating a link & conditional rendering in any <ListItemComponent />)
 * - itemCategoryNameInTheSingular "" (needed for creating a link & conditional rendering in any <ListItemComponent />)
 * - listStyle "" ("none" by default)
 *
 * NOTE:
 *
 * When you pass some custom ListItemComponent via props (for example Card or primitive/html tag like p or div)
 * be aware that it must have props mentioned below:
 * - item {}
 * - itemKey ""
 * - itemCategoryNameInThePlural
 * - itemCategoryNameInTheSingular
 * otherwise the component will be rendered with errors or not be rendered at all
 *
 * listStyle:
 * - the list is unstyled (no bullets) by default + no paddingLeft
 * - if you want unstyled list with no default paddinLeft, ommit listStyle prop or pass listStyle = "none"
 * - possible values: "number", "disc", "square" etc.; when applied => paddingLeft will be set to 2rem automatically
 */

export default function List({
	items,
	ListItemComponent,
	itemCategoryNameInThePlural,
	itemCategoryNameInTheSingular,
	listStyle = "none",
}) {
	if (!items || !Object.entries(items).length)
		return (
			<p className="list">
				There are no items in the list or the're loading now...
			</p>
		);

	return (
		<ul
			style={{
				listStyle: listStyle,
				paddingLeft: listStyle === "none" ? 0 : "2rem",
			}}
			className={itemCategoryNameInThePlural + "-list"}
		>
			{Object.keys(items).map((key) => (
				<li key={key} className={itemCategoryNameInThePlural + "-list-item"}>
					<ListItemComponent
						item={items[key]}
						itemKey={key}
						itemCategoryNameInThePlural={itemCategoryNameInThePlural}
						itemCategoryNameInTheSingular={itemCategoryNameInTheSingular}
					/>
				</li>
			))}
		</ul>
	);
}
