module.exports = function (content, map, meta) {
    const value = convertPhpArrayToJson(content);
    return `module.exports = ${value}`;
};

function convertPhpArrayToJson(phpArray) {
    const lines = phpArray.split("\n").filter(line => {
        return line.indexOf("=>") > 0;
    });

    const obj = {};

    lines.forEach(line => {
        let [key, text] = line.split("=>");
        key = trimQuotes(key.trim());
        text = trimQuotes(text.trim());

        obj[key] = text;
    });

    const value = JSON.stringify(obj)
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");

    return value;
}

function trimQuotes(text) {
    text = text.replace(/(.+),$/, "$1");

    if (text.startsWith(`'`)) {
        return text.replace(/^'(.+)'$/, "$1");
    }
    if (text.startsWith(`"`)) {
        return text.replace(/^"(.+)"$/, "$1");
    }
    if (text.match(/^[0-9]+$/)) {
        return parseInt(text, 10);
    }
    if (text.toLowerCase() === "true" || text.toLowerCase() === "false") {
        return text.toLowerCase() === "true";
    }

    throw Error("Unsupported quotes to trim.");
}
