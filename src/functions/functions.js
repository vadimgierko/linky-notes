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
    const day = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    const month = date.getUTCMonth() + 1 < 10 ? "0" + date.getUTCMonth() + 1 : date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const currentDate = year + "." + month + "." + day;
    return currentDate;
}

export function convertPolishSymbolsAndSpaces(string) {
    let convertedString = "";
    for (let i = 0; i < string.length; i++) {
        let symbol = string[i];
        console.log("symbol before if:", symbol);
        if (symbol === "%20") {
            symbol = " ";
        } else if (symbol === "%C4%85") {
            symbol = "ą";
        } else if (symbol === "%C4%87") {
            symbol = "ć";
        } else if (symbol === "%C4%99") {
            symbol = "ę";
        } else if (symbol === "%C5%82") {
            symbol = "ł";
        } else if (symbol === "%C5%84") {
            symbol = "ń";
        } else if (symbol === "%C3%B3") {
            symbol = "ó";
        } else if (symbol === "%C5%9B") {
            symbol = "ś";
        } else if (symbol === "%C5%BA") {
            symbol = "ź";
        } else if (symbol === "%C5%BC") {
            symbol = "ż";
        }
        console.log("symbol after if:", symbol);
        convertedString = convertedString + symbol;
    }
    console.log("converted string:", convertedString);
    return convertedString;
}