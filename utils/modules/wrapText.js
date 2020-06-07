const wrapAsQuote = (message, language = "") => {
    return `\`\`\`${language}\n${message}\`\`\`\n`;
};

module.exports = {
    wrapAsQuote,
};
