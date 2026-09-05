const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
let el = dom.window.document.getElementById('slide-video-export-modal');
let parents = [];
while(el) {
    parents.push(el.tagName + (el.id ? '#' + el.id : ''));
    el = el.parentElement;
}
console.log(parents.join(" -> "));
