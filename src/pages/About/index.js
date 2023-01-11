import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "./Section";
// functions that add iconProps to icons & return lists with card data:
import generateTechnologies from "./generateTechnologies";
import generateFeatures from "./generateFeatures";
// react-bootstrap components:
import Button from "react-bootstrap/Button";

export default function About() {
	const [windowSize, setWindowSize] = useState(window.innerWidth);
	const navigate = useNavigate();
	const [iconProps, setIconProps] = useState();
	const [sections, setSections] = useState([]);

	useEffect(() => {
		window.addEventListener("resize", () => {
			const size = window.innerWidth;
			setWindowSize(size);
		});
	}, []);

	useEffect(() => {
		// define icons props:
		const size = windowSize > 576 ? 80 : 50;
		const style = { margin: "0.5em" };
		const props = { style, size };
		setIconProps(props);
	}, [windowSize]);

	useEffect(() => {
		if (iconProps) {
			const TECHNOLOGIES = generateTechnologies(iconProps);
			const FEATURES = generateFeatures(iconProps);
			setSections([
				{
					header: "What you can do with linky_notes",
					cardsList: FEATURES,
					cardStyle: {
						padding: "0.5em",
						width: windowSize > 576 ? "33%" : "50%",
					},
				},
				{
					header: "Technologies used to build the app",
					cardsList: TECHNOLOGIES,
					cardStyle: {
						marginLeft: "1em",
						marginRight: "1em",
					},
				},
			]);
		}
	}, [iconProps]);

	return (
		<div className="text-center">
			<header>
				<h1 className="my-3" style={{ fontSize: windowSize > 576 ? 50 : 40 }}>
					Welcome to linky_notes!
				</h1>
				<p className="mb-5" style={{ fontSize: windowSize > 576 ? 20 : 16 }}>
					Build your easy to filter knowledge base & store, organize & filter
					your notes by tags!
				</p>
				<Button
					className="mb-5 me-3"
					variant="success"
					size={windowSize > 576 ? "lg" : "md"}
					onClick={() => navigate("/signin")}
				>
					Sign In
				</Button>
				<Button
					className="mb-5"
					variant="primary"
					size={windowSize > 576 ? "lg" : "md"}
					onClick={() => navigate("/signup")}
				>
					Sign Up
				</Button>
			</header>
			{sections.length
				? sections.map((section, i) => (
						<Section
							key={"section-" + i}
							header={section.header}
							cardsList={section.cardsList}
							cardStyle={section.cardStyle}
						/>
				  ))
				: null}
		</div>
	);
}
