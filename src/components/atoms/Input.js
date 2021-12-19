import { useTheme } from "../../hooks/use-theme";

export default function Input({ defaultValue, placeholder, handleChange }) {
    // takes default value & handle change => pass inputed value
    const { theme } = useTheme();
    return (
        <input
            type="text"
            className={"form-control mb-2 + bg-" + theme.mode + " text-" + (theme.mode === "dark" ? "light" : "dark")}
            defaultValue={defaultValue}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
}