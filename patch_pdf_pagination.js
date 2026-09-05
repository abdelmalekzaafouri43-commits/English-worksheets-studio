const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `        /* Live Worksheet Editing Mode Styles */`;

const replaceStr = `        /* PDF Automatic Pagination Classes */
        .pdf-page-break {
            page-break-after: always;
            break-after: always;
            clear: both;
            display: block;
            width: 100%;
            height: 0;
            margin: 0;
            padding: 0;
            border: none;
        }
        
        .pdf-page-wrapper {
            position: relative;
            min-height: 1000px; /* Approximate A4 content height */
            box-sizing: border-box;
        }

        /* Live Worksheet Editing Mode Styles */`;

html = html.replace(targetStr, replaceStr);


const targetJsStr = `            const wasEditing = isEditMode;
            if (wasEditing) setWorksheetEditMode(false);

            const element = document.getElementById('a4-preview-area');
            if (element) element.classList.add('rendering-pdf');`;

const replaceJsStr = `            const wasEditing = isEditMode;
            if (wasEditing) setWorksheetEditMode(false);

            const element = document.getElementById('a4-preview-area');
            if (element) {
                element.classList.add('rendering-pdf');
                
                // Smart auto-pagination logic
                // A standard A4 page at 96 DPI is ~1123px high. With 1.8cm (~68px) padding top/bottom,
                // the usable content height is roughly 980-1000px.
                const MAX_CONTENT_HEIGHT = 980; 
                
                // Remove any existing dynamic page breaks first
                element.querySelectorAll('.dynamic-page-break').forEach(pb => pb.remove());
                
                // Iterate through blocks and smartly inject page breaks to prevent mid-block clipping
                let currentHeight = 0;
                const blocks = Array.from(element.children).filter(child => {
                    // Ignore elements like the background watermark or QR layer that aren't flow content
                    if(child.classList.contains('a4-qr-layer') || child.classList.contains('pdf-page-break')) return false;
                    return true;
                });
                
                blocks.forEach((block, index) => {
                    const blockHeight = block.offsetHeight;
                    const style = window.getComputedStyle(block);
                    const marginTotal = parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
                    const totalBlockSpace = blockHeight + marginTotal;
                    
                    if (currentHeight + totalBlockSpace > MAX_CONTENT_HEIGHT && index !== 0) {
                        // Insert a page break before this block
                        const pageBreak = document.createElement('div');
                        pageBreak.className = 'pdf-page-break dynamic-page-break';
                        element.insertBefore(pageBreak, block);
                        
                        // Reset height accumulator for the new page
                        currentHeight = totalBlockSpace;
                    } else {
                        currentHeight += totalBlockSpace;
                    }
                });
            }`;

html = html.replace(targetJsStr, replaceJsStr);


const targetRestoreStr = `            const restoreState = () => {
                if (element) element.classList.remove('rendering-pdf');
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = '📥 Download PDF';
                }
                if (wasEditing) setWorksheetEditMode(true);
            };`;

const replaceRestoreStr = `            const restoreState = () => {
                if (element) {
                    element.classList.remove('rendering-pdf');
                    // Clean up the dynamic page breaks so they don't break the web view
                    element.querySelectorAll('.dynamic-page-break').forEach(pb => pb.remove());
                }
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = '📥 Download PDF';
                }
                if (wasEditing) setWorksheetEditMode(true);
            };`;

html = html.replace(targetRestoreStr, replaceRestoreStr);

fs.writeFileSync('index.html', html);
console.log("Done patching PDF smart pagination");
