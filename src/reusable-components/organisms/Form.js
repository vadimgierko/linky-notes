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
*/

//================================== CODE =========================================

import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import Button from "../atoms/Button";

function LabelInputGroup({ item, itemKey }) {
	const { theme } = useTheme();
	return (
		<div className="form-label-input-pair">
			<label htmlFor={itemKey} className="form-label">
				{item.placeholder ? item.placeholder : itemKey}:
			</label>
			<input
				id={itemKey}
				className={
					"form-control mb-2 + bg-" +
					theme.mode +
					" text-" +
					(theme.mode === "dark" ? "light" : "dark")
				}
				type={item.type ? item.type : "text"}
				value={""}
				placeholder={item.placeholder ? item.placeholder : itemKey}
				onChange={(e) => {
					console.log("there is no function to run onChange");
					// const updatedItem = [...itemArray];
					// updatedItem[i] = [...updatedItem[i]];
					// updatedItem[i][1] = e.target.value;
					// setItemArray([...updatedItem]);
				}}
			/>
		</div>
	);
}

export default function Form({
	structure,
	data,
	onSubmit = (objectReturnedFromForm) => console.log(objectReturnedFromForm),
}) {
	const [combinedDataStructureObject, setCombinedDataStructureObject] =
		useState();

	function combineDataAndStructureIntoOneObject(structure, data) {
		if (data) {
			// TO DO
		} else {
			// if only structure object was passed via props
			// in other words: if we are adding a new object
			setCombinedDataStructureObject({
				//
			});
		}
	}

	const isObject = (obj) => {
		return Object.prototype.toString.call(obj) === "[object Object]";
	};

	// useEffect(() => {
	// 	if (structure) {
	// 		//combineDataAndStructureIntoOneObject(structure, data);
	// 		//=============================
	// 		const itemArray = [];
	// 		// transform structure / data object into array:
	// 		Object.keys(structure).map((key) => {
	// 			const keyValuePair =
	// 				data && data[key] // is item passed ?
	// 					? [key, data[key]] // set item[key] value
	// 					: [
	// 							// if no item
	// 							key,
	// 							structure[key].value // does structure[key] has value ?
	// 								? structure[key].value // if true, use structure[key] value
	// 								: "", // if false, set empty value to the key
	// 					  ];
	// 			return itemArray.push(keyValuePair);
	// 		});
	// 		if (data) {
	// 			console.log("item array created from passed data:", itemArray);
	// 		} else {
	// 			console.log(
	// 				"item array created from structure template:",
	// 				itemArray
	// 			);
	// 		}
	// 		setItemArray([...itemArray]);
	// 	}
	// }, [structure, data]);

	if (!structure)
		return (
			<p>
				No form structure object has been passed to the Form component,
				so the app cannot build the form for you... You need to pass at
				least form structure object to create the form!
			</p>
		);

	// now in the beginning of return we are checking, if some object keys are complex
	// what means that they contains a few input to render & form a subform
	return (
		<form>
			{Object.keys(structure).map((key, i) => {
				return Object.entries(structure[key]).length > 1 ? (
					<div className="subform" key={key + "-subform"}>
						{Object.keys(structure[key]).map((subkey) => (
							<LabelInputGroup
								key={subkey + "form-label-input-pair"}
								itemKey={subkey}
								item={structure[key][subkey]}
							/>
						))}
					</div>
				) : (
					<LabelInputGroup
						key={key + "form-label-input-pair"}
						itemKey={key}
						item={structure[key]}
					/>
				);
			})}
			<Button
				text="set item"
				onClick={() => {
					// tranform item / data array back to object & pass it:
					onSubmit(Object.fromEntries(itemArray));
				}}
			/>
		</form>
	);
}

{
	/* <div
					className="form-label-input-pair"
					key={key + "form-label-input-pair"}
				>
					<label htmlFor={key} className="form-label">
						{structure[key].placeholder
							? structure[key].placeholder
							: key}
						:
					</label>
					<input
						id={key}
						className="form-control mb-2"
						type={
							structure[key].type ? structure[key].type : "text"
						}
						value={itemArray[i][1] ? itemArray[i][1] : ""}
						placeholder={
							structure[key].placeholder
								? structure[key].placeholder
								: key
						}
						onChange={(e) => {
							const updatedItem = [...itemArray];
							updatedItem[i] = [...updatedItem[i]];
							updatedItem[i][1] = e.target.value;
							setItemArray([...updatedItem]);
						}}
					/>
				</div> */
}
