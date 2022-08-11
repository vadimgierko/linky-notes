import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../contexts/useTheme";
// react-bootstrap components:
import { Form, Button } from "react-bootstrap";

export default function SourceForm({ sourceKey, onSubmit = (f) => f }) {
	const { theme } = useTheme();
	// this is needed, when adding new author & navigating back with new author key
	// NOTE: state also consist redirectedFrom & passedNoteObject,
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
				setSource({
					...SOURCES[sourceKey],
					title: SOURCES[sourceKey].title,
					authorKey: SOURCES[sourceKey].authorKey,
					yearOfPublishing: SOURCES[sourceKey].yearOfPublishing,
					link: SOURCES[sourceKey].link,
				});
			}
		} else {
			setSource({
				// TODO: there are the basic props, need to rethink & expand:
				// props grouped by type of source ??
				title: "",
				//subTitle: "",
				authorKey: "", // author's data will be fetched by author's key from the store
				//type: "", // book, article (from a book, journal, blog)
				// placeOfPublishing: "",
				yearOfPublishing: "",
				// dateOfPublishing: "",
				link: "",
			});
		}
	}, [sourceKey, SOURCES]);

	useEffect(() => {
		console.log("SourceForm state from useLocation:", state);
		if (state && state.newAuthorKey && state.passedSource) {
			setSource({ ...state.passedSource, authorKey: state.newAuthorKey });
		}
	}, [state]);

	useEffect(() => {
		console.log("SourceForm pathname from useLocation:", pathname);
	}, [pathname]);

	if (!source) return null;

	return (
		<div
			style={{
				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
				color: theme === "light" ? "black" : "white",
			}}
		>
			<h1 className="text-center mb-3">
				{sourceKey ? "Update source!" : "Add source!"}
			</h1>
			<Form
				className="border border-secondary rounded p-3 shadow"
				onSubmit={(e) => onSubmit(e, source)}
			>
				<Form.Group className="mb-3">
					<Form.Label>Title:</Form.Label>
					<Form.Control
						placeholder="Input source's title"
						value={source.title}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
						onChange={(e) =>
							setSource({
								...source,
								title: e.target.value,
							})
						}
					/>
				</Form.Group>

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
						<option>Select author</option>
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

				<Form.Group className="mb-3">
					<Form.Label>Link:</Form.Label>
					<Form.Control
						placeholder="copy full link (URL) of source here"
						value={source.link}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
						onChange={(e) =>
							setSource({
								...source,
								link: e.target.value,
							})
						}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Year of publishing:</Form.Label>
					<Form.Control
						placeholder="input source's year of publishing"
						value={source.yearOfPublishing}
						style={{
							backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
							color: theme === "light" ? "black" : "white",
						}}
						onChange={(e) =>
							setSource({
								...source,
								yearOfPublishing: e.target.value,
							})
						}
					/>
				</Form.Group>

				<div className="d-grid my-2">
					<Button variant="success" type="submit">
						{sourceKey ? "Update source" : "Add source"}
					</Button>
				</div>
			</Form>
		</div>
	);
}
