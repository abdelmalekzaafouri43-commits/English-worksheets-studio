const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });

dom.window.document.addEventListener("DOMContentLoaded", () => {
    try {
        // mock slides
        dom.window.currentSlidesData = [{title: 'test'}];
        dom.window.openSlideVideoModal();
        let display = dom.window.document.getElementById('slide-video-export-modal').style.display;
        console.log("Modal display after open:", display);
        process.exit(0);
    } catch(e) {
        console.log("Error:", e);
        process.exit(1);
    }
});
