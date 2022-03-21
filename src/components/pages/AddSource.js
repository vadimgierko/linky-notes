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
		//==================================== form structure items (each key object = item):
		author: {
			type: "subform",
			subform: {
				firstName: {
					label: "author's first name",
					placeholder: "author's first name",
				},
				middleName: {
					label: "author's middle name",
					placeholder: "author's middle name",
				},
				lastName: {
					label: "author's last name",
					placeholder: "author's last name",
				},
			},
		},
		// author: {
		// 	// select author:
		// 	type: "select",
		// 	options: generateAuthorOptions(state),
		// 	forNewOption: {
		// 		// this prop is only for select:
		// 		// here you can define what props (structure) should have this particular form structure item
		// 		// if we want to add a new item, not present in database (in options)
		// 		// and we define it the same way as we define any other form item
		// 		// but it must be nested in this particular object under the key, where options are defined
		// 		firstName: {
		// 			placeholder: "first name",
		// 		},
		// 		middleName: {
		// 			placeholder: "middle name",
		// 		},
		// 		lastName: {
		// 			placeholder: "last name",
		// 		},
		// 		// this above is an example of nested objects
		// 		// in this case if author needs only one input to add a new author, f.e.: "New Author":
		// 		// then you can just pass empty object as a value of forNewOption &
		// 		// it will be rendered as an input type "text", value="" etc.
		// 	},
		// },
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
				//console.log("I'm working! Authors:", state.authors);
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
		const generatedFormStructure = generateFormStructure(state);
		setFormStructure(generatedFormStructure);
		//console.log("state:", state);
	}, [state]);

	// if (!state.user)
	// 	return (
	// 		<p className="add-source-page">
	// 			You need to be logged to add a source...
	// 		</p>
	// 	);

	return (
		<div className="add-source-page">
			<h1 className="text-center">Add new source</h1>
			<div className="add-source-form">
				<Form
					structure={formStructure}
					data={null}
					submitText="add a source" // the text for the submit button
					onSubmit={handleSubmit}
					//link="/sources" // add link, if you want to submit item be a link button
				/>
			</div>
		</div>
	);
}
