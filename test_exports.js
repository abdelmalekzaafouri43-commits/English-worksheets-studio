const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The downloadAnchor display was not 'none' because I changed it in word export string but forgot it was wrapped in a template string which might have been altered or not saved correctly.
let match = html.match(/downloadAnchor\.style\.display\s*=\s*'none';/);
if (match) console.log("FOUND DISPLAY NONE in " + match);
else console.log("NOT FOUND DISPLAY NONE");

let match2 = html.match(/display:\s*none/g);
console.log("display: none count: " + (match2 ? match2.length : 0));

