const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const target = `                    </button>
                </div>
                \`;
            }
            
            originalWorksheetHTML = formattedText;`;

const replacement = `                    </button>
                </div>
                \`;
            } else {
                // Auto-embed Pollinations AI illustration based on worksheet topic if missing
                if (!formattedText.includes('<img') && userRequest) {
                    const encodedTopic = encodeURIComponent(userRequest.substring(0, 80) + " clean flat vector icon educational clipart white background");
                    const imageHtml = \`<div class="ws-block" style="text-align: center; margin-bottom: 20px; background: transparent; border: none; box-shadow: none; padding: 0;"><img src="https://image.pollinations.ai/prompt/\${encodedTopic}?width=400&height=400&nologo=true" style="max-width: 140px; border-radius: 16px; display: inline-block; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" alt="Educational Illustration"></div>\`;
                    
                    if (formattedText.includes('</h2>')) {
                        formattedText = formattedText.replace('</h2>', '</h2>\\n' + imageHtml);
                    } else {
                        formattedText = imageHtml + formattedText;
                    }
                }
            }
            
            originalWorksheetHTML = formattedText;`;

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync('index.html', content);
    console.log('Patched successfully');
} else {
    console.log('Target not found');
}
