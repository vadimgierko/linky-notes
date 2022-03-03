import { useTheme } from "../../../hooks/use-theme";

export default function TagSearchFormInput({ inputValue, handleChange }) {
	const { theme } = useTheme();

	return (
		<input
			type="text"
			className={
				"form-control mb-2 + bg-" +
				theme.mode +
				" text-" +
				(theme.mode === "dark" ? "light" : "dark")
			}
			value={inputValue}
			placeholder="type some tag"
			onChange={handleChange}
		/>
	);
}
