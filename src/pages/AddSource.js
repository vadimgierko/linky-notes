import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// thunks:
import { addSource } from "../thunks/sources/addSource";
// helper functions:
import generateFirebaseKeyFor from "../firebase-rtdb-crud/generateFirebaseKeyFor";
// custom components:
import SourceForm from "../components/SourceForm";

export default function AddSource() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();

	function handleSubmit(e, source) {
		e.preventDefault();
		console.log("Source to add:", source);
		const newKey = generateFirebaseKeyFor("sources/" + user.id);
		dispatch(addSource({ source: source, key: newKey })).then(() => {
			// conditional navigating depends on redirected from route:
			if (state && state.initRedirectedFrom && state.passedNote) {
				// if we were initially redirected from add/update-note,
				// pass back all acumulated state && new author key (newKey):
				// navigate back to SourceForm &
				// pass new author key & pass back passedSource
				// to complete the previously completed form:
				navigate(state.initRedirectedFrom, {
					state: {
						// pass to add/update-note:
						passedNote: state.passedNote,
						newSourceKey: newKey,
					},
					replace: true,
				});
			} else {
				// if the source was added after "add note" button click
				// redirect to /sources:
				navigate("/sources", { replace: true });
			}
		});
	}

	return <SourceForm onSubmit={handleSubmit} />;
}
