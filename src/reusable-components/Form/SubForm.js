import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";
import LabelInputGroup from "./LabelInputGroup";

export default function SubForm({
	structure,
	data,
	parentKey,
	onSubformChange,
}) {
	const [combo, setCombo] = useState();

	function initiateComboFromStructure(structure) {
		let updatedCombo = {};
		Object.keys(structure).map((key) => {
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
		});
		//console.log("Initiated subform combo from structure:", updatedCombo);
		setCombo(updatedCombo);
	}

	function extractItemDataFromCombo(combo) {
		let extractedItemData = {};
		Object.keys(combo).map((key) => {
			extractedItemData = {
				...extractedItemData,
				[key]: combo[key].value,
			};
		});
		return extractedItemData;
	}

	useEffect(() => {
		if (structure) {
			//console.log("structure passed to subform:", structure);
			initiateComboFromStructure(structure);
		}
	}, [structure]);

	if (!structure)
		return (
			<p>
				No subform structure object has been passed to the Form component, so
				the app cannot build the form for you... You need to pass at least
				subform structure object to create the form!
			</p>
		);

	if (!combo) return <p>Subform generating in process... Wait please</p>;

	return (
		<div className="subform">
			<hr />
			<p>{parentKey}:</p>
			<div className="mx-3">
				{Object.keys(combo).map((key) => (
					<LabelInputGroup
						key={key + "form-label-input-pair"}
						itemKey={key}
						item={combo[key]}
						onInputChange={(input) => {
							const updates = {
								...combo,
								[key]: {
									...combo[key],
									value: input,
								},
							};
							onSubformChange(updates);
							setCombo(updates);
						}}
					/>
				))}
			</div>
			<hr />
		</div>
	);
}
