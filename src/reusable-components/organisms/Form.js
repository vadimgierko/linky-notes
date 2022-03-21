import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";

/**
 * Form Component ({structure, data}) =>
 * object structured by structure prop & populated with users inputs values
 */

export default function Form({
	structure,
	data,
	submitText,
	//== Form can receive either onSubmit()
	//==> to render a <SubmitSection /> & pass the fullfilled form object] or...
	onSubmit,
	link,
	//=========== ... or onFormChange() !!!
	onFormChange,
}) {
	const [combo, setCombo] = useState();

	useEffect(() => {
		// combo is initiated from const structure prop only once when the Form is mounted:
		if (structure) {
			initiateComboFromStructure(structure, setCombo);
		}
	}, [structure]);

	useEffect(() => console.log("changes in combo:", combo), [combo]);

	if (!structure) return null;

	if (!combo) return <p>Form generating in process... Please wait!</p>;

	return (
		<form>
			{Object.keys(combo).map((key) => {
				return combo[key].type === "subform" ? (
					Object.keys(combo[key].subform).map((subkey) => (
						<FieldSet
							key={subkey + "-fieldset"}
							itemKey={subkey}
							item={combo[key].subform[subkey]}
							onFormControlChange={(input) => {
								setCombo({
									...combo,
									[key]: {
										...combo[key],
										subform: {
											...combo[key].subform,
											[subkey]: {
												...combo[key].subform[subkey],
												value: input,
											},
										},
									},
								});
								console.log("value changed onFormControlChange:", input);
							}}
						/>
					))
				) : (
					<FieldSet
						key={key + "-fieldset"}
						itemKey={key}
						item={combo[key]}
						onFormControlChange={(input) => {
							setCombo({
								...combo,
								[key]: {
									...combo[key],
									value: input,
								},
							});
							console.log("value changed onFormControlChange:", input);
						}}
					/>
				);
			})}
			<br />
			{onSubmit && (
				<SubmitFormSection
					submitText={submitText}
					onSubmit={() => onSubmit(extractItemDataFromCombo(combo))}
					link={link}
				/>
			)}
		</form>
	);
}

//==================================// SUB COMPONENTS //=======================================

function FieldSet({ item, itemKey, onFormControlChange }) {
	const { theme } = useTheme();
	return (
		<fieldset>
			<Label htmlFor={itemKey} text={`${item.label}`} />
			{item.type !== "select" &&
				item.type !== "textarea" &&
				item.type !== "subform" && (
					<Input
						id={itemKey}
						className={`form-control mb-2 bg-${theme.mode} text-${
							theme.mode === "dark" ? "light" : "dark"
						}`}
						type={item.type}
						value={item.value}
						placeholder={item.placeholder}
						onChange={(e) => onFormControlChange(e.target.value)}
					/>
				)}
			{item.type === "textarea" && (
				<TextArea
					id={itemKey}
					className={`form-control mb-2 bg-${theme.mode} text-${
						theme.mode === "dark" ? "light" : "dark"
					}`}
					value={item.value}
					placeholder={item.placeholder}
					onChange={(e) => onFormControlChange(e.target.value)}
				/>
			)}
			{item.type === "select" && (
				<Select
					id={itemKey}
					className={`form-select mb-2 bg-${theme.mode} text-${
						theme.mode === "dark" ? "light" : "dark"
					}`}
					value={item.value}
					options={item.options}
					forNewOption={item.forNewOption}
					onSelectChange={(e) => onFormControlChange(e.target.value)}
					onCheckboxChange={(isCheckboxChecked) => {
						if (isCheckboxChecked) {
							// if checkbox was checked (returned true)
							// it means that user want to add a new option
							// so we need to erase previously selected value
							onFormControlChange("");
							// and add newOptionObject instead of select form control
							// what means that we need to add form controls:
							//================================================================== HERE WE NEED TO CHANGE COMBO FOR THIS KEY
						}
					}}
				/>
			)}
		</fieldset>
	);
}

function SubmitFormSection({ submitText, onSubmit, link }) {
	if (link)
		return (
			<div className="submit-form-section">
				<Link to={link}>
					<Button text={submitText} onClick={onSubmit} />
				</Link>
			</div>
		);

	return (
		<div className="submit-form-section">
			<Button text={submitText} onClick={onSubmit} />
		</div>
	);
}

//====================================== METHODS ==========================================

