const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `        function onAiResponse(responseText) {
            const btn = document.getElementById('ai-button');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
            }

            clearTimeout(window.__genStepTimer1);
            clearTimeout(window.__genStepTimer2);
            
            // Aggressively strip markdown code block wrappers if the AI included them
            let formattedText = responseText.replace(/^\\x60\\x60\\x60(?:html)?\\s*/i, '').replace(/\\s*\\x60\\x60\\x60$/i, '');`;


const replaceStr = `        function onAiResponse(responseText) {
            const btn = document.getElementById('ai-button');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
            }

            clearTimeout(window.__genStepTimer1);
            clearTimeout(window.__genStepTimer2);
            
            // Aggressively strip markdown code block wrappers if the AI included them
            let formattedText = responseText.replace(/^\\x60\\x60\\x60(?:html)?\\s*/i, '').replace(/\\s*\\x60\\x60\\x60$/i, '');
            
            // Strip any conversational AI greetings that might appear before the first HTML tag
            const firstTagIndex = formattedText.indexOf('<');
            if (firstTagIndex > 0) {
                formattedText = formattedText.substring(firstTagIndex);
            }`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Done patching onAiResponse string stripping");
