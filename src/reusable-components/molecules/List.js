/**
 * Reusable, Customisable & Flexible List Component
 * (designed to primarily work with lists, which are objects (not arrays) in the form of objects, containing objects in them)
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
 *
 * QA:
 * Q: WHAT IF SOMEONE WANT TO RENDER SIMPLE DIVS OR PARAGRAPHS? DOES HE NEED TO BUILD & PASS SPECIAL COMPONENT?
 * A:
 *
 * Q: WHAT IF WE WANT TO RENDER AN ARRAY of strings?
 * A: It renders, but in column like a list (TO DO by VG: try to let customize layout).
 *
 * Q: WHAT IF WE DON'T WANT TO PASS OBJECTS, BUT PRIMITIVES, LIKE strings or numbers?
 * A: You should put them into the array & then pass the array as an items prop.
 * (key is index, string is like a prop for index) => so if someone want to render numbers, strings etc, let render an array)
 *
 * Q: WHAT IF OUR LIST IS AN ARRAY, WHICH CONTAINS OBJECTS?
 * A: don't know yet, but then we our keys are indexes,
 * so we later cannot render those keys, because they have no sense,
 * maybe then put keys as an id prop in objects, but what then?
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
