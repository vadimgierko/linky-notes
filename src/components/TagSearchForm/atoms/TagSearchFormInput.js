import { useTheme } from "../../../contexts/useTheme";

export default function TagSearchFormInput({ inputValue, handleChange }) {
	const { theme } = useTheme();

	return (
		<input
			type="text"
			className={
				"form-control mb-2 + bg-" +
				theme +
				" text-" +
				(theme === "dark" ? "light" : "dark")
			}
			value={inputValue}
			placeholder="type some tag"
			onChange={handleChange}
		/>
	);
}
