const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The issue is in the `onAiResponse` where we try to strip code blocks
const targetStr = `response.replace(/^\\\`\\\`\\\`(?:html)?\\s*/i, '').replace(/\\s*\\\`\\\`\\\`$/i, '');`;
const replaceStr = `response.replace(/^\\x60\\x60\\x60(?:html)?\\s*/i, '').replace(/\\s*\\x60\\x60\\x60$/i, '');`;

content = content.replace(targetStr, replaceStr);

// Also fix the prompt string
const promptTargetStr = `NO markdown code blocks (\`\`\`html)`;
const promptReplaceStr = `NO markdown code blocks`;
content = content.replace(promptTargetStr, promptReplaceStr);

fs.writeFileSync('index.html', content);
