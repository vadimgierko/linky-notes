import { useTheme } from "../../hooks/use-theme";
import { useStore } from "../../store/Store";
import TrashIconButton from "../atoms/TrashIconButton";
import PencilIconButton from "../atoms/PencilIconButton";
import EyeIconButton from "../atoms/EyeIconButton";

export default function Sources() {
	const { theme } = useTheme();
	const { state } = useStore(); // need when uncomment checking if user is logged

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
			<List items={state.sources} />
		</div>
	);
}

//========================= SUB COMPONENTS =============== EXPERIMENTAL:

function List({ items }) {
	if (!items || !Object.entries(items).length)
		return (
			<p className="list">
				There are no items in the list or the're loading now...
			</p>
		);

	return (
		<ul style={{ listStyle: "none" }}>
			{Object.keys(items).map((key) => (
				<li key={key}>
					<Card
						item={items[key]}
						itemKey={key}
						content={
							<>
								{Object.keys(items[key]).map((subkey) => {
									return Object.entries(items[key][subkey]).length > 1 ? (
										<div key={subkey}>
											<h3>{subkey}:</h3>
											{Object.keys(items[key][subkey]).map((subsubkey) => (
												<p key={subsubkey}>
													{subsubkey}: {items[key][subkey][subsubkey]}
												</p>
											))}
										</div>
									) : (
										<p key={subkey}>
											{subkey}: {items[key][subkey]}
										</p>
									);
								})}
							</>
						}
					/>
				</li>
			))}
		</ul>
	);
}

function Card({ item, itemKey, content }) {
	const { theme } = useTheme();

	return (
		<div
			className={
				"item-card card mb-2 shadow bg-" +
				theme.mode +
				(theme.mode === "dark" ? " border-secondary" : "")
			}
		>
			<div className="card-header">
				<div className="row">
					<div className="col text-muted">
						{item.createdAt} {item.updatedAt ? "/ " + item.updatedAt : null}
					</div>
					<div className="col text-end">
						<EyeIconButton link={"/sources/" + itemKey} />
						<PencilIconButton link={"/sources/update-source/" + itemKey} />
						<TrashIconButton
							handleOnTrashButtonClick={
								() => alert("There is no delete function for this item ;-)")
								//deleteItem(itemKey, state.user.id, dispatch)
							}
						/>
					</div>
				</div>
			</div>
			<div className="card-body">{content}</div>
			<div className="card-footer text-muted"></div>
		</div>
	);
}
