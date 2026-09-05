const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `const marginTotal = parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);`;
const replaceStr = `const marginTotal = (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
