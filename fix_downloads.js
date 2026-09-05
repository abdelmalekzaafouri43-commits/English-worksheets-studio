const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix Word Download logic which I might have broken with display: none
html = html.replace("downloadAnchor.style.display = 'none';", "downloadAnchor.style.position = 'absolute'; downloadAnchor.style.left = '-9999px';");

// Check PDF download link if there's any similar issue
html = html.replace("downloadAnchor.style.display = 'none';", "downloadAnchor.style.position = 'absolute'; downloadAnchor.style.left = '-9999px';");

fs.writeFileSync('index.html', html);
