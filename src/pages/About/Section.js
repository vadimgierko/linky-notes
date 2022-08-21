import CardWithIconAndText from "./CardWithIconAndText";

export default function Section({ header, cardsList = [], cardStyle = {} }) {
	if (!cardsList.length) return null;

	return (
		<section className="mb-5">
			<hr />
			<h2 className="text-center mb-3">{header}</h2>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					//maxWidth: 577,
					margin: "auto",
					textAlign: "center",
					justifyContent: "center",
				}}
			>
				{cardsList.map((card, i) => (
					<CardWithIconAndText
						key={"card-" + i}
						card={card}
						cardStyle={cardStyle}
					/>
				))}
			</div>
		</section>
	);
}
