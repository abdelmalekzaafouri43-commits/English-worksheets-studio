const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The error was caused by the literal backticks inside the script tag breaking the template string.
// Let's make sure the prompt replacement for the AI worksheet generator properly escapes those.

const targetStr = `NO markdown code blocks (\\\`\\\`\\\`html), NO`;
const replaceStr = `NO markdown code blocks (NO CODE BLOCKS ALLOWED AT ALL), NO`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Done checking backticks");
