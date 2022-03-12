import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/use-theme";

export default function LabelInputGroup({ item, itemKey, onInputChange }) {
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
