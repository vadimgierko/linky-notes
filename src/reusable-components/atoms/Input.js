export default function Input({
	id,
	className = "form-control",
	type = "text",
	value = "",
	placeholder = "type something",
	onChange = (e) => console.log(e.target.value),
}) {
	return (
		<input
			id={id}
			className={className}
			type={type}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
