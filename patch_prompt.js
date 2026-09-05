const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `            6. DO NOT use markdown formatting (no **bold**, no # headings, no backticks). Use standard HTML tags (<strong>, <em>, <span>).
            7. PROACTIVELY embed 1-2 relevant high-quality flat vector icons or illustrations based on the worksheet topic, even if the user hasn't explicitly requested them. Embed generative clipart using this format: <img src="https://image.pollinations.ai/prompt/{detailed-URL-encoded-description}%20clean%20flat%20vector%20icon%20educational%20clipart%20white%20background?width=400&height=400&nologo=true" style="max-width: 150px; border-radius: 12px; display: block; margin: 18px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" alt="Educational Icon"> (Ensure you append descriptive style keywords like "clean flat vector icon" to the prompt URL). For vocabulary matching or lists, you should also proactively use large emojis as inline icons next to the words (e.g., <span style="font-size: 38px;">🍎</span>).
            8. Ensure vocabulary, grammar rules, dialogues, and exercises are authentic, error-free, pedagogical, and completely organized.\`;`;

const replaceStr = `            6. EXTREME FORMATTING RULE: You MUST return ONLY valid, clean HTML. Absolutely NO markdown, NO markdown code blocks (\`\`\`html), NO **bold**, NO # headings, NO backticks. Do NOT wrap your output in code blocks. Ensure ALL text is inside appropriate tags (<p>, <li>, <span>, <div>). Ensure NO raw disorganized text floats outside of HTML tags.
            7. PROACTIVELY embed 1-2 relevant high-quality flat vector icons or illustrations based on the worksheet topic, even if the user hasn't explicitly requested them. Embed generative clipart using this format: <img src="https://image.pollinations.ai/prompt/{detailed-URL-encoded-description}%20clean%20flat%20vector%20icon%20educational%20clipart%20white%20background?width=400&height=400&nologo=true" style="max-width: 150px; border-radius: 12px; display: block; margin: 18px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" alt="Educational Icon"> (Ensure you append descriptive style keywords like "clean flat vector icon" to the prompt URL). For vocabulary matching or lists, you should also proactively use large emojis as inline icons next to the words (e.g., <span style="font-size: 38px;">🍎</span>).
            8. Ensure vocabulary, grammar rules, dialogues, and exercises are authentic, error-free, pedagogical, and completely organized. If generating a table, use proper HTML <table>, <tr>, <th>, <td> tags with inline styles for borders.\`;`;

html = html.replace(targetStr, replaceStr);

// Let's also patch the response handler to aggressively strip markdown code blocks just in case the LLM ignores the instruction.
const responseTargetStr = `            }
        }

        function onAiResponse(response) {
            clearTimeout(window.__genStepTimer1);
            clearTimeout(window.__genStepTimer2);`;

const responseReplaceStr = `            }
        }

        function onAiResponse(response) {
            clearTimeout(window.__genStepTimer1);
            clearTimeout(window.__genStepTimer2);
            
            // Aggressively strip markdown code block wrappers if the AI included them
            if (response.startsWith('\`\`\`')) {
                response = response.replace(/^\`\`\`(?:html)?\s*/i, '').replace(/\s*\`\`\`$/i, '');
            }
`;

html = html.replace(responseTargetStr, responseReplaceStr);

fs.writeFileSync('index.html', html);
console.log("Done patching AI prompt and response handler");
