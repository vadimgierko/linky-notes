export function createShorterTitle(string) {
	let newString = "";
	for (let i = 0; i < string.length; i++) {
		if (i < 37) {
			newString = newString + string[i];
		}
	}
	newString = newString + "...";
	return newString;
}

export function createShortContentAfterTitle(string) {
	let newString = "";
	for (let i = 0; i < string.length; i++) {
		if (i >= 37 && i < 71) {
			newString = newString + string[i];
		}
	}
	newString = "..." + newString + "...";
	return newString;
}

export function createDate() {
	const date = new Date();
	const day =
		date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
	const month =
		date.getUTCMonth() + 1 < 10
			? "0" + (date.getUTCMonth() + 1)
			: date.getUTCMonth() + 1;
	const year = date.getUTCFullYear();
	const currentDate = year + "." + month + "." + day;
	return currentDate;
}