function transformFormStructureItemObjectIntoComboItemObject(
	formStructureItemObject = {},
	key
) {
	let comboItemObject = {};
	// check if there is a type defined: //========== use switch here ???
	if (formStructureItemObject.type) {
		if (
			formStructureItemObject.type !== "select" &&
			formStructureItemObject.type !== "textarea" &&
			formStructureItemObject.type !== "subform"
			// it means that it is a some type of input, like "text", "password" etc.
		) {
			comboItemObject = {
				...comboItemObject,
				label: formStructureItemObject.label
					? formStructureItemObject.label
					: key,
				type: formStructureItemObject.type,
				value: formStructureItemObject.value
					? formStructureItemObject.value
					: "",
				placeholder: formStructureItemObject.placeholder
					? formStructureItemObject.placeholder
					: key,
			};
		}
		if (formStructureItemObject.type === "textarea") {
			comboItemObject = {
				...comboItemObject,
				label: formStructureItemObject.label
					? formStructureItemObject.label
					: key,
				type: "textarea",
				value: formStructureItemObject.value
					? formStructureItemObject.value
					: "",
				placeholder: formStructureItemObject.placeholder
					? formStructureItemObject.placeholder
					: "type something here",
			};
		}
		if (formStructureItemObject.type === "select") {
			// if this is a select form control
			// we will deal with options list object passed via FORM_STRUCTURE object
			// & we also can deal with newOption prop if it's defined
			// so we create newOptionObject to eventually populate it if newOption prop exists
			//=========================== let newOptionObject = {};
			// check if there is newOption prop:
			//==========================
			// if (formStructureItemObject.forNewOption) {
			// 	// if true, populate newOptionObject with transformed forNewOption object:
			// 	Object.keys(formStructureItemObject.forNewOption).forEach((key) => {
			// 		newOptionObject = {
			// 			...newOptionObject,
			// 			[key]: transformFormStructureItemObjectIntoComboItemObject(
			// 				formStructureItemObject.forNewOption[key],
			// 				key
			// 			),
			// 		};
			// 	});
			// }
			comboItemObject = {
				...comboItemObject,
				label: formStructureItemObject.label
					? formStructureItemObject.label
					: key,
				type: "select",
				value: formStructureItemObject.value
					? formStructureItemObject.value
					: "",
				options: formStructureItemObject.options
					? formStructureItemObject.options
					: {},
				forNewOption: formStructureItemObject.forNewOption
					? formStructureItemObject.forNewOption
					: null,
			};
		}
		if (formStructureItemObject.type === "subform") {
			// transform keys inside subform prop:
			let transformedSubformObject = {};
			Object.keys(formStructureItemObject.subform).forEach((key) => {
				transformedSubformObject = {
					...transformedSubformObject,
					[key]: transformFormStructureItemObjectIntoComboItemObject(
						formStructureItemObject.subform[key],
						key
					),
				};
			});
			// replace prev subform object with transformed subform prop object:
			comboItemObject = {
				...comboItemObject,
				label: formStructureItemObject.label
					? formStructureItemObject.label
					: key,
				type: "subform",
				subform: transformedSubformObject,
			};
		}
	} else {
		// false => this is the default input of type: "text":
		comboItemObject = {
			...comboItemObject,
			label: formStructureItemObject.label
				? formStructureItemObject.label
				: key,
			type: "text",
			value: formStructureItemObject.value ? formStructureItemObject.value : "",
			placeholder: formStructureItemObject.placeholder
				? formStructureItemObject.placeholder
				: key,
		};
	}
	return comboItemObject;
}

function initiateComboFromStructure(structure, hook = (f) => f) {
	let updatedCombo = {};
	Object.keys(structure).map((key) => {
		const comboItemObject = transformFormStructureItemObjectIntoComboItemObject(
			structure[key],
			key
		);
		updatedCombo = {
			...updatedCombo,
			[key]: comboItemObject,
		};
	});
	console.log("Initiated combo from structure:", updatedCombo);
	// pass the initiated combo to the parent component by argument in passed hook:
	hook(updatedCombo);
}

// function updateComboOnSubformChange() {
// 	onFormChange={(input) => {
// 		setCombo({
// 			...combo,
// 			[key]: {
// 				...combo[key],
// 				subform: {
// 					...combo[key].subform,

// 				}
// 			},
// 		});
// 	}}
// }

