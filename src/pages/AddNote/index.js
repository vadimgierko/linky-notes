// import { useSelector } from "react-redux";
// import { useTheme } from "../../contexts/useTheme";
// import ItemForm from "../organisms/ItemForm";

// export default function AddItem() {
// 	const { theme } = useTheme();
// 	const user = useSelector((state) => state.user.value);

// 	if (!user.id) return <p>You need to log in to add an item...</p>;

// 	return (
// 		<div
// 			className="add-item-page"
// 			style={{
// 				backgroundColor: theme === "light" ? "white" : "rgb(13, 17, 23)",
// 				color: theme === "light" ? "black" : "white",
// 			}}
// 		>
// 			<ItemForm />
// 		</div>
// 	);
// }
