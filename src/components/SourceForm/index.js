import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

// FORM_STRUCTURE consists only inputs after select author
const FORM_STRUCTURE = {
	title: {
		label: "Title",
		placeholder: "Input source's title",
	},
	placeOfPublishing: {
		label: "Place of publishing",
		placeholder: "Input source's place of publishing",
	},
	yearOfPublishing: {
		label: "Year of publishing",
		placeholder: "Input source's year of publishing",
	},
	link: {
		label: "Link",
		placeholder: "Copy full link (URL) of source here",
	},
};

const INIT_SOURCE_SCHEMA = {
	title: "",
	authorKey: "", // author's data will be fetched by author's key from the store
	placeOfPublishing: "",
	yearOfPublishing: "",
	link: "",
};

export default function SourceForm({ sourceKey, onSubmit = (f) => f }) {
	const { theme } = useTheme();
	// this is needed, when adding new author & navigating back with new author key
	// NOTE: state also consist initRedirectedFrom & passedNote,
	// when adding new source & navigating back to NoteForm with new source key.
	// This is cascading navigation, so we can add note with new source, which has a new author
	const { state, pathname } = useLocation();
	const SOURCES = useSelector((state) => state.sources.value);
	const AUTHORS = useSelector((state) => state.authors.value);
	const [source, setSource] = useState();

	useEffect(() => {
		if (sourceKey) {
			if (Object.keys(SOURCES).length) {
				// if sourceKey was passed,
				// it means that we are updating the existing source,
				// so we need to fetch it from the store:
				const fillSourceSchemaWithData = () => {
					let item = {};
					Object.keys(INIT_SOURCE_SCHEMA).forEach(
						(key) => (item = { ...item, [key]: SOURCES[sourceKey][key] || "" })
					);
					return {
						...SOURCES[sourceKey],
						...item,
					};
				};
				setSource(fillSourceSchemaWithData());
			}
		} else {
			setSource(INIT_SOURCE_SCHEMA);
		}
	}, [sourceKey, SOURCES]);

	useEffect(() => {
		if (state && state.newAuthorKey && state.passedSource) {
			setSource({ ...state.passedSource, authorKey: state.newAuthorKey });
		}
	}, [state]);

	if (!source) return null;

	return (
		<>
			<h1 className="text-center mb-3">
				{sourceKey ? "Update source!" : "Add source!"}
			</h1>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => onSubmit(e, source)}
			>
				{/**======================== SELECT AUTHOR ======================== */}
				<Form.Group className="mb-3">
					<Form.Label>Author:</Form.Label>
					<Form.Select
						value={source.authorKey || ""}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
						onChange={(e) =>
							setSource({
								...source,
								authorKey: e.target.value,
							})
						}
					>
						<option value="">Select author</option>
						{Object.keys(AUTHORS).length
							? Object.keys(AUTHORS).map((id) => (
									<option key={id} value={id}>
										{AUTHORS[id].names.full}
									</option>
							  ))
							: null}
					</Form.Select>
					{state && state.initRedirectedFrom && state.passedNote ? (
						<Link
							to="/add-author"
							state={{
								// state from /add/update-note:
								initRedirectedFrom: state.initRedirectedFrom,
								passedNote: state.passedNote,
								// state from add-source:
								redirectedFrom: pathname,
								passedSource: source,
							}}
						>
							...or add new one author to database
						</Link>
					) : (
						<Link
							to="/add-author"
							state={{ redirectedFrom: pathname, passedSource: source }}
						>
							...or add new one author to database
						</Link>
					)}
				</Form.Group>

				{/**======================== INPUTS ========================*/}
				{Object.keys(FORM_STRUCTURE).map((formKey) => (
					<Form.Group className="mb-3" key={formKey}>
						<Form.Label>{FORM_STRUCTURE[formKey].label}:</Form.Label>
						<Form.Control
							placeholder={FORM_STRUCTURE[formKey].placeholder}
							value={source[formKey]}
							style={{
								backgroundColor:
									theme === "light" ? "white" : "rgb(13, 17, 23)",
								color: theme === "light" ? "black" : "white",
							}}
							onChange={(e) =>
								setSource({
									...source,
									[formKey]: e.target.value,
								})
							}
						/>
					</Form.Group>
				))}

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						{sourceKey ? "Update source" : "Add source"}
					</Button>
				</div>
			</Form>
		</>
	);
}
