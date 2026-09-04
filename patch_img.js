const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Add .rendering-image CSS rule
const targetCSS = `.a4-preview.rendering-pdf {
            width: 794px !important;
            max-width: 794px !important;
            min-width: 794px !important;
            min-height: 0 !important;
            height: auto !important;`;
            
const replaceCSS = `.a4-preview.rendering-image {
            width: 794px !important;
            max-width: 794px !important;
            min-width: 794px !important;
            min-height: 1123px !important; /* Force minimum A4 proportions (794 x 1123) */
            height: auto !important;
            padding: 15mm 15mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
            box-sizing: border-box !important;
        }
        
        .a4-preview.rendering-image *,
        .a4-preview.rendering-image *::before,
        .a4-preview.rendering-image *::after {
            transition: none !important;
            animation: none !important;
            transform: none !important;
            will-change: auto !important;
        }

        .a4-preview.rendering-image .no-print,
        .a4-preview.rendering-image .ws-block-controls {
            display: none !important;
        }

        .a4-preview.rendering-image .a4-qr-layer {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 20px !important;
            margin-bottom: 8px !important;
            padding-right: 0 !important;
            display: flex !important;
            justify-content: center !important;
        }

        .a4-preview.rendering-image .a4-qr-layer .a4-qr-title {
            color: #334155 !important;
        }

        .a4-preview.rendering-image .middle-box,
        .a4-preview.rendering-image .image-placeholder,
        .a4-preview.rendering-image tr,
        .a4-preview.rendering-image img {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
        }

        .a4-preview.rendering-image h1,
        .a4-preview.rendering-image h2,
        .a4-preview.rendering-image h3,
        .a4-preview.rendering-image h4 {
            page-break-after: avoid !important;
            break-after: avoid !important;
        }

        .a4-preview.rendering-pdf {
            width: 794px !important;
            max-width: 794px !important;
            min-width: 794px !important;
            min-height: 0 !important;
            height: auto !important;`;

if (content.includes(targetCSS) && !content.includes('.a4-preview.rendering-image {')) {
    content = content.replace(targetCSS, replaceCSS);
}

// Modify exportWorksheetImage
const targetFunc = `previewArea.classList.add('rendering-pdf');
            
            captureCanvas(previewArea, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            }).then(canvas => {
                previewArea.classList.remove('rendering-pdf');`;

const replaceFunc = `previewArea.classList.add('rendering-image');
            
            captureCanvas(previewArea, {
                scale: 3, // Increased scale for crisper A4 resolution (2382px width)
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: 794 // Ensures layout bounds are respected
            }).then(canvas => {
                previewArea.classList.remove('rendering-image');`;

if (content.includes(targetFunc)) {
    content = content.replace(targetFunc, replaceFunc);
} else {
    // maybe there's no blank line
    const targetFunc2 = `previewArea.classList.add('rendering-pdf');
            captureCanvas(previewArea, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            }).then(canvas => {
                previewArea.classList.remove('rendering-pdf');`;
                
    const replaceFunc2 = `previewArea.classList.add('rendering-image');
            captureCanvas(previewArea, {
                scale: 3, // Increased scale for crisper A4 resolution (2382 x 3369)
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                windowWidth: 794
            }).then(canvas => {
                previewArea.classList.remove('rendering-image');`;
    if (content.includes(targetFunc2)) {
        content = content.replace(targetFunc2, replaceFunc2);
    }
}

// And fix the catch block
content = content.replace(`previewArea.classList.remove('rendering-pdf');
                if (wasEditing) setWorksheetEditMode(true);
                console.error("Image export error:", err);`, `previewArea.classList.remove('rendering-image');
                previewArea.classList.remove('rendering-pdf'); // Fallback safety
                if (wasEditing) setWorksheetEditMode(true);
                console.error("Image export error:", err);`);

fs.writeFileSync('index.html', content);
console.log('Patched correctly');
