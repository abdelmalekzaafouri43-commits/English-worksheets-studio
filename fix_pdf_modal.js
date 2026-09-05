const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Move the slide-video-export-modal out of worksheet-app-container to the end of the body
const modalRegex = /(<div id="slide-video-export-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>)/;
const match = html.match(modalRegex);
if (match) {
    let modalCode = match[1];
    html = html.replace(modalCode, '');
    html = html.replace('</body>', modalCode + '\n</body>');
} else {
    console.log("Could not find modal regex!");
}

// 2. Add jsPDF script tag for Slides PDF export
const jsPdfTag = '<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>';
if (!html.includes('jspdf.umd.min.js')) {
    html = html.replace('</head>', '    ' + jsPdfTag + '\n</head>');
}

fs.writeFileSync('index.html', html);
