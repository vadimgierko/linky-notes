import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// custom components:
import AuthorForm from "../components/AuthorForm";
// thunks:
import { addAuthor } from "../thunks/authors/addAuthor";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";

export default function AddAuthor() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();

	function handleSubmit(e, author) {
		e.preventDefault();
		//console.log("Author to add:", author);
		const newKey = generateFirebaseKeyFor("authors/" + user.id);

		dispatch(addAuthor({ author: author, key: newKey })).then(() => {
			// conditional navigating depends on redirected from route:
			if (state && state.initRedirectedFrom && state.passedNote) {
				// if we were initially redirected from add/update-note,
				// pass back all acumulated state && new author key (newKey):
				// navigate back to SourceForm &
				// pass new author key & pass back passedSource
				// to complete the previously completed form:
				navigate(state.redirectedFrom, {
					state: {
						// pass to add/update-note via add-source:
						initRedirectedFrom: state.initRedirectedFrom,
						passedNote: state.passedNote,
						// pass to add-source:
						passedSource: state.passedSource,
						newAuthorKey: newKey,
					},
					replace: true,
				});
			} else if (state && state.redirectedFrom && state.passedSource) {
				// if we were initially redirected from add/update-source,
				// pass back state.redirectedFrom && state.passedSource
				// && new author key (newKey):
				navigate(state.redirectedFrom, {
					state: {
						passedSource: state.passedSource,
						newAuthorKey: newKey,
					},
					replace: true,
				});
			} else {
				// if the author was added after "add author" button click
				// redirect to /authors:
				navigate("/authors", { replace: true });
			}
		});
	}

	function handleCancel() {
		// conditional navigating depends on redirected from route:
		if (state && state.initRedirectedFrom && state.passedNote) {
			// if we were initially redirected from add/update-note,
			// pass back all acumulated state && new author key (newKey):
			// navigate back to SourceForm &
			// pass new author key & pass back passedSource
			// to complete the previously completed form:
			navigate(state.redirectedFrom, {
				state: {
					// pass to add/update-note via add-source:
					initRedirectedFrom: state.initRedirectedFrom,
					passedNote: state.passedNote,
					// pass to add-source:
					passedSource: state.passedSource,
					newAuthorKey: "",
				},
				replace: true,
			});
		} else if (state && state.redirectedFrom && state.passedSource) {
			// if we were initially redirected from add/update-source,
			// pass back state.redirectedFrom && state.passedSource
			// && new author key (newKey):
			navigate(state.redirectedFrom, {
				state: {
					passedSource: state.passedSource,
					newAuthorKey: "",
				},
				replace: true,
			});
		} else {
			// if the author was added after "add author" button click
			// redirect to /authors:
			navigate("/authors", { replace: true });
		}
	}

	return <AuthorForm onSubmit={handleSubmit} onCancel={handleCancel} />;
}
