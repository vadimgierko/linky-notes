import CardWithIconAndText from "./CardWithIconAndText";
import { Card } from "./types";

type SectionProps = {
	header: string, cardsList: Card[],
	isTech: boolean
}
export default function Section(
    { header, cardsList = [], isTech} :
    SectionProps
) {
	if (!cardsList.length) return null;

	return (
		<section className="mb-3">
			<hr />
			<h2 className="text-center my-5">{header}</h2>
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
						isTech={isTech}
					/>
				))}
			</div>
		</section>
	);
}