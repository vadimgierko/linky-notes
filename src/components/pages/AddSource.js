import { useStore } from "../../store/Store";
import Form from "../../reusable-components/organisms/Form";

const FORM_STRUCTURE = {
	// add as much inputs, as you like
	// according to template below:

	// some_key_representanting_variable: { // name of the key / variable
	//   type: "password", // (OPTIONAL) include type only if it's value is not "text"
	//   value: "some value", // (OPTIONAL) if it's empty, skip this key-value pair
	//   placeholder: "some placeholder" // (OPTIONAL) if it's same as key / variable name, skip it
	// }

	// if all properties are default & skipped,
	// add a key_name: {},

	// title: {},
	// subtitle: {},
	// publisher: {},
	// placeOfPublication: {
	// 	placeholder: "place of publication",
	// },
	// yearOfPublication: {
	// 	placeholder: "year of publication",
	// },

	//======================= BETTER IDEA ===============

	// THIS IS OUR DATA OBJECT FROM DATABASE/STORE/STATE STRUCTURE:

	/*
    const source = {
        author: {
            firstName: "",
            middleName: "",
            lastName: "",
        },
        title: "",
        subtitle: "",
        publisher: "",
        placeOfPublication: "",
        yearOfPublication: "",
    }
    */

	// THIS IS HOW WE TRANSFORM THIS DATA OBJECT INTO FORM STRUCTURE:

	// subforms: {
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
	// 	source: {
	// 		title: {},
	// 		subtitle: {},
	// 		publisher: {},
	// 		placeOfPublication: {
	// 			placeholder: "place of publication",
	// 		},
	// 		yearOfPublication: {
	// 			placeholder: "year of publication",
	// 		},
	// 	},
	// },
	// submitButton: {
	//     type: "button" || "link"
	// }

	// NOOOOOO !!!
	// THIS IS MUCH BETTER! LOOK, IT LOOKS ALMOST THE SAME AS DATA OBJECT:

	// author: {
	// 	firstName: {
	// 		placeholder: "first name",
	// 	},
	// 	middleName: {
	// 		placeholder: "middle name",
	// 	},
	// 	lastName: {
	// 		placeholder: "last name",
	// 	},
	// },
	title: {},
	subtitle: {},
	publisher: {},
	placeOfPublication: {
		placeholder: "place of publication",
	},
	yearOfPublication: {
		placeholder: "year of publication",
	},

	// Autorska Koncepcja i Praktyczny System Generowanie Pomysłów i Realizacji Projektów Krok Po Kroku
};

export default function AddSource() {
	const { state } = useStore();

	function handleSubmit(data) {
		console.log("data passed to handleSubmit:", data);
	}

	//if (!state.user) return <p className="add-source-page">You need to be logged to add a source...</p>

	return (
		<div className="add-source-page">
			<div className="add-source-form">
				<Form
					structure={FORM_STRUCTURE}
					data={null}
					//onSubmit={handleSubmit}
				/>
			</div>
		</div>
	);
}
