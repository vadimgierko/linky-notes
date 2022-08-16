export default function CardWithIconAndText({ card }) {
	if (!card) return null;

	return (
		<div
			className="text-center"
			style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
		>
			{card.icon}
			{card.header && <h5>{card.header}</h5>}
			{card.paragraph && <p>{card.paragraph}</p>}
		</div>
	);
}
