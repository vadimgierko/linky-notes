import CardWithIconAndText from "./CardWithIconAndText";

export default function Section({ header, cardsList = [] }) {
	if (!cardsList.length) return null;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				maxWidth: 577,
				margin: "auto",
				textAlign: "center",
				justifyContent: "center",
			}}
		>
			<h2 className="text-center mb-3">{header}</h2>
			{cardsList.map((card, i) => (
				<CardWithIconAndText key={"card-" + i} card={card} />
			))}
		</div>
	);
}
