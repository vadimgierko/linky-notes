import { useStore } from "../../store/Store";
import Form from "../../reusable-components/organisms/Form";
import addToDatabase from "../../logic/crud/addToDatabase";

const FORM_STRUCTURE = {
	author: {
		firstName: {
			placeholder: "first name",
		},
		middleName: {
			placeholder: "middle name",
		},
		lastName: {
			placeholder: "last name",
		},
	},
	title: {},
	subtitle: {},
	publisher: {},
	placeOfPublication: {
		placeholder: "place of publication",
	},
	yearOfPublication: {
		placeholder: "year of publication",
	},
};

export default function AddSource() {
	const { state, dispatch } = useStore();

	function handleSubmit(item) {
		console.log("data passed to handleSubmit:", item);
		addToDatabase("source", "sources", item, state.user.id, dispatch);
	}

	if (!state.user)
		return (
			<p className="add-source-page">
				You need to be logged to add a source...
			</p>
		);

	return (
		<div className="add-source-page">
			<div className="add-source-form">
				<Form
					structure={FORM_STRUCTURE}
					data={null}
					submitText="add a source" // the text for the submit button
					onSubmit={handleSubmit}
					//link="/sources" // add link, if you want to submit item be a link button
				/>
			</div>
		</div>
	);
}
