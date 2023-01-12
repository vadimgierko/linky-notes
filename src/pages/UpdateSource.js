// import { useDispatch } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// // custom components:
// import SourceForm from "../components/SourceForm";
// // thunks:
// import { updateSource } from "../thunks/sources/updateSource";

// export default function UpdateSource() {
// 	const { itemKey } = useParams();
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();

// 	function handleSubmit(e, source) {
// 		e.preventDefault();
// 		//console.log("Source to update:", source);
// 		if (source.title.length || source.link.length || source.authorKey.length) {
// 			dispatch(updateSource({ source: source, key: itemKey })).then(() =>
// 				navigate("/sources", { replace: true })
// 			);
// 		} else {
// 			alert(
// 				"Source can not be saved, because there is no title or link or author added to the source. Add one of these things to save the source"
// 			);
// 		}
// 	}

// 	function handleCancel() {
// 		navigate("/sources", { replace: true });
// 	}

// 	return (
// 		<SourceForm
// 			sourceKey={itemKey}
// 			onSubmit={handleSubmit}
// 			onCancel={handleCancel}
// 		/>
// 	);
// }
