// import { useEffect, useState } from "react";
// import SourceForm from "../organisms/SourceForm";
// import { useDatabase } from "../../hooks/use-database";

// export default function AddSource() {
// 	const { sources, addSource } = useDatabase();
// 	const { user } = useAuth();

// 	const [item, setItem] = useState(null);

// 	function onFormSubmit(updatedItem) {
// 		addSource(updatedItem);
// 	}

// 	useEffect(() => {
// 		if (item) {
// 			console.log("item in AddSourcePage:", item);
// 		}
// 	}, [item]);

// 	return (
// 		<div>
// 			{user && user.uid ? (
// 				<div>
// 					<SourceForm
// 						item={item}
// 						handleSubmit={onFormSubmit}
// 						headerText="Add new source!"
// 						buttonText="Add new source"
// 					/>
// 				</div>
// 			) : (
// 				<h3>You need to log in to add a source...</h3>
// 			)}
// 		</div>
// 	);
// }
