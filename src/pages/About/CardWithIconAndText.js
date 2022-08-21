export default function CardWithIconAndText({ card, cardStyle }) {
	if (!card) return null;

	return (
		<div className="text-center" style={cardStyle}>
			{card.icon}
			{card.header && <h5>{card.header}</h5>}
			{card.paragraph && <p>{card.paragraph}</p>}
		</div>
	);
}
