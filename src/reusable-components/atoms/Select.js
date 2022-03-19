export default function Select({
	id,
	options = {},
	value = "",
	className,
	onChange = (e) => console.log(e.target.value),
}) {
	// options will be an object type: {
	//     optionKey: optionValue,
	// }
	return (
		<select className={className} id={id} value={value} onChange={onChange}>
			{Object.keys(options).map((key) => (
				<option key={key} value={key}>
					{options[key]}
				</option>
			))}
		</select>
	);
}
