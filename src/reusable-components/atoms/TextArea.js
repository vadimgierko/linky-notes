export default function TextArea({
	id,
	value,
	placeholder,
	onChange,
	className,
}) {
	return (
		<textarea
			id={id}
			className={className}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}
