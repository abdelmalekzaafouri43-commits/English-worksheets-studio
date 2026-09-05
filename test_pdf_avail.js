const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const dom = new JSDOM(`<!DOCTYPE html><html lang="en">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
</head>
<body></body>
</html>`, { runScripts: "dangerously", resources: "usable" });

dom.window.document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        console.log("jsPDF:", !!dom.window.jsPDF);
        console.log("jspdf:", !!dom.window.jspdf);
        process.exit(0);
    }, 1500);
});
