const wrapAsQuote = (message, language = "") => {
    return `\`\`\`${language}\n${message}\`\`\``;
};

module.exports = {
    wrapAsQuote,
};
