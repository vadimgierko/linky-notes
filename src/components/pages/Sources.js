import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import List from "../../reusable-components/molecules/List";

export default function Sources() {
	const { theme } = useTheme();
	const { state } = useStore();

	if (!state.user) return <p>You need to be logged to see your items!</p>;
	if (!state.sources || !Object.entries(state.sources).length)
		return (
			<p className="sources-page">
				There are no sources in the store yet or the're loading now...
			</p>
		);

	return (
		<div
			style={{
				background: theme.background,
				color: theme.color,
			}}
			className="sources-page"
		>
			<div className="sources-list">
				<List items={state.sources} renderComponent="card" />
			</div>
		</div>
	);
}
