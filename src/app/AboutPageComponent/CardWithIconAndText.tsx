import { Card } from "./types";

type CardWithIconAndTextProps = {
    card: Card
    isTech: boolean
}

export default function CardWithIconAndText({ card, isTech }: CardWithIconAndTextProps) {
    if (!card) return null;

    return (
        <div className={`text-center card-with-icon-and-text ${isTech && "tech-card"}`}>
            {card.icon}
            {card.header && <h5>{card.header}</h5>}
            {card.paragraph && <p>{card.paragraph}</p>}
        </div>
    );
}