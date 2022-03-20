import { useStore } from "../../store/Store";
import Form from "../../reusable-components/organisms/Form";
import addSource from "../../logic/source/addSource";
import { useEffect, useState } from "react";

// FORM_STRUCTURE should be a javascript object,
// but if you want to do some computations to generate some values
// you can wrap this object in a function, which will generate & return form structure object.
// generateFormStructure() function is an example of such function
// & was needed to generate options for the author select form control based on state.authors
// that's why it recieves state object via argument.
// Also this is the only one way to make it possible, because we need to wait until the state will be fetched
// & then generateFormStructure() will be called inside useEffect hook in <AddSource /> component

const generateFormStructure = (state) => {
	const FORM_STRUCTURE = {
		author: {
			// select author:
			type: "select",
			options: generateAuthorOptions(state),
			// forNew: {
			// 	firstName: {
			// 		formControl: {
			// 			type: "input",
			// 			props: {
			// 				type: "text",
			// 				value: "",
			// 				placeholder: "first name",
			// 			},
			// 		},
			// 	},
			// 	middleName: {
			// 		formControl: {
			// 			type: "input",
			// 			props: {
			// 				type: "text",
			// 				value: "",
			// 				placeholder: "middle name",
			// 			},
			// 		},
			// 	},
			// 	lastName: {
			// 		formControl: {
			// 			type: "input",
			// 			props: {
			// 				type: "text",
			// 				value: "",
			// 				placeholder: "last name",
			// 			},
			// 		},
			// 	},
			// },
		},
		title: {},
		subtitle: {},
		description: {
			type: "textarea",
			placeholder: "write a few words about this source here",
		},
		publisher: {},
		placeOfPublication: {
			label: "place of publication",
			placeholder: "place of publication",
		},
		yearOfPublication: {
			label: "year of publication",
			placeholder: "year of publication",
		},
	};

	function generateAuthorOptions(state) {
		{
			if (state.authors) {
				console.log("I'm working! Authors:", state.authors);
				let selectOptions = {};
				if (state.authors) {
					Object.keys(state.authors).forEach((key) => {
						selectOptions = {
							...selectOptions,
							[key]: `${state.authors[key].firstName} ${state.authors[key].lastName}`,
						};
						console.log("selectOptions:", selectOptions);
					});
				}
				return selectOptions;
			} else {
				console.log("fuck");
			}
		}
	}

	return FORM_STRUCTURE;
};

export default function AddSource() {
	const { state, dispatch } = useStore();
	const [formStructure, setFormStructure] = useState();

	function handleSubmit(item) {
		console.log("data passed to handleSubmit:", item);
		//addSource(item, state.user.id, dispatch);
	}

	useEffect(() => {
		setFormStructure(generateFormStructure(state));
		console.log("state:", state);
	}, [state]);

	// if (!state.user)
	// 	return (
	// 		<p className="add-source-page">
	// 			You need to be logged to add a source...
	// 		</p>
	// 	);

	return (
		<div className="add-source-page">
			<div className="add-source-form">
				<Form
					structure={formStructure}
					data={null}
					formTitle="Add new source"
					submitText="add a source" // the text for the submit button
					onSubmit={handleSubmit}
					//link="/sources" // add link, if you want to submit item be a link button
				/>
			</div>
		</div>
	);
}
