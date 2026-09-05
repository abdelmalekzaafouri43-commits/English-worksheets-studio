const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("jsdomError", (error) => {
  console.error("DOM Error Line", error.stack);
});
virtualConsole.on("error", (error) => {
  console.error("Window Error:", error);
});

const dom = new JSDOM(html, { runScripts: "dangerously", virtualConsole });

setTimeout(() => {
    console.log("JSDOM initialization complete.");
    process.exit(0);
}, 1000);
