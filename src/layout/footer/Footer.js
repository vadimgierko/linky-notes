import { Container } from "react-bootstrap";

export default function Footer({ maxWidth }) {
	return (
		<Container
			as="footer"
			style={{
				color: "grey",
				maxWidth: maxWidth,
			}}
		>
			<hr />
			<p className="text-center mb-0 pb-3">
				&copy; 2021-2022{" "}
				<a
					href="https://github.com/vadimgierko"
					target="_blank"
					rel="noreferrer"
					style={{ textDecoration: "none" }}
				>
					Vadim Gierko
				</a>
			</p>
		</Container>
	);
}
