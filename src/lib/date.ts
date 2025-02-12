function getTimestamp() {
	const timestamp = Date.now();
	return timestamp;
}

function getDateFromTimestamp(timestamp: number) {
	const date = new Date(timestamp);

	const day = date.getDate();
	const month = date.getMonth() + 1; // Months are zero-based, so add 1
	const year = date.getFullYear();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	// const seconds = date.getMilliseconds() * 1000;

	// Ensure the single-digits have leading zeros
	const dayStr = day < 10 ? `0${day}` : day.toString();
	const monthStr = month < 10 ? `0${month}` : month.toString();
	const hoursStr = hours < 10 ? `0${hours}` : hours.toString();
	const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
	// const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();

	const formattedDate = `${year}-${monthStr}-${dayStr} ${hoursStr}:${minutesStr}`; // :${secondsStr}`;

	return formattedDate;
}

function convertV0dateStringToTimestamp(v0dateString: string) {
	// Convert the date string "YYYY.MM.DD" to "YYYY-MM-DD"
	const formattedDate = v0dateString.replace(/\./g, "-");

	// Create a Date object in UTC
	const date = new Date(formattedDate + "T00:00:00Z");

	// Return the timestamp (milliseconds since Unix epoch)
	return date.getTime();
}

const date = {
	convertV0dateStringToTimestamp,
	getDateFromTimestamp,
	getTimestamp,
};

export default date;
