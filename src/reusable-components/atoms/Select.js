import { useState, useEffect } from "react";
import Label from "./Label";

// passed options must be an object type: {
//     optionKey: optionValue,
// }

export default function Select({
	id,
	options = {},
	value = "",
	forNewOption,
	className,
	placeholder,
	onSelectChange = (e) => console.log(e.target.value),
	onCheckboxChange = (f) => f,
}) {
	const [isSelectDisabled, setIsSelectDisabled] = useState(false);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	useEffect(() => {
		setIsSelectDisabled(isCheckboxChecked);
		console.log("isCheckboxChecked:", isCheckboxChecked);
	}, [isCheckboxChecked]);

	return (
		<div className="select-fieldset">
			{!isSelectDisabled && (
				<select
					className={className}
					id={id}
					value={value}
					onChange={onSelectChange}
					disabled={isSelectDisabled}
				>
					<option value="">select from database</option>
					{Object.keys(options).map((key) => (
						<option key={key} value={key}>
							{options[key]}
						</option>
					))}
				</select>
			)}
			{forNewOption && (
				<>
					<input
						// new separated component? watch out on classname !!!
						type="checkbox"
						className="form-check-input"
						id={`${id}-checkbox`}
						checked={isCheckboxChecked}
						onChange={() => {
							onCheckboxChange(!isCheckboxChecked);
							setIsCheckboxChecked(!isCheckboxChecked);
						}}
					/>
					<label htmlFor={`${id}-checkbox`} className="ms-2">
						add new item to database
					</label>
				</>
			)}
			{isCheckboxChecked && <p>new options go here</p>}
		</div>
	);
}
