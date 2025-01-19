//====== NOTE !
//====== createDate() creates UTC date => (current time in Poland - 1 hour)

export default function createDate() {
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