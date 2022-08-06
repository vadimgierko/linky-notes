export default function capitalizeString([first, ...rest]) {
	return first.toUpperCase() + rest.join("").toLowerCase();
}
