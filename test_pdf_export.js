const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The issue might be window.jspdf is available, but jsPDF is null?
// The user says "only one page saved" for 5 page slides.
// If jsPDF is not available, it uses window.print() which prints slide-print-page elements.
