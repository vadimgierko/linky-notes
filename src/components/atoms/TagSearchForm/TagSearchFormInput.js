import { useTheme } from "../../../hooks/use-theme";

export default function TagSearchFormInput({ defaultValue, handleChange }) {
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
			defaultValue={defaultValue}
			placeholder="type some tag"
			onChange={(e) => handleChange(e.target.value)}
		/>
	);
}