function extractItemDataFromCombo(combo) {
	let extractedItemData = {};
	Object.keys(combo).map((key) => {
		if (combo[key].type === "subform") {
			let keyNestedObject = {};
			Object.keys(combo[key].subform).forEach((subkey) => {
				keyNestedObject = {
					...keyNestedObject,
					[subkey]: combo[key].subform[subkey].value,
				};
			});
			extractedItemData = {
				...extractedItemData,
				[key]: keyNestedObject,
			};
		} else {
			extractedItemData = {
				...extractedItemData,
				[key]: combo[key].value,
			};
		}
	});
	return extractedItemData;
}

//=========================== future ideas for FORM_STRUCTURE:

//============ var. 1. data structure wrapped in form controls list object:
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
//===== issues for var. 1.:
// Q: what if we want put input, input, select, input, texarea etc. how to order them?
// A: =>
//===== var. 2.:
// try to leave prev structure, but add a type of form control, f.e. select, but...
// make inputs with type of text default if there is no form control type
//
// Q: ok, but what with buttons list object then?
// A: maybe FORM_STRUCTURE & FORM BUTTONS_STRUCTURE separately ??
//
// Q: don't forget, that we also need to enable render custom componentsinside form, like:
// - SearchInput
// - FilterSearch

/*
=================================== READ ME !!! ================================
===================== The Idea & Documented Developing Process==================

THIS IS A REUSABLE CUSTOMISABLE FORM COMPONENT

========================= HOW IT WORKS =========================

<Form /> component recieves 3 props:
- structure,
- data,
- onSubmit function

That's why Form component is reusable & can be used for:
- adding some data (if no data passed via props)
- editing/updating some data (if data passed via props)

The component recieves 2 OBJECTS:
- structure you defined
- data object (optional, if exists & if you want to update something)

1. Structure & data objects are combined in Form into one data object:
const combinedDataObject = {...structure, ...data};

2. User is completing the form => each change is updating the data object:
setDataObject({
    ...combinedDataObject,
    ...updates
});

3. When form is submited by clicking a submit button
the passed onSubmit function is executed on the data object:
onSubmit(combinedDataObject);

NOTE: if no onSubmit prop function passed => the Form component runs console.log(formDataObject)

========================= HOW TO USE IT =========================

1. Define a structure object in parent component according to template below:

add as much inputs, as you like

some_key_representanting_variable: { // name of the key / variable
    type: "password", // (OPTIONAL) include type only if it's value is not "text"
    value: "some value", // (OPTIONAL) if it's empty, skip this key-value pair
    placeholder: "some placeholder" // (OPTIONAL) if it's same as key / variable name, skip it
}

if all properties are default & skipped,
add a key_name: {},

EXAMPLE:

const FORM_STRUCTURE = {
    title: {},
    description: {},
    color: {
        value: "#000000",
        type: "color",
    }
}

OUTPUT:

Form with 3 inputs:

<form>
    <input type="text" value="" placeholder="title" ...otherThingsYouDon'tWorryAbout />
    <input type="text" value="" placeholder="description" ...otherThingsYouDon'tWorryAbout />
    <input type="color" value="#000000" ...otherThingsYouDon'tWorryAbout />
</form>

========================= HOW TO ADD COMPLEX OBJECTS ??? ==========================

I'm wondering how to do complex objects inside form, for example:

source: {
    author: {
        firstName: "",
        middleName: "",
        lastName: "",
    },
    title: "",
    subtitle: "",
    publisher: "",
    placeOfPublication: "",
    yearOfPublication: ""
}

Split form into so many forms, as many nested complex objects are inside:

author: {
    firstName: "",
    middleName: "",
    lastName: "",
},

sourceObject: {
    title: "",
    subtitle: "",
    publisher: "",
    placeOfPublication: "",
    yearOfPublication: ""
}

but this idea below is better !!! check it out:

<Form>
    <SubForm>
        <FieldSet>
    <SubmitButton>

const FORM_STRUCTURE = {
    subforms: {
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
        source: {
            title: {},
            subtitle: {},
            publisher: {},
            placeOfPublication: {
                placeholder: "place of publication",
            },
            yearOfPublication: {
                placeholder: "year of publication",
            }
        } 
    },
    //=============================================== later
    submitButton: {
        type: "button" || "link"
    }
}

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
	meta: {
		description: {},
		translatorLastName: {
			placeholder: "translator's last name",
		},
	},
	yearOfPublication: {
		placeholder: "year of publication",
	},
*/
