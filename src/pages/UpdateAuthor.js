// import { useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// // custom components:
// import AuthorForm from "../components/AuthorForm";
// // thunks:
// import { updateAuthor } from "../thunks/authors/updateAuthor";

// export default function UpdateAuthor() {
// 	const { itemKey } = useParams();
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	function handleSubmit(e, author) {
// 		e.preventDefault();
// 		//console.log("Author to update:", author);
// 		dispatch(updateAuthor({ author: author, key: itemKey })).then(() =>
// 			navigate("/authors", { replace: true })
// 		);
// 	}

// 	function handleCancel() {
// 		navigate("/authors", { replace: true });
// 	}

// 	return (
// 		<AuthorForm
// 			authorKey={itemKey}
// 			onSubmit={handleSubmit}
// 			onCancel={handleCancel}
// 		/>
// 	);
// }
