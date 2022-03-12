import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/use-theme";
import Button from "../atoms/Button";

//====================// STRUCTURE OF THE FILE //===================
//
// 						NOTE:
// I didn't want to extract these components & methods to another file
// to contain all <Form /> components inside a encapsulated one component.
//
// - main component:
//   - <Form /> (the only one exported)
// - subcomponents:
//   - <Subform />
//     - <LabelInputGroup />
//   - <SubmitFormSection />
// - methods:
//   - initiateComboFromStructure()
//   - extractItemDataFromCombo()
// - readme

export default function Form({
	structure,
	data,
	submitText = "call to action goes here",
	onSubmit = (objectReturnedFromForm) => console.log(objectReturnedFromForm),
	link,
}) {
	const [combo, setCombo] = useState();

	useEffect(() => {
		if (structure) {
			initiateComboFromStructure(structure, setCombo);
		}
	}, [structure]);

	//useEffect(() => console.log("changes in combo:", combo), [combo]);

	if (!structure)
		return (
			<p>
				No form structure object has been passed to the Form component, so the
				app cannot build the form for you... You need to pass at least form
				structure object to create the form!
			</p>
		);

	if (!combo) return <p>Form generating in process... Wait please</p>;

	return (
		<form>
			{Object.keys(combo).map((key) => {
				return key.includes("subform") ? (
					<SubForm
						key={combo[key].parentKey + "-subform"}
						subcombo={combo[key]}
						onSubFormInputChange={(input, subkey) => {
							setCombo({
								...combo,
								[key]: {
									parentKey: combo[key].parentKey,
									children: {
										...combo[key].children,
										[subkey]: {
											...combo[key].children[subkey],
											value: input,
										},
									},
								},
							});
						}}
					/>
				) : (
					<LabelInputGroup
						key={key + "form-label-input-pair"}
						itemKey={key}
						item={combo[key]}
						onInputChange={(input) =>
							setCombo({
								...combo,
								[key]: {
									...combo[key],
									value: input,
								},
							})
						}
					/>
				);
			})}
			<br />
			<SubmitFormSection
				submitText={submitText}
				onSubmit={() => onSubmit(extractItemDataFromCombo(combo))}
				link={link}
			/>
		</form>
	);
}

//==================================// SUB COMPONENTS //=======================================

function SubForm({ subcombo, onSubFormInputChange = (f) => f }) {
	if (!subcombo)
		return (
			<p className="subform">
				No subform structure object has been passed to the SubForm component, so
				the app cannot build the SubForm for you... You need to pass a SubForm
				subcombo structure object to create the form!
			</p>
		);
	return (
		<div className="subform">
			<hr />
			<p>{subcombo.parentKey}:</p>
			<div className="ms-3">
				{Object.keys(subcombo.children).map((subkey) => (
					<LabelInputGroup
						key={subkey + "form-label-input-pair"}
						itemKey={subkey}
						item={subcombo.children[subkey]}
						onInputChange={(input) => onSubFormInputChange(input, subkey)}
					/>
				))}
			</div>
			<hr />
		</div>
	);
}

function LabelInputGroup({ item, itemKey, onInputChange }) {
	const { theme } = useTheme();
	return (
		<div className="form-label-input-pair">
			<label htmlFor={itemKey} className="form-label">
				{item.placeholder}:
			</label>
			<input
				id={itemKey}
				className={
					"form-control mb-2 bg-" +
					theme.mode +
					" text-" +
					(theme.mode === "dark" ? "light" : "dark")
				}
				type={item.type}
				value={item.value}
				placeholder={item.placeholder}
				onChange={(e) => onInputChange(e.target.value)}
			/>
		</div>
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

function initiateComboFromStructure(structure, hook = (f) => f) {
	let updatedCombo = {};
	let subformsNum = 0;
	Object.keys(structure).map((key) => {
		// here we must check every key if it needs a subform
		// it means that this key forms keys group
		if (Object.entries(structure[key]).length > 1) {
			//console.log(key, " is a parent key => create subform", subformsNum);
			const parentKey = key;
			let children = {};
			Object.keys(structure[key]).map((subKey) => {
				children = {
					...children,
					[subKey]: {
						type: structure[key][subKey].type
							? structure[key][subKey].type
							: "text",
						value: structure[key][subKey].value
							? structure[key][subKey].value
							: "",
						placeholder: structure[key][subKey].placeholder
							? structure[key][subKey].placeholder
							: subKey,
					},
				};
			});
			updatedCombo = {
				...updatedCombo,
				["subform" + subformsNum]: {
					parentKey: parentKey,
					children: children,
				},
			};
			subformsNum++;
		} else {
			updatedCombo = {
				...updatedCombo,
				[key]: {
					type: structure[key].type ? structure[key].type : "text",
					value: structure[key].value ? structure[key].value : "",
					placeholder: structure[key].placeholder
						? structure[key].placeholder
						: key,
				},
			};
		}
	});
	//console.log("Initiated combo from structure:", updatedCombo);
	// pass the initiated combo to the parent component by argument in passed hook:
	hook(updatedCombo);
}

function extractItemDataFromCombo(combo) {
	let extractedItemData = {};
	Object.keys(combo).map((key) => {
		if (key.includes("subform")) {
			let children = {};
			Object.keys(combo[key].children).map((childKey) => {
				children = {
					...children,
					[childKey]: combo[key].children[childKey].value,
				};
			});
			extractedItemData = {
				...extractedItemData,
				[combo[key].parentKey]: children,
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

/*
=================================== READ ME !!! ================================

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
        <LabelInputGroup>
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

	//============= write what happened here !!!!!!!!!!!!!!!!
*/
