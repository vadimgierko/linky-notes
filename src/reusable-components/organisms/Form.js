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
*/

import { useEffect, useState } from "react";
import Button from "../atoms/Button";

export default function Form({
	structure,
	data,
	onSubmit = (objectReturnedFromForm) => console.log(objectReturnedFromForm),
}) {
	const [itemArray, setItemArray] = useState();

	useEffect(() => {
		if (structure) {
			const itemArray = [];
			// transform structure / data object into array:
			Object.keys(structure).map((key) => {
				const keyValuePair =
					data && data[key] // is item passed ?
						? [key, data[key]] // set item[key] value
						: [
								// if no item
								key,
								structure[key].value // does structure[key] has value ?
									? structure[key].value // if true, use structure[key] value
									: "", // if false, set empty value to the key
						  ];
				return itemArray.push(keyValuePair);
			});
			if (data) {
				console.log("item array created from passed data:", itemArray);
			} else {
				console.log(
					"item array created from structure template:",
					itemArray
				);
			}
			setItemArray([...itemArray]);
		}
	}, [structure, data]);

	if (!structure || !itemArray)
		return <p>Nothing has been passed to the Form component...</p>;

	return (
		<form>
			{Object.keys(structure).map((key, i) => (
				<input
					key={key}
					className="form-control mb-2"
					type={structure[key].type ? structure[key].type : "text"}
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
			))}
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
