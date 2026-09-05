const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `            6. EXTREME FORMATTING RULE: You MUST return ONLY valid, clean HTML. Absolutely NO markdown, NO markdown code blocks (\\&#96;\\&#96;\\&#96;html), NO **bold**, NO # headings, NO backticks. Do NOT wrap your output in code blocks. Ensure ALL text is inside appropriate tags (<p>, <li>, <span>, <div>). Ensure NO raw disorganized text floats outside of HTML tags.`;

const replaceStr = `            6. EXTREME FORMATTING RULE: You MUST return ONLY valid, clean HTML. Do NOT include ANY conversational text, greetings, pleasantries, or explanations (e.g. "Here is the worksheet you requested"). START IMMEDIATELY with the HTML code and END IMMEDIATELY after the HTML code. Absolutely NO markdown, NO markdown code blocks (\\&#96;\\&#96;\\&#96;html), NO **bold**, NO # headings, NO backticks. Do NOT wrap your output in code blocks. Ensure ALL text is inside appropriate tags (<p>, <li>, <span>, <div>). Ensure NO raw disorganized text floats outside of HTML tags.`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Done patching prompt greeting");
