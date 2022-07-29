import { useTheme } from "../../contexts/useTheme";

export default function Footer() {
	const { theme } = useTheme();

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "grey" : "white",
			}}
		>
			<hr />
			<p className="text-center mb-0 pb-3">
				&copy; 2021-2022{" "}
				<a
					href="https://github.com/vadimgierko"
					target="_blank"
					style={{ textDecoration: "none" }}
				>
					Vadim Gierko
				</a>
			</p>
		</div>
	);
}
