const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `        /* Enhanced Responsive Rules for Slides & Worksheets */
        @media (max-width: 768px) {`;

const replaceStr = `        /* Enhanced Responsive Rules for Slides & Worksheets */
        @media (max-width: 480px) {
            .a4-preview {
                font-size: 110% !important; /* Increase base font size on small mobile screens */
                padding: 1cm 0.5cm !important;
            }
            .a4-preview p, .a4-preview li {
                font-size: 115% !important; /* Increase readability of paragraphs and lists */
            }
            .a4-preview h2 {
                font-size: 130% !important;
            }
            .a4-preview h3 {
                font-size: 120% !important;
            }
            .ws-block {
                padding: 10px !important;
            }
        }

        @media (max-width: 768px) {`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Done patching viewport CSS");
