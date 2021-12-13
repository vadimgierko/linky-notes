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