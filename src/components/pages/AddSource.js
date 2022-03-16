import { useStore } from "../../store/Store";
import Form from "../../reusable-components/organisms/Form";
import addSource from "../../logic/source/addSource";

const FORM_STRUCTURE = {
	//=========================== future of Form structure:
	//===== issue... what if we want put input, input, select, input, texarea etc. how to order them?
	// inputs: {
	// 	// there will be previous rules of the form structure, because it cared only about inputs
	// 	author: {
	// 		firstName: {
	// 			placeholder: "first name",
	// 		},
	// 		middleName: {
	// 			placeholder: "middle name",
	// 		},
	// 		lastName: {
	// 			placeholder: "last name",
	// 		},
	// 	},
	// 	title: {},
	// 	subtitle: {},
	// 	publisher: {},
	// 	placeOfPublication: {
	// 		placeholder: "place of publication",
	// 	},
	// 	yearOfPublication: {
	// 		placeholder: "year of publication",
	// 	},
	// },
	// textareas: {},
	// selects: {},
	// buttons: {
	// 	submit: {
	// 		callToAction: "add source",
	// 		link: "/sources",
	// 	},
	// },

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
		//console.log("data passed to handleSubmit:", item);
		addSource(item, state.user.id, dispatch);
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
