const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(/\(```html\)/g, "(\\&#96;\\&#96;\\&#96;html)"); // or just escape it

fs.writeFileSync('index.html', content);
