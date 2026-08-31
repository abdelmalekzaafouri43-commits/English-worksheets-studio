        const EDUCATIONAL_SAMPLE_LIBRARY = [
            {
                id: 'cafe_dialogue',
                category: '☕ Everyday English & Speaking',
                title: 'Ordering at a Café (Polite Requests)',
                desc: 'Conversational dialogue between a barista and a customer practicing modal verbs and ordering expressions.',
                text: 'Barista: "Good morning! What can I get started for you today?"\nCustomer: "Hi! Could I please have an iced oat latte and a blueberry muffin?"\nBarista: "Of course. Would you like that warmed up?"\nCustomer: "Yes, please! How much does that come to?"\nBarista: "That will be $6.50. You can tap your card right here. Have a wonderful day!"\nCustomer: "Thank you so much! You too."'
            },
            {
                id: 'past_continuous_story',
                category: '📖 Grammar & Reading Comprehension',
                title: 'The Stormy Night Adventure',
                desc: 'Short story practicing past continuous vs past simple tenses, descriptive adjectives, and reading comprehension.',
                text: 'Yesterday evening, Liam was reading a book by the fireplace while the rain was tapping against his window. Suddenly, the lights went out. While he was searching for a flashlight in the kitchen, he heard a soft knocking sound at the back door. When he opened the door cautiously, a wet, shivering golden puppy looked up at him wagging its tail.'
            },
            {
                id: 'travel_future_tenses',
                category: '✈️ Future Tenses (Will vs Going to)',
                title: 'Planning a Trip to London',
                desc: 'Contextual reading and grammar exercise contrasting future plans (be going to) and spontaneous decisions/predictions (will).',
                text: 'Next summer, Sarah is going to visit London with her family. They have already booked their flights and reserved a hotel near the River Thames. They are going to visit the British Museum and take a ride on the London Eye. Sarah thinks it will probably rain, so she will pack a sturdy umbrella and a warm jacket in her suitcase.'
            },
            {
                id: 'idioms_in_context',
                category: '🎯 Idioms & Figurative Language',
                title: 'Mastering Everyday English Idioms',
                desc: 'Practical usage of common English idioms like "piece of cake", "break a leg", and "under the weather".',
                text: '1. "Break a leg!" shouted Emma before David walked onto the stage for the school play.\n2. Don’t worry about the grammar test tomorrow; if you reviewed your irregular verbs, it will be a piece of cake.\n3. Maya stayed home from school today because she was feeling a bit under the weather with a sore throat.'
            },
            {
                id: 'animals_adjectives_fable',
                category: '🐾 Fable & Vocabulary',
                title: 'The Wise Owl and the Busy Squirrel',
                desc: 'Simple moral fable focusing on comparative and superlative adjectives, character traits, and reading inference.',
                text: 'In an ancient oak tree, a wise old owl watched the creatures of the forest. Down below, a nimble squirrel was gathering acorns as fast as he could. "Winter is coming," called the squirrel, "and I must be the most prepared animal in the woods!" The owl replied softly, "Preparation is wise, but do not forget to enjoy the beauty of today."'
            }
        ];

        let currentLoadedSample = null;

        function setGradeSegment(btn, grade) {
            document.querySelectorAll('.grade-seg-btn').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            applyGradePreset(grade);
        }

        function setPromptTopic(topic) {
            const textarea = document.getElementById('custom-prompt');
            if (!textarea) return;
            textarea.value = `Create an English language learning worksheet on ${topic} with a clear explanation/passage, a word bank, 4 comprehension/rule-check questions, and 5 fill-in-the-blank practice items with student answer lines.`;
            textarea.focus();
            showToast(`Loaded topic: ${topic}`, "💡");
        }

        function applyGradePreset(grade) {
            const textarea = document.getElementById('custom-prompt');
            if (!textarea) return;
            const currentVal = textarea.value.trim();
            let gradePrompt = "";

            if (grade === 'kindergarten') {
                gradePrompt = "for Young Learners & Phonics (Pre-A1/Kindergarten) featuring alphabet letter tracing, initial sound phonics, color/animal word matching, big fonts, and picture coloring boxes";
                // Auto adjust typography for young learners
                const fontSelect = document.getElementById('font-family-select');
                const sizeSelect = document.getElementById('font-size-select');
                if (fontSelect) fontSelect.value = "'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', sans-serif";
                if (sizeSelect) sizeSelect.value = "22px";
                updateWorksheetStyle();
            } else if (grade === 'elementary') {
                gradePrompt = "for Elementary English / A1-A2 ESL learners with simple present/past tenses, clear sentence unscrambling, vocabulary matching, a word bank, and fill-in blanks";
                const sizeSelect = document.getElementById('font-size-select');
                if (sizeSelect) sizeSelect.value = "18px";
                updateWorksheetStyle();
            } else if (grade === 'middle') {
                gradePrompt = "for Intermediate ESL / B1 English learners featuring an engaging short reading passage, irregular verbs, prepositions of time/place, multiple choice quiz, and short answer writing lines";
                const sizeSelect = document.getElementById('font-size-select');
                if (sizeSelect) sizeSelect.value = "18px";
                updateWorksheetStyle();
            } else if (grade === 'high') {
                gradePrompt = "for Upper-Intermediate & Advanced English / B2-C1 learners featuring complex reading analysis, phrasal verbs, idioms in context, error correction exercises, and a paragraph writing prompt";
                const fontSelect = document.getElementById('font-family-select');
                const sizeSelect = document.getElementById('font-size-select');
                if (fontSelect) fontSelect.value = "Georgia, 'Times New Roman', Times, serif";
                if (sizeSelect) sizeSelect.value = "14px";
                updateWorksheetStyle();
            }

            if (currentVal) {
                textarea.value = currentVal + ` (Proficiency Level: ${gradePrompt})`;
            } else {
                textarea.value = `Create an English language worksheet ${gradePrompt}.`;
            }
            textarea.focus();
            showToast(`Applied English ${grade.toUpperCase()} preset!`, "🎓");
        }

        function appendPromptFeature(feature) {
            const textarea = document.getElementById('custom-prompt');
            if (!textarea) return;
            const currentVal = textarea.value.trim();
            if (currentVal) {
                textarea.value = currentVal + `, and ${feature}`;
            } else {
                textarea.value = `Create a worksheet that ${feature}.`;
            }
            textarea.focus();
            showToast(`Added: ${feature}`, "✨");
        }

        function initSampleFeatures() {
            loadSavedTheme();
            renderSampleLibrary();
            setupDragAndDrop();
            updateWorksheetStyle();
            updateSavedCountBadges();
        }

        function renderSampleLibrary() {
            const list = document.getElementById('sample-library-list');
            if (!list) return;
            list.innerHTML = '';

            EDUCATIONAL_SAMPLE_LIBRARY.forEach(sample => {
                const item = document.createElement('div');
                item.className = 'sample-card-item';
                item.onclick = () => selectLibrarySample(sample.id);
                item.innerHTML = `
                    <div class="sample-card-title">
                        <span>${sample.title}</span>
                        <span style="font-size: 11px; color: #667eea; font-weight: 600;">${sample.category}</span>
                    </div>
                    <div class="sample-card-desc">${sample.desc}</div>
                    <div class="sample-card-text">${sample.text}</div>
                `;
                list.appendChild(item);
            });
        }

        function setupDragAndDrop() {
            const dropZone = document.getElementById('ai-drop-zone');
            if (!dropZone) return;

            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.add('drag-over');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dropZone.classList.remove('drag-over');
                }, false);
            });

            dropZone.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files && files.length > 0) {
                    processFile(files[0]);
                }
            }, false);
        }

        function triggerFileInput() {
            const input = document.getElementById('sample-file-input');
            if (input) {
                input.value = '';
                input.click();
            }
        }

        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                processFile(file);
            }
        }

        function processFile(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                if (!content || !content.trim()) {
                    alert("The uploaded file is empty.");
                    return;
                }
                setLoadedSample(file.name, content.trim(), 'Uploaded File');
            };
            reader.onerror = function() {
                alert("Failed to read the file. Please try a .txt, .md, or .csv file.");
            };
            reader.readAsText(file);
        }

        async function pasteClipboardSample() {
            let text = '';
            if (navigator.clipboard && navigator.clipboard.readText) {
                try {
                    text = await navigator.clipboard.readText();
                } catch (err) {
                    // Clipboard permission might be denied or unhandled in webview
                }
            }

            if (!text || !text.trim()) {
                const prompted = prompt("Paste your sample text, reading passage, or lesson material below:");
                if (prompted && prompted.trim()) {
                    text = prompted.trim();
                }
            }

            if (text && text.trim()) {
                setLoadedSample("Pasted Text Sample", text.trim(), "Clipboard");
            }
        }

        function openSampleLibrary() {
            const modal = document.getElementById('sample-library-modal');
            if (modal) modal.style.display = 'flex';
        }

        function closeSampleLibrary() {
            const modal = document.getElementById('sample-library-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleModalOverlayClick(e) {
            if (e.target.id === 'sample-library-modal') {
                closeSampleLibrary();
            }
        }

        function selectLibrarySample(sampleId) {
            const sample = EDUCATIONAL_SAMPLE_LIBRARY.find(s => s.id === sampleId);
            if (sample) {
                setLoadedSample(sample.title, sample.text, sample.category);
                closeSampleLibrary();
            }
        }

        function setLoadedSample(title, content, source) {
            currentLoadedSample = {
                title: title,
                content: content,
                source: source
            };

            const card = document.getElementById('loaded-sample-card');
            const titleEl = document.getElementById('sample-meta-title');
            const statsEl = document.getElementById('sample-meta-stats');
            const previewEl = document.getElementById('sample-preview-box');
            const promptInput = document.getElementById('custom-prompt');

            const wordCount = content.split(/\s+/).filter(Boolean).length;
            titleEl.textContent = title;
            statsEl.textContent = `(${wordCount} words)`;
            previewEl.textContent = content;
            card.style.display = 'block';

            // Auto-populate an intelligent default prompt based on the sample
            promptInput.value = `Using the imported sample "${title}", create a complete reading comprehension worksheet with 4 structured questions, 1 vocabulary exercise, and generate a relevant illustration at the top.`;
            
            promptInput.focus();
            promptInput.style.transition = 'border-color 0.3s, box-shadow 0.3s';
            promptInput.style.borderColor = '#667eea';
            promptInput.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.3)';
            setTimeout(() => {
                promptInput.style.borderColor = '';
                promptInput.style.boxShadow = '';
            }, 800);
        }

        function clearLoadedSample() {
            currentLoadedSample = null;
            const card = document.getElementById('loaded-sample-card');
            if (card) card.style.display = 'none';
            const promptInput = document.getElementById('custom-prompt');
            promptInput.value = '';
        }

        function transformSample(actionType) {
            if (!currentLoadedSample) return;
            const promptInput = document.getElementById('custom-prompt');
            const title = currentLoadedSample.title;

            switch(actionType) {
                case 'comprehension':
                    promptInput.value = `Based on the sample "${title}", generate a reading comprehension worksheet. Include the reading passage, 3 short-answer questions, and 2 true/false questions with answer lines.`;
                    break;
                case 'fill_blanks':
                    promptInput.value = `Based on the sample "${title}", create a 5-question fill-in-the-blanks grammar/vocabulary worksheet with a word bank box at the top.`;
                    break;
                case 'mcq':
                    promptInput.value = `Based on the sample "${title}", generate a 5-question multiple choice quiz. For each question, provide 4 options (A, B, C, D) with checkboxes.`;
                    break;
                case 'vocab':
                    promptInput.value = `Extract 5 key vocabulary words from the sample "${title}". Create a matching pairs worksheet with words in Column A and definitions in Column B.`;
                    break;
                case 'summary':
                    promptInput.value = `Based on the sample "${title}", create a critical thinking worksheet with a short summary writing prompt and 3 open-ended discussion questions.`;
                    break;
            }

            promptInput.focus();
            promptInput.style.borderColor = '#667eea';
            promptInput.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.3)';
            setTimeout(() => {
                promptInput.style.borderColor = '';
                promptInput.style.boxShadow = '';
            }, 800);
        }

        function resetFontSize() {
            const fontSizeSelect = document.getElementById('font-size-select');
            if (fontSizeSelect) {
                fontSizeSelect.value = '18px';
                updateWorksheetStyle();
                showToast("Font size reset to default (Medium)", "↺");
            }
        }

        function updateWorksheetStyle() {
            const borderStyle = document.getElementById('border-style-select').value;
            const fontFamily = document.getElementById('font-family-select').value;
            const fontSize = document.getElementById('font-size-select').value;
            const pageColor = document.getElementById('page-color-select').value;
            const previewArea = document.getElementById('a4-preview-area');
            
            // Remove previous border classes and apply selected one
            const borderClasses = ['border-none', 'border-classic', 'border-double', 'border-dashed', 'border-dotted', 'border-certificate', 'border-modern', 'border-bold'];
            borderClasses.forEach(cls => previewArea.classList.remove(cls));
            previewArea.classList.add(borderStyle);

            previewArea.style.fontFamily = fontFamily;
            previewArea.style.backgroundColor = pageColor;
            
            const textElements = previewArea.querySelectorAll('p, div, span, input, textarea, h3, h2, li');
            textElements.forEach(el => {
                if(el.tagName.toLowerCase() === 'h2') {
                    el.style.fontSize = `calc(${fontSize} + 8px)`;
                } else if (el.tagName.toLowerCase() === 'h3') {
                    el.style.fontSize = `calc(${fontSize} + 4px)`;
                } else {
                    el.style.fontSize = fontSize;
                }
                el.style.fontFamily = fontFamily;
            });
        }

        function askAITutor() {
            const btn = document.getElementById('ai-button');
            const customPromptInput = document.getElementById('custom-prompt');
            const userRequest = customPromptInput.value.trim();
            
            if (!userRequest && !currentLoadedSample) {
                alert("Please enter a prompt or import a sample to generate the worksheet!");
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '✨ AI is thinking... <span class="premium-pill">PRO</span>';
            
            // Add a thinking animation to the workspace
            const levelBody = document.getElementById('level-body');
            levelBody.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 150px; color: var(--text-muted); font-family: sans-serif;">
                    <div style="font-size: 24px; margin-bottom: 12px; animation: pulseGlow 1.5s infinite;">✨</div>
                    <div style="display: flex; align-items: center; font-size: 15px; font-weight: bold;">
                        <span>Generating worksheet content...</span>
                        <span class="typing-cursor" style="display:inline-block;width:8px;height:1em;background:var(--accent-primary);margin-left:8px;animation:blink 0.8s step-end infinite;vertical-align:middle;"></span>
                    </div>
                </div>
            `;
            
            let sampleContextInstruction = "";
            if (currentLoadedSample && currentLoadedSample.content) {
                sampleContextInstruction = `\n\n--- REFERENCE SAMPLE MATERIAL ---
Title: "${currentLoadedSample.title}"
Content:
"""
${currentLoadedSample.content}
"""
Instruction: You MUST base the worksheet directly on the reference sample material provided above according to the user's request.`;
            }

            const prompt = `You are an expert English Language Teacher (ESL / EFL / ELT) and educational worksheet designer. Create a professional, pedagogy-driven English language learning worksheet based exactly on this request: "${userRequest}". ${sampleContextInstruction}
            Format the response ENTIRELY in valid, clean HTML. 
            
            Strict Guidelines for English Worksheets:
            1. ALWAYS include a classic teacher & student header at the very top: <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px solid #ccc; padding-bottom: 12px; font-size: 15px;"><span><strong>Teacher:</strong> ___________________________</span><span><strong>Student:</strong> ___________________________</span><span><strong>Date:</strong> _________________</span></div>
            2. For complex or multi-part English exercises (e.g. Reading Passage, Vocabulary Word Bank, Grammar Rules, Fill-in-the-Blanks, Sentence Scramble, Multiple Choice, Writing Prompt), organize them clearly with section headings: <h3>Part 1: [Title]</h3>, <h3>Part 2: [Title]</h3>, etc.
            3. Use clean HTML tags: <h2> for main English worksheet title, <h3> for section instructions, <ol>/<ul>/<li> or <p> for questions. Add generous spacing and underline blanks (_______) or answer lines (<br><br>) for student written work.
            4. DO NOT use markdown formatting (no **bold**, no # headings). Use HTML <strong> or <em> instead.
            5. If an illustration helps reinforce the English vocabulary or reading story, embed it using: <img src="https://image.pollinations.ai/prompt/{detailed-URL-encoded-description}?width=600&height=400&nologo=true" style="max-width: 100%; border-radius: 12px; display: block; margin: 25px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" alt="Worksheet Image">
            6. If an image is not generated but a drawing/phonics/matching box is useful, use: <div class='image-placeholder' style='width: 100%; max-width: 300px; height: 150px; display: flex; margin: 20px auto;'>📷 Student Drawing / Picture Area</div>
            7. Ensure vocabulary, grammar explanations, and instructions are clear, pedagogical, natural, and error-free for English learners.`;

            if (window.AndroidAI) {
                window.AndroidAI.askGemini(prompt, "onAiResponse");
            } else {
                const apiKey = localStorage.getItem('web_gemini_api_key');
                if (!apiKey) {
                    document.getElementById('api-key-modal').style.display = 'flex';
                    btn.disabled = false;
                    btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
                    return;
                }
                
                fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7 }
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        onAiResponse(`API_ERROR: ${data.error.message}`);
                    } else if (data.candidates && data.candidates.length > 0) {
                        onAiResponse(data.candidates[0].content.parts[0].text);
                    } else {
                        onAiResponse("API_ERROR: Unknown response format.");
                    }
                })
                .catch(error => {
                    onAiResponse(`API_ERROR: ${error.message}`);
                });
            }
        }

        function openApiKeyModal() {
            const modal = document.getElementById('api-key-modal');
            const input = document.getElementById('web-api-key-input');
            const savedKey = localStorage.getItem('web_gemini_api_key');
            if (savedKey) {
                input.value = savedKey;
            }
            modal.style.display = 'flex';
        }

        function saveWebApiKey() {
            const input = document.getElementById('web-api-key-input');
            const key = input.value.trim();
            if (key) {
                localStorage.setItem('web_gemini_api_key', key);
                document.getElementById('api-key-modal').style.display = 'none';
                showToast("API Key saved successfully!", "🔑");
            } else {
                localStorage.removeItem('web_gemini_api_key');
                document.getElementById('api-key-modal').style.display = 'none';
                showToast("API Key cleared.", "🗑️");
            }
        }

        function generateOfflineWorksheetFallback(userQuery, sampleData) {
            const title = (sampleData && sampleData.title) ? sampleData.title : (userQuery ? userQuery.toUpperCase() : 'ENGLISH LANGUAGE PRACTICE');
            const topic = userQuery ? userQuery : (sampleData ? sampleData.title : 'General English Grammar & Reading');

            return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; font-size: 15px; color: #475569;">
                <span><strong>Teacher:</strong> ___________________________</span>
                <span><strong>Student:</strong> ___________________________</span>
                <span><strong>Date:</strong> _________________</span>
            </div>

            <h2 style="text-align: center; color: #0f172a; margin-bottom: 6px; font-size: 24px;">${title}</h2>
            <p style="text-align: center; color: #64748b; font-size: 14px; margin-bottom: 24px; font-style: italic;">Topic: ${topic}</p>

            <h3>Part 1: Key Vocabulary & Terminology</h3>
            <p><strong>Instructions:</strong> Read the words in the box below and complete each sentence with the correct term.</p>
            
            <div style="border: 2px dashed #94a3b8; padding: 14px 20px; border-radius: 12px; background: #f8fafc; margin-bottom: 20px; font-weight: 600; text-align: center; letter-spacing: 0.5px;">
                [ Context &bull; Practice &bull; Structure &bull; Knowledge &bull; Fluency &bull; Expression ]
            </div>

            <ol style="line-height: 2.2;">
                <li>Learning new vocabulary helps students improve their English ______________________ when speaking.</li>
                <li>Clear grammar rules provide a solid ______________________ for writing essays.</li>
                <li>Understanding words in ______________________ makes reading much easier and more natural.</li>
                <li>Daily speaking ______________________ builds confidence for real-life conversations.</li>
                <li>Creative writing allows learners to explore personal ______________________ through language.</li>
            </ol>

            <h3 style="margin-top: 28px;">Part 2: Reading & Comprehension</h3>
            <p><strong>Instructions:</strong> Read the short text below and answer the questions that follow in complete sentences.</p>
            
            <div style="background: #f1f5f9; padding: 18px 22px; border-left: 4px solid #2563eb; border-radius: 8px; margin-bottom: 20px; font-size: 14.5px; line-height: 1.6;">
                Language learning is an active and lifelong journey. By practicing reading, writing, listening, and speaking every day, students expand their comprehension and communication skills. Dedicated study habits, combined with interactive exercises, turn new concepts into permanent skills.
            </div>

            <ol style="line-height: 2.2;">
                <li>What are the four fundamental language skills mentioned in the passage?<br>__________________________________________________________________________________________</li>
                <li>Why is daily practice important for English learners?<br>__________________________________________________________________________________________</li>
            </ol>

            <h3 style="margin-top: 28px;">Part 3: Sentence Transformation & Writing</h3>
            <p><strong>Instructions:</strong> Rewrite each sentence below using your own words or answer the creative prompt.</p>
            
            <ol style="line-height: 2.4;">
                <li>Write 2 sentences describing your personal goals for learning English:<br>a) ______________________________________________________________________________________<br>b) ______________________________________________________________________________________</li>
            </ol>

            <div class='image-placeholder' style='width: 100%; max-width: 420px; height: 140px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 25px auto; background: #fafafa; color: #64748b; font-weight: 600;'>
                📷 Visual Corner: Draw or sketch a picture illustrating this topic
            </div>
            `;
        }

        function typewriteDOM(html, container, callback) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const sourceNodes = Array.from(doc.body.childNodes);
            
            container.innerHTML = '<div id="ws-content-root" style="color: black; padding: 10px;"></div>';
            const root = container.querySelector('#ws-content-root');
            
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.style.display = 'inline-block';
            cursor.style.width = '8px';
            cursor.style.height = '1em';
            cursor.style.backgroundColor = 'var(--accent-primary, #3b82f6)';
            cursor.style.marginLeft = '4px';
            cursor.style.animation = 'blink 0.8s step-end infinite';
            cursor.style.verticalAlign = 'middle';
            
            if (!document.getElementById('typing-cursor-style')) {
                const style = document.createElement('style');
                style.id = 'typing-cursor-style';
                style.innerHTML = '@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }';
                document.head.appendChild(style);
            }

            let queue = [];
            
            function enqueueNodes(nodes, targetParent) {
                for (let node of nodes) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        let text = node.textContent;
                        if (text.trim() !== "" || text.includes(' ')) {
                           queue.push({ type: 'text', parent: targetParent, text: text });
                        }
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        let clone = node.cloneNode(false);
                        queue.push({ type: 'element', parent: targetParent, element: clone });
                        enqueueNodes(node.childNodes, clone);
                    }
                }
            }
            
            enqueueNodes(sourceNodes, root);
            
            let qIdx = 0;
            let textIdx = 0;
            
            function processQueue() {
                if (qIdx >= queue.length) {
                    cursor.remove();
                    if (callback) callback();
                    return;
                }
                
                let item = queue[qIdx];
                
                if (item.type === 'element') {
                    item.parent.appendChild(item.element);
                    qIdx++;
                    processQueue();
                } else if (item.type === 'text') {
                    if (textIdx === 0) {
                        item.textNode = document.createTextNode('');
                        item.parent.appendChild(item.textNode);
                        item.parent.appendChild(cursor);
                    }
                    
                    if (textIdx < item.text.length) {
                        let chunk = 2; // Type 2 chars at a time for smooth speed
                        item.textNode.textContent += item.text.substr(textIdx, chunk);
                        textIdx += chunk;
                        
                        setTimeout(processQueue, 5); 
                    } else {
                        textIdx = 0;
                        qIdx++;
                        processQueue();
                    }
                }
            }
            
            processQueue();
        }

        function onAiResponse(responseText) {
            const btn = document.getElementById('ai-button');
            btn.disabled = false;
            btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
            
            const customPromptInput = document.getElementById('custom-prompt');
            const userRequest = customPromptInput ? customPromptInput.value.trim() : "";

            let formattedText = responseText.replace(/```html/g, '').replace(/```/g, '');

            // Detect API Key notice, quota, or network errors
            if (!formattedText || 
                formattedText.includes('API_ERROR:') || 
                formattedText.includes('API_KEY_MISSING:') || 
                formattedText.includes('API Error:') || 
                formattedText.includes('Error:') || 
                formattedText.includes('Please configure your GEMINI_API_KEY')) {
                
                showToast("API Notice: Loaded smart offline worksheet template!", "⚡");
                formattedText = generateOfflineWorksheetFallback(userRequest, currentLoadedSample);
            }
            
            originalWorksheetHTML = formattedText;

            const levelBody = document.getElementById('level-body');
            
            // Start the DOM typing animation instead of instant display
            typewriteDOM(formattedText, levelBody, () => {
                if (isEditMode) {
                    prepareWorksheetBlocksForEditing();
                }
                updateWorksheetStyle();
                updateQRCodePreview();
            });
        }

        // --- INTERACTIVE WORKSHEET EDITING & REORDERING ENGINE ---
        let isEditMode = false;
        let originalWorksheetHTML = "";
        let draggedBlock = null;

        function setWorksheetEditMode(enable) {
            isEditMode = enable;
            const previewBtn = document.getElementById('btn-mode-preview');
            const editBtn = document.getElementById('btn-mode-edit');
            const toolbar = document.getElementById('worksheet-editor-toolbar');
            const banner = document.getElementById('edit-mode-banner');
            const a4Area = document.getElementById('a4-preview-area');

            if (enable) {
                if (previewBtn) previewBtn.classList.remove('active');
                if (editBtn) editBtn.classList.add('active');
                if (toolbar) toolbar.style.display = 'flex';
                if (banner) banner.style.display = 'flex';
                if (a4Area) a4Area.classList.add('editing-mode-active');
                prepareWorksheetBlocksForEditing();
            } else {
                if (previewBtn) previewBtn.classList.add('active');
                if (editBtn) editBtn.classList.remove('active');
                if (toolbar) toolbar.style.display = 'none';
                if (banner) banner.style.display = 'none';
                if (a4Area) a4Area.classList.remove('editing-mode-active');
                cleanWorksheetForPreview();
            }
        }

        function prepareWorksheetBlocksForEditing() {
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            if (!root) return;

            // If not already structured into blocks, wrap child nodes into manageable blocks
            const existingBlocks = root.querySelectorAll('.ws-block');
            if (existingBlocks.length === 0 && root.children.length > 0) {
                // Collect direct children
                const children = Array.from(root.children);
                let currentGroup = [];
                let newFragment = document.createDocumentFragment();

                const flushGroup = () => {
                    if (currentGroup.length === 0) return;
                    const blockDiv = document.createElement('div');
                    blockDiv.className = 'ws-block';
                    currentGroup.forEach(node => blockDiv.appendChild(node));
                    newFragment.appendChild(blockDiv);
                    currentGroup = [];
                };

                children.forEach(child => {
                    const tag = child.tagName.toLowerCase();
                    // Split sections around headers or large blocks
                    if (tag === 'h2' || tag === 'h3' || tag === 'table' || tag === 'img' || tag === 'ol' || tag === 'ul' || child.classList.contains('image-placeholder')) {
                        flushGroup();
                        const singleBlock = document.createElement('div');
                        singleBlock.className = 'ws-block';
                        singleBlock.appendChild(child);
                        newFragment.appendChild(singleBlock);
                    } else {
                        currentGroup.push(child);
                    }
                });
                flushGroup();

                root.innerHTML = '';
                root.appendChild(newFragment);
            }

            // Now equip every .ws-block with interactive editing controls and drag-and-drop
            const blocks = root.querySelectorAll('.ws-block');
            blocks.forEach((block, index) => {
                block.setAttribute('contenteditable', 'true');
                block.setAttribute('spellcheck', 'true');
                block.setAttribute('draggable', 'true');

                // Remove existing controls if any
                const oldControls = block.querySelector('.ws-block-controls');
                if (oldControls) oldControls.remove();

                // Inject floating controls bar
                const controls = document.createElement('div');
                controls.className = 'ws-block-controls no-print';
                controls.setAttribute('contenteditable', 'false');
                controls.innerHTML = `
                    <span class="ws-drag-handle" title="Drag to reorder">⠿</span>
                    <button type="button" class="ws-ctrl-btn" onclick="moveBlockUp(this, event)" title="Move section up">⬆</button>
                    <button type="button" class="ws-ctrl-btn" onclick="moveBlockDown(this, event)" title="Move section down">⬇</button>
                    <button type="button" class="ws-ctrl-btn" onclick="addBlockBelow(this, event)" title="Add question/section below">➕</button>
                    <button type="button" class="ws-ctrl-btn danger" onclick="deleteBlock(this, event)" title="Delete section">🗑</button>
                `;
                block.appendChild(controls);

                // Drag and Drop event bindings
                block.ondragstart = (e) => {
                    draggedBlock = block;
                    block.classList.add('dragging');
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('text/plain', index);
                };

                block.ondragend = () => {
                    block.classList.remove('dragging');
                    draggedBlock = null;
                    document.querySelectorAll('.ws-block').forEach(b => {
                        b.classList.remove('drag-over-top', 'drag-over-bottom');
                    });
                };

                block.ondragover = (e) => {
                    e.preventDefault();
                    if (!draggedBlock || draggedBlock === block) return;
                    
                    const rect = block.getBoundingClientRect();
                    const midY = rect.top + rect.height / 2;
                    if (e.clientY < midY) {
                        block.classList.add('drag-over-top');
                        block.classList.remove('drag-over-bottom');
                    } else {
                        block.classList.add('drag-over-bottom');
                        block.classList.remove('drag-over-top');
                    }
                };

                block.ondragleave = () => {
                    block.classList.remove('drag-over-top', 'drag-over-bottom');
                };

                block.ondrop = (e) => {
                    e.preventDefault();
                    block.classList.remove('drag-over-top', 'drag-over-bottom');
                    if (!draggedBlock || draggedBlock === block) return;

                    // Capture initial rects of all sibling blocks for FLIP animation
                    const container = block.parentNode;
                    const siblings = Array.from(container.querySelectorAll('.ws-block'));
                    const initialRects = new Map();
                    siblings.forEach(s => initialRects.set(s, s.getBoundingClientRect()));

                    const rect = block.getBoundingClientRect();
                    const midY = rect.top + rect.height / 2;
                    if (e.clientY < midY) {
                        container.insertBefore(draggedBlock, block);
                    } else {
                        container.insertBefore(draggedBlock, block.nextSibling);
                    }

                    // Animate all blocks that shifted
                    siblings.forEach(s => {
                        const initRect = initialRects.get(s);
                        if (!initRect) return;
                        const finalRect = s.getBoundingClientRect();
                        const deltaY = initRect.top - finalRect.top;

                        if (Math.abs(deltaY) > 1) {
                            s.style.transition = 'none';
                            s.style.transform = `translateY(${deltaY}px)`;
                            if (s === draggedBlock) s.classList.add('reorder-active');

                            void s.offsetHeight; // Force reflow

                            s.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, box-shadow 0.35s ease';
                            s.style.transform = 'translateY(0)';

                            setTimeout(() => {
                                s.style.transition = '';
                                s.style.transform = '';
                                s.classList.remove('reorder-active');
                            }, 360);
                        }
                    });

                    highlightBlock(draggedBlock);
                };
            });
        }

        function cleanWorksheetForPreview() {
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            if (!root) return;

            const blocks = root.querySelectorAll('.ws-block');
            blocks.forEach(block => {
                block.removeAttribute('contenteditable');
                block.removeAttribute('draggable');
                const controls = block.querySelector('.ws-block-controls');
                if (controls) controls.remove();
            });
        }

        // Smooth FLIP Swap Animation for Block Reordering
        function animateBlockSwap(movingBlock, siblingBlock) {
            if (!movingBlock || !siblingBlock) return;

            const rectAInit = movingBlock.getBoundingClientRect();
            const rectBInit = siblingBlock.getBoundingClientRect();

            const parent = movingBlock.parentNode;
            const nextOfA = movingBlock.nextElementSibling;

            // Perform DOM swap
            if (nextOfA === siblingBlock) {
                parent.insertBefore(siblingBlock, movingBlock);
            } else {
                parent.insertBefore(movingBlock, siblingBlock);
            }

            const rectAFinal = movingBlock.getBoundingClientRect();
            const rectBFinal = siblingBlock.getBoundingClientRect();

            const deltaYA = rectAInit.top - rectAFinal.top;
            const deltaYB = rectBInit.top - rectBFinal.top;

            // Apply FLIP inverse transforms
            movingBlock.style.transition = 'none';
            siblingBlock.style.transition = 'none';
            movingBlock.style.transform = `translateY(${deltaYA}px)`;
            siblingBlock.style.transform = `translateY(${deltaYB}px)`;

            movingBlock.classList.add('reorder-active');
            siblingBlock.classList.add('reorder-active');

            void movingBlock.offsetHeight; // Force reflow

            const transitionStyle = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, box-shadow 0.35s ease';
            movingBlock.style.transition = transitionStyle;
            siblingBlock.style.transition = transitionStyle;

            movingBlock.style.transform = 'translateY(0)';
            siblingBlock.style.transform = 'translateY(0)';

            highlightBlock(movingBlock);

            setTimeout(() => {
                movingBlock.style.transition = '';
                siblingBlock.style.transition = '';
                movingBlock.style.transform = '';
                siblingBlock.style.transform = '';
                movingBlock.classList.remove('reorder-active');
                siblingBlock.classList.remove('reorder-active');
            }, 360);
        }

        function moveBlockUp(btn, e) {
            if (e) e.stopPropagation();
            const block = btn.closest('.ws-block');
            if (!block) return;
            const prev = block.previousElementSibling;
            if (prev && prev.classList.contains('ws-block')) {
                animateBlockSwap(block, prev);
            }
        }

        function moveBlockDown(btn, e) {
            if (e) e.stopPropagation();
            const block = btn.closest('.ws-block');
            if (!block) return;
            const next = block.nextElementSibling;
            if (next && next.classList.contains('ws-block')) {
                animateBlockSwap(next, block);
            }
        }

        function addBlockBelow(btn, e) {
            if (e) e.stopPropagation();
            const block = btn.closest('.ws-block');
            if (!block) return;

            const newBlock = document.createElement('div');
            newBlock.className = 'ws-block anim-insert';
            newBlock.innerHTML = `<p><strong>Question:</strong> Write your question here... ____________________________</p>`;
            block.parentNode.insertBefore(newBlock, block.nextSibling);

            prepareWorksheetBlocksForEditing();
            highlightBlock(newBlock);
            setTimeout(() => newBlock.classList.remove('anim-insert'), 400);
            newBlock.focus();
        }

        function deleteBlock(btn, e) {
            if (e) e.stopPropagation();
            const block = btn.closest('.ws-block');
            if (!block) return;

            block.classList.add('anim-delete');
            setTimeout(() => {
                block.remove();
            }, 300);
        }

        function highlightBlock(block) {
            if (!block) return;
            block.classList.remove('reorder-highlight');
            void block.offsetWidth; // Force reflow
            block.classList.add('reorder-highlight');
            setTimeout(() => {
                block.classList.remove('reorder-highlight');
            }, 600);
        }

        function addNewSectionBlock() {
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            if (!root) return;

            const newBlock = document.createElement('div');
            newBlock.className = 'ws-block anim-insert';
            newBlock.innerHTML = `
                <h3 style="margin-top: 15px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 5px;">Part New: Exercise Activity</h3>
                <p>1. Complete the sentence: _____________________________________________</p>
                <p>2. Complete the sentence: _____________________________________________</p>
            `;
            root.appendChild(newBlock);
            prepareWorksheetBlocksForEditing();
            highlightBlock(newBlock);
            setTimeout(() => newBlock.classList.remove('anim-insert'), 400);
            newBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        function resetWorksheetToOriginal() {
            if (!originalWorksheetHTML) {
                alert("No original AI generation to restore.");
                return;
            }
            if (confirm("Reset worksheet back to original AI generation? Any manual edits will be replaced.")) {
                const root = document.getElementById('level-body');
                root.innerHTML = '<div id="ws-content-root" style="color: black; padding: 10px;">' + originalWorksheetHTML + '</div>';
                if (isEditMode) {
                    prepareWorksheetBlocksForEditing();
                }
                updateWorksheetStyle();
            }
        }

        // Quick Rich Text & Formatting Execution
        function execFormat(cmd, value = null) {
            document.execCommand(cmd, false, value);
        }

        function insertPartHeading() {
            const headingHtml = `<h3 style="margin-top: 18px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 6px;">Part: Exercise Title Here</h3>`;
            insertHtmlAtCursor(headingHtml);
        }

        function insertQuestionItem() {
            const qHtml = `<p style="margin: 8px 0;"><strong>•</strong> Enter question description here: ________________________</p>`;
            insertHtmlAtCursor(qHtml);
        }

        function insertStudentBlankLine() {
            const blankHtml = ` __________________________ `;
            insertHtmlAtCursor(blankHtml);
        }

        function insertCheckboxOption() {
            const cbHtml = ` <span style="font-size: 15px; margin-right: 4px;">☐</span> (A) Option text here &nbsp;&nbsp; `;
            insertHtmlAtCursor(cbHtml);
        }

        function insertDrawingBox() {
            const boxHtml = `<div class="image-placeholder" style="width: 100%; max-width: 320px; height: 140px; margin: 15px auto; border: 2px dashed #94a3b8; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: #f8fafc; color: #64748b; font-size: 13px; font-weight: bold;">📷 Student Drawing / Picture Area</div>`;
            insertHtmlAtCursor(boxHtml);
        }

        function insertHtmlAtCursor(html) {
            const sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                const range = sel.getRangeAt(0);
                range.deleteContents();
                const el = document.createElement("div");
                el.innerHTML = html;
                const frag = document.createDocumentFragment();
                let node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            } else {
                addNewSectionBlock();
            }
        }

        // --- TEMPLATES LIBRARY ENGINE ---
        const WORKSHEET_LAYOUT_TEMPLATES = [
            {
                id: 'tmpl-2col-grammar',
                title: '2-Column Grammar & Rules',
                category: 'GRAMMAR',
                badgeBg: '#eff6ff',
                badgeColor: '#1d4ed8',
                icon: '📖',
                description: 'Side-by-side layout with target grammar rules on left and interactive practice sentences on right.',
                wireframe: '<b>[Left: Grammar Rule Box]</b><br>• Rule definition & formula<br>• Example sentences<br><b>[Right: Student Practice]</b><br>1. Fill-in line ________<br>2. Sentence rewrite',
                aiPrompt: 'Generate a 2-column grammar worksheet focusing on Present Perfect vs Past Simple. On the left side include target rules and 3 example sentences. On the right side include 5 fill-in-the-blank practice items.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 22px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <h2 style="text-align: center; color: #0f172a; margin-bottom: 4px; font-size: 24px;">ENGLISH GRAMMAR: PAST SIMPLE vs PRESENT PERFECT</h2>
                    <p style="text-align: center; color: #64748b; font-size: 13.5px; margin-bottom: 24px; font-style: italic;">Topic: Sentence Structure & Verb Tenses</p>

                    <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 20px; margin-bottom: 24px;">
                        <!-- Left Column: Grammar Reference Guide -->
                        <div style="border: 2px solid #2563eb; background: #f0f9ff; padding: 16px; border-radius: 12px;">
                            <h3 style="color: #1e40af; margin-top: 0; font-size: 16px;">💡 Grammar Reference Box</h3>
                            <p style="font-size: 13.5px; line-height: 1.5; color: #1e293b;">
                                <strong>Past Simple:</strong> Used for completed actions at a specific time in the past.<br>
                                <em>Formula: Subject + Verb-ed / Irregular</em><br>
                                📌 <u>Example:</u> She <strong>visited</strong> London last summer.
                            </p>
                            <hr style="border: 0; border-top: 1px dashed #93c5fd; margin: 12px 0;">
                            <p style="font-size: 13.5px; line-height: 1.5; color: #1e293b;">
                                <strong>Present Perfect:</strong> Used for actions connected to the present or unspecified time.<br>
                                <em>Formula: Subject + have/has + Past Participle</em><br>
                                📌 <u>Example:</u> She <strong>has visited</strong> London three times.
                            </p>
                        </div>

                        <!-- Right Column: Interactive Practice -->
                        <div>
                            <h3 style="margin-top: 0; font-size: 16px; color: #0f172a;">Part 1: Complete the Sentences</h3>
                            <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Complete with Past Simple or Present Perfect:</p>
                            <ol style="line-height: 2.3; font-size: 14px; padding-left: 20px;">
                                <li>I ____________________ (never / see) a real pyramid in person.</li>
                                <li>Yesterday, Sam ____________________ (buy) a new English dictionary.</li>
                                <li>We ____________________ (live) in this town since 2018.</li>
                                <li>They ____________________ (finish) their homework two hours ago.</li>
                                <li>____________________ you ever ____________________ (try) sushi?</li>
                            </ol>
                        </div>
                    </div>

                    <h3 style="margin-top: 24px; color: #0f172a;">Part 2: Sentence Transformation</h3>
                    <p style="font-size: 13.5px; color: #475569;">Rewrite each sentence changing it from Past Simple to Present Perfect using <strong>since</strong> or <strong>for</strong>:</p>
                    <ol style="line-height: 2.4; font-size: 14px; padding-left: 20px;">
                        <li>He started studying English 3 years ago.<br>➡️ He __________________________________________________________________________________________</li>
                        <li>They moved to Madrid in May.<br>➡️ They __________________________________________________________________________________________</li>
                    </ol>
                    `;
                }
            },
            {
                id: 'tmpl-vocab-flashcards',
                title: 'Vocabulary Flashcards & Word Grid',
                category: 'VOCABULARY',
                badgeBg: '#fef3c7',
                badgeColor: '#b45309',
                icon: '🎴',
                description: '6 printable visual card blocks with vocabulary word box, definition space, example sentence line, and sketch frame.',
                wireframe: '<b>[2x3 Flashcard Grid]</b><br>• Card 1: Term + Definition + Sentence<br>• Card 2: Term + Definition + Sentence<br>• Includes drawing/sketch frame for memory',
                aiPrompt: 'Generate a vocabulary flashcard worksheet with 6 key terms about Environmental Science. Include word, definition, context sentence, and visual prompt.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <h2 style="text-align: center; color: #0f172a; margin-bottom: 4px; font-size: 24px;">KEY VOCABULARY FLASHCARDS</h2>
                    <p style="text-align: center; color: #64748b; font-size: 13.5px; margin-bottom: 20px; font-style: italic;">Topic: Target Academic Vocabulary & Definitions</p>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                        <!-- Flashcard 1 -->
                        <div style="border: 2px dashed #3b82f6; border-radius: 12px; padding: 14px; background: #fafafa;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                                <span style="font-weight: 800; font-size: 16px; color: #1e3a8a;">1. ECOSYSTEM</span>
                                <span style="font-size: 11px; font-weight: 700; background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 10px;">Noun</span>
                            </div>
                            <p style="font-size: 13px; color: #334155; margin-bottom: 8px;"><strong>Definition:</strong> A biological community of interacting organisms and their physical environment.</p>
                            <p style="font-size: 13px; color: #475569;"><strong>Example:</strong> "Coral reefs are among the most diverse ______________________ on Earth."</p>
                            <div style="border: 1px dashed #cbd5e1; height: 60px; border-radius: 8px; margin-top: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #94a3b8;">
                                ✏️ Sketch / Visual Association
                            </div>
                        </div>

                        <!-- Flashcard 2 -->
                        <div style="border: 2px dashed #10b981; border-radius: 12px; padding: 14px; background: #fafafa;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                                <span style="font-weight: 800; font-size: 16px; color: #065f46;">2. SUSTAINABLE</span>
                                <span style="font-size: 11px; font-weight: 700; background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 10px;">Adjective</span>
                            </div>
                            <p style="font-size: 13px; color: #334155; margin-bottom: 8px;"><strong>Definition:</strong> Able to be maintained at a certain rate without depleting natural resources.</p>
                            <p style="font-size: 13px; color: #475569;"><strong>Example:</strong> "Solar energy is a clean and ______________________ power source."</p>
                            <div style="border: 1px dashed #cbd5e1; height: 60px; border-radius: 8px; margin-top: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #94a3b8;">
                                ✏️ Sketch / Visual Association
                            </div>
                        </div>

                        <!-- Flashcard 3 -->
                        <div style="border: 2px dashed #f59e0b; border-radius: 12px; padding: 14px; background: #fafafa;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                                <span style="font-weight: 800; font-size: 16px; color: #78350f;">3. CONSERVATION</span>
                                <span style="font-size: 11px; font-weight: 700; background: #fef3c7; color: #92400e; padding: 2px 8px; border-radius: 10px;">Noun</span>
                            </div>
                            <p style="font-size: 13px; color: #334155; margin-bottom: 8px;"><strong>Definition:</strong> Prevention of wasteful use of a resource or protection of wildlife.</p>
                            <p style="font-size: 13px; color: #475569;"><strong>Example:</strong> "Water ______________________ is crucial during dry summer months."</p>
                            <div style="border: 1px dashed #cbd5e1; height: 60px; border-radius: 8px; margin-top: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #94a3b8;">
                                ✏️ Sketch / Visual Association
                            </div>
                        </div>

                        <!-- Flashcard 4 -->
                        <div style="border: 2px dashed #8b5cf6; border-radius: 12px; padding: 14px; background: #fafafa;">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                                <span style="font-weight: 800; font-size: 16px; color: #5b21b6;">4. BIODIVERSITY</span>
                                <span style="font-size: 11px; font-weight: 700; background: #ede9fe; color: #5b21b6; padding: 2px 8px; border-radius: 10px;">Noun</span>
                            </div>
                            <p style="font-size: 13px; color: #334155; margin-bottom: 8px;"><strong>Definition:</strong> The variety of life in the world or in a particular habitat.</p>
                            <p style="font-size: 13px; color: #475569;"><strong>Example:</strong> "Rainforests are famous for their high ______________________."</p>
                            <div style="border: 1px dashed #cbd5e1; height: 60px; border-radius: 8px; margin-top: 8px; display: flex; align-items: center; justify-content: center; font-size: 11px; color: #94a3b8;">
                                ✏️ Sketch / Visual Association
                            </div>
                        </div>
                    </div>
                    `;
                }
            },
            {
                id: 'tmpl-reading-evidence',
                title: 'Reading Passage & Evidence Analysis',
                category: 'READING',
                badgeBg: '#f3e8ff',
                badgeColor: '#6b21a8',
                icon: '📰',
                description: 'Featured reading passage header, key vocabulary word bank, text-evidence questions, and open reflection.',
                wireframe: '<b>[Passage Header Box]</b><br>• Reading text block<br><b>[Part 1: Text Evidence Qs]</b><br>• Direct citation lines<br><b>[Part 2: Creative Reflection]</b>',
                aiPrompt: 'Generate a reading comprehension worksheet about Renewable Energy. Include a short passage, key vocabulary bank, 3 text-evidence questions, and 1 creative reflection writing prompt.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 22px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <h2 style="text-align: center; color: #0f172a; margin-bottom: 4px; font-size: 24px;">READING & TEXT EVIDENCE ANALYSIS</h2>
                    <p style="text-align: center; color: #64748b; font-size: 13.5px; margin-bottom: 20px; font-style: italic;">Topic: Renewable Energy & Future Innovations</p>

                    <!-- Featured Passage Block -->
                    <div style="background: #f8fafc; border-left: 5px solid #2563eb; padding: 18px 22px; border-radius: 8px; margin-bottom: 22px; font-size: 14.5px; line-height: 1.65; color: #1e293b;">
                        <h3 style="margin-top: 0; color: #1e40af; font-size: 17px;">Harnessing the Sun and Wind</h3>
                        As global energy demands continue to rise, scientists and engineers are turning to renewable energy sources to power our world. Unlike fossil fuels—such as coal and oil—which release harmful carbon emissions, solar and wind power generate electricity without polluting the atmosphere. Solar panels convert sunlight directly into electric current using photovoltaic cells, while giant wind turbines convert kinetic air movement into mechanical energy. Modern battery storage technology now allows cities to store excess solar energy for use during cloudy days and nighttime. Transitioning to 100% clean energy is not only vital for combating climate change, but it also creates thousands of new green jobs in technology and manufacturing.
                    </div>

                    <h3 style="color: #0f172a; margin-top: 22px;">Part 1: Text Evidence & Comprehension</h3>
                    <p style="font-size: 13.5px; color: #475569;">Answer each question citing specific details from the reading passage:</p>

                    <ol style="line-height: 2.2; font-size: 14px; padding-left: 20px;">
                        <li>According to the passage, how do photovoltaic cells on solar panels generate electricity?<br>__________________________________________________________________________________________</li>
                        <li>What is the main environmental advantage of solar and wind power over fossil fuels?<br>__________________________________________________________________________________________</li>
                        <li>Why is modern battery storage technology essential for solar energy reliance?<br>__________________________________________________________________________________________</li>
                    </ol>

                    <h3 style="color: #0f172a; margin-top: 24px;">Part 2: Critical Thinking & Reflection</h3>
                    <p style="font-size: 13.5px; color: #475569;">Write 2-3 sentences explaining how your school or community could adopt more clean energy habits:</p>
                    <div style="border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px; background: #ffffff; margin-top: 10px;">
                        __________________________________________________________________________________________<br><br>
                        __________________________________________________________________________________________
                    </div>
                    `;
                }
            },
            {
                id: 'tmpl-matching-columns',
                title: 'Matching Columns & Vocabulary Match',
                category: 'VOCABULARY',
                badgeBg: '#dcfce7',
                badgeColor: '#15803d',
                icon: '🔗',
                description: 'Interactive matching layout with Column A (Terms), Column B (Definitions), match key boxes, and sentence application.',
                wireframe: '<b>[Matching Table]</b><br>Col A: Terms (A-E) | Col B: Definitions (1-5)<br><b>[Matching Answer Key]</b><br>A -> [  ], B -> [  ]<br><b>[Part 2: Sentence Creation]</b>',
                aiPrompt: 'Generate a matching columns worksheet with 5 academic vocabulary terms and definitions, an answer matching key, and 2 sentence completion prompts.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 22px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <h2 style="text-align: center; color: #0f172a; margin-bottom: 4px; font-size: 24px;">TERMINOLOGY MATCHING WORKSHEET</h2>
                    <p style="text-align: center; color: #64748b; font-size: 13.5px; margin-bottom: 22px; font-style: italic;">Topic: Essential Academic Terminology & Definitions</p>

                    <h3 style="color: #0f172a; margin-top: 16px;">Part 1: Match the Terms to their Correct Definition</h3>
                    <p style="font-size: 13.5px; color: #475569;">Write the matching number (1-5) in the bracket next to each lettered term:</p>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                        <thead>
                            <tr style="background: #f1f5f9; text-align: left;">
                                <th style="padding: 10px; border: 1px solid #cbd5e1; width: 40%;">Column A (Terms)</th>
                                <th style="padding: 10px; border: 1px solid #cbd5e1;">Column B (Definitions)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>A. Hypothesis</strong> [ _____ ]</td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">1. Facts, figures, or information collected for analysis.</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>B. Variable</strong> [ _____ ]</td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">2. A testable prediction or educated guess about an outcome.</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>C. Data</strong> [ _____ ]</td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">3. A factor, trait, or condition that can exist in differing amounts.</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>D. Analysis</strong> [ _____ ]</td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">4. A summary of results based on evidence and experimentation.</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;"><strong>E. Conclusion</strong> [ _____ ]</td>
                                <td style="padding: 12px; border: 1px solid #cbd5e1;">5. Detailed examination of elements or structure of something.</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 style="color: #0f172a; margin-top: 24px;">Part 2: Use the Words in Sentences</h3>
                    <p style="font-size: 13.5px; color: #475569;">Choose two words from Column A and write an original sentence for each:</p>
                    <ol style="line-height: 2.4; font-size: 14px; padding-left: 20px;">
                        <li>Word 1 (__________________): _____________________________________________________________________</li>
                        <li>Word 2 (__________________): _____________________________________________________________________</li>
                    </ol>
                    `;
                }
            },
            {
                id: 'tmpl-math-drill-grid',
                title: 'Math & STEM Drill Grid',
                category: 'MATH',
                badgeBg: '#e0f2fe',
                badgeColor: '#0369a1',
                icon: '📐',
                description: 'Grid of 6 math problem cards featuring student score/timer box, step-by-step working area, and final answer box.',
                wireframe: '<b>[Header: Score / Time Box]</b><br>Score: ___/6 | Time: ___min<br><b>[3x2 Math Grid Cards]</b><br>• Step-by-step working space<br>• Final answer box [ Ans: ___ ]',
                aiPrompt: 'Generate a math drill worksheet with 6 word problems about fractions and decimals. Include working area for step-by-step calculations and answer boxes.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; background: #f0f9ff; border: 2px solid #0284c7; padding: 12px 20px; border-radius: 12px; margin-bottom: 22px;">
                        <div>
                            <h2 style="margin: 0; font-size: 20px; color: #0369a1;">MATH DRILL & PROBLEM SOLVING</h2>
                            <p style="margin: 2px 0 0; font-size: 12.5px; color: #0c4a6e;">Topic: Multi-Step Word Problems & Calculations</p>
                        </div>
                        <div style="display: flex; gap: 14px; font-weight: 700; font-size: 13px; color: #0369a1;">
                            <span style="background: #ffffff; padding: 6px 12px; border-radius: 8px; border: 1px solid #bae6fd;">⏱️ Time: _______</span>
                            <span style="background: #ffffff; padding: 6px 12px; border-radius: 8px; border: 1px solid #bae6fd;">💯 Score: ___ / 6</span>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 20px;">
                        <!-- Problem 1 -->
                        <div style="border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; background: #ffffff;">
                            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 6px;">Problem #1:</div>
                            <p style="font-size: 13.5px; color: #334155; margin-bottom: 12px; line-height: 1.4;">
                                A bakery used 3.75 kg of flour on Monday and 2.45 kg on Tuesday. How much flour was used in total?
                            </p>
                            <div style="border: 1px dashed #94a3b8; height: 75px; border-radius: 8px; background: #fafafa; padding: 6px; font-size: 11px; color: #94a3b8;">
                                📝 Working Space:
                            </div>
                            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                                <div style="border: 2px solid #0284c7; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; color: #0369a1;">
                                    Answer: ________________
                                </div>
                            </div>
                        </div>

                        <!-- Problem 2 -->
                        <div style="border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; background: #ffffff;">
                            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 6px;">Problem #2:</div>
                            <p style="font-size: 13.5px; color: #334155; margin-bottom: 12px; line-height: 1.4;">
                                Sarah has $45.00. She bought 3 notebooks for $4.50 each. How much money does she have remaining?
                            </p>
                            <div style="border: 1px dashed #94a3b8; height: 75px; border-radius: 8px; background: #fafafa; padding: 6px; font-size: 11px; color: #94a3b8;">
                                📝 Working Space:
                            </div>
                            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                                <div style="border: 2px solid #0284c7; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; color: #0369a1;">
                                    Answer: ________________
                                </div>
                            </div>
                        </div>

                        <!-- Problem 3 -->
                        <div style="border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; background: #ffffff;">
                            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 6px;">Problem #3:</div>
                            <p style="font-size: 13.5px; color: #334155; margin-bottom: 12px; line-height: 1.4;">
                                A rectangular garden is 12 meters long and 8.5 meters wide. Calculate the total area in square meters.
                            </p>
                            <div style="border: 1px dashed #94a3b8; height: 75px; border-radius: 8px; background: #fafafa; padding: 6px; font-size: 11px; color: #94a3b8;">
                                📝 Working Space:
                            </div>
                            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                                <div style="border: 2px solid #0284c7; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; color: #0369a1;">
                                    Answer: ________________
                                </div>
                            </div>
                        </div>

                        <!-- Problem 4 -->
                        <div style="border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; background: #ffffff;">
                            <div style="font-weight: 700; font-size: 14px; color: #0f172a; margin-bottom: 6px;">Problem #4:</div>
                            <p style="font-size: 13.5px; color: #334155; margin-bottom: 12px; line-height: 1.4;">
                                If a train travels at an average speed of 85 km/h, how far will it travel in 3.5 hours?
                            </p>
                            <div style="border: 1px dashed #94a3b8; height: 75px; border-radius: 8px; background: #fafafa; padding: 6px; font-size: 11px; color: #94a3b8;">
                                📝 Working Space:
                            </div>
                            <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
                                <div style="border: 2px solid #0284c7; padding: 4px 12px; border-radius: 6px; font-weight: 700; font-size: 13px; color: #0369a1;">
                                    Answer: ________________
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }
            },
            {
                id: 'tmpl-mind-map',
                title: 'Mind Map & Essay Planning Sheet',
                category: 'GRAMMAR',
                badgeBg: '#fce7f3',
                badgeColor: '#be185d',
                icon: '🧠',
                description: 'Central topic graphic node with 4 branching detail boxes, vocabulary word bank, and draft writing lines.',
                wireframe: '<b>[Central Topic Node]</b><br>4 branching supporting detail boxes<br><b>[Part 2: Draft Paragraph]</b><br>Ruled writing lines below',
                aiPrompt: 'Generate an essay planning mind map worksheet about "The Importance of Friendship". Include central topic box, 4 detail branches, and ruled lines for paragraph drafting.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 22px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <h2 style="text-align: center; color: #0f172a; margin-bottom: 4px; font-size: 24px;">MIND MAP & ESSAY ORGANIZER</h2>
                    <p style="text-align: center; color: #64748b; font-size: 13.5px; margin-bottom: 22px; font-style: italic;">Topic: Brainstorming & Paragraph Structure</p>

                    <!-- Central Mind Map Layout -->
                    <div style="border: 2px dashed #ec4899; padding: 18px; border-radius: 16px; background: #fff5f8; margin-bottom: 24px;">
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="display: inline-block; border: 3px solid #db2777; background: #ffffff; padding: 10px 24px; border-radius: 30px; font-weight: 800; font-size: 16px; color: #9d174d; box-shadow: 0 4px 10px rgba(219, 39, 119, 0.15);">
                                🎯 Main Topic: ___________________________________
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                            <div style="background: #ffffff; border: 1.5px solid #f472b6; border-radius: 12px; padding: 12px;">
                                <strong style="color: #be185d; font-size: 13px;">Branch 1: Key Point / Reason</strong>
                                <p style="font-size: 12.5px; color: #64748b; margin: 6px 0 0;">__________________________________________________<br>__________________________________________________</p>
                            </div>
                            <div style="background: #ffffff; border: 1.5px solid #f472b6; border-radius: 12px; padding: 12px;">
                                <strong style="color: #be185d; font-size: 13px;">Branch 2: Example or Evidence</strong>
                                <p style="font-size: 12.5px; color: #64748b; margin: 6px 0 0;">__________________________________________________<br>__________________________________________________</p>
                            </div>
                            <div style="background: #ffffff; border: 1.5px solid #f472b6; border-radius: 12px; padding: 12px;">
                                <strong style="color: #be185d; font-size: 13px;">Branch 3: Supporting Detail</strong>
                                <p style="font-size: 12.5px; color: #64748b; margin: 6px 0 0;">__________________________________________________<br>__________________________________________________</p>
                            </div>
                            <div style="background: #ffffff; border: 1.5px solid #f472b6; border-radius: 12px; padding: 12px;">
                                <strong style="color: #be185d; font-size: 13px;">Branch 4: Conclusion / Summary</strong>
                                <p style="font-size: 12.5px; color: #64748b; margin: 6px 0 0;">__________________________________________________<br>__________________________________________________</p>
                            </div>
                        </div>
                    </div>

                    <h3 style="color: #0f172a; margin-top: 20px;">Part 2: Draft Your Paragraph</h3>
                    <p style="font-size: 13.5px; color: #475569;">Use your mind map ideas above to write a complete paragraph (4-6 sentences):</p>
                    <div style="line-height: 2.3; font-size: 14px; font-family: inherit;">
                        ________________________________________________________________________________________________________<br>
                        ________________________________________________________________________________________________________<br>
                        ________________________________________________________________________________________________________<br>
                        ________________________________________________________________________________________________________
                    </div>
                    `;
                }
            },
            {
                id: 'tmpl-phonics-handwriting',
                title: 'Phonics & Letter Handwriting Practice',
                category: 'PHONICS',
                badgeBg: '#e0e7ff',
                badgeColor: '#3730a3',
                icon: '✏️',
                description: 'Large handwriting guidelines with dashed center line, letter tracing boxes, and phonics illustration corner.',
                wireframe: '<b>[Phonics Banner]</b><br>• Letter tracing guidelines (dashed middle)<br>• Word-picture matching boxes<br>• Drawing corner',
                aiPrompt: 'Generate a early reader phonics worksheet for the letter "Cc" with letter tracing lines, 3 C-words with pictures, and a drawing box.',
                getHTML: function() {
                    return `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 22px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; font-size: 14px; color: #475569;">
                        <span><strong>Teacher:</strong> ___________________________</span>
                        <span><strong>Student:</strong> ___________________________</span>
                        <span><strong>Date:</strong> _________________</span>
                    </div>

                    <div style="text-align: center; margin-bottom: 20px;">
                        <h2 style="color: #0f172a; margin-bottom: 4px; font-size: 24px;">PHONICS & HANDWRITING PRACTICE</h2>
                        <span style="background: #e0e7ff; color: #3730a3; padding: 4px 16px; border-radius: 20px; font-weight: 700; font-size: 13px;">Focus Letter: Cc</span>
                    </div>

                    <div style="display: flex; gap: 20px; align-items: center; justify-content: center; margin-bottom: 24px; background: #f8fafc; padding: 16px; border-radius: 14px; border: 2px dashed #818cf8;">
                        <div style="font-size: 54px; font-weight: 900; color: #4338ca; letter-spacing: 4px;">Cc</div>
                        <div style="font-size: 14px; color: #3730a3; font-weight: 600;">
                            "C" makes the sound /k/ as in <strong>Cat</strong>, <strong>Car</strong>, and <strong>Cup</strong>!
                        </div>
                    </div>

                    <h3 style="color: #0f172a; margin-top: 18px;">Part 1: Handwriting Tracing Practice</h3>
                    <p style="font-size: 13.5px; color: #475569;">Trace and write the uppercase and lowercase letters neatly across the lines:</p>

                    <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; margin-bottom: 22px;">
                        <div style="border-bottom: 2px solid #94a3b8; border-top: 2px solid #94a3b8; padding: 12px 0; position: relative; margin-bottom: 16px;">
                            <div style="position: absolute; top: 50%; width: 100%; border-top: 1px dashed #c7d2fe;"></div>
                            <span style="font-size: 28px; color: #a5b4fc; font-family: monospace; letter-spacing: 20px;">C C C C C C C C</span>
                        </div>
                        <div style="border-bottom: 2px solid #94a3b8; border-top: 2px solid #94a3b8; padding: 12px 0; position: relative;">
                            <div style="position: absolute; top: 50%; width: 100%; border-top: 1px dashed #c7d2fe;"></div>
                            <span style="font-size: 28px; color: #a5b4fc; font-family: monospace; letter-spacing: 20px;">c c c c c c c c</span>
                        </div>
                    </div>

                    <h3 style="color: #0f172a; margin-top: 20px;">Part 2: Read and Color</h3>
                    <p style="font-size: 13.5px; color: #475569;">Circle the words that begin with the /k/ sound:</p>
                    <div style="display: flex; justify-style: space-around; font-size: 18px; font-weight: 700; color: #1e1b4b; background: #f1f5f9; padding: 14px; border-radius: 10px;">
                        <span>🐱 Cat</span>
                        <span>🐶 Dog</span>
                        <span>☕ Cup</span>
                        <span>🚗 Car</span>
                        <span>☀️ Sun</span>
                    </div>
                    `;
                }
            }
        ];

        let currentTemplateFilterCategory = 'ALL';

        function openTemplateLibraryModal() {
            renderTemplateLibraryGrid('ALL');
            const modal = document.getElementById('template-library-modal');
            if (modal) modal.classList.add('show');
        }

        function closeTemplateLibraryModal() {
            const modal = document.getElementById('template-library-modal');
            if (modal) modal.classList.remove('show');
        }

        function handleTemplateLibraryOverlayClick(event) {
            if (event.target && event.target.id === 'template-library-modal') {
                closeTemplateLibraryModal();
            }
        }

        function filterTemplateCategory(category, tabBtn) {
            currentTemplateFilterCategory = category;
            if (tabBtn) {
                document.querySelectorAll('.template-filter-tab').forEach(b => b.classList.remove('active'));
                tabBtn.classList.add('active');
            }
            renderTemplateLibraryGrid(category);
        }

        function renderTemplateLibraryGrid(categoryFilter) {
            const grid = document.getElementById('template-library-grid');
            if (!grid) return;

            let filtered = WORKSHEET_LAYOUT_TEMPLATES;
            if (categoryFilter && categoryFilter !== 'ALL') {
                filtered = WORKSHEET_LAYOUT_TEMPLATES.filter(t => t.category === categoryFilter);
            }

            if (filtered.length === 0) {
                grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 30px;">No templates found in this category.</div>`;
                return;
            }

            grid.innerHTML = filtered.map(tmpl => `
                <div class="template-card">
                    <div>
                        <div class="template-card-header">
                            <span style="font-size: 26px;">${tmpl.icon}</span>
                            <span class="template-card-badge" style="background: ${tmpl.badgeBg}; color: ${tmpl.badgeColor};">${tmpl.category}</span>
                        </div>
                        <div class="template-card-title">${tmpl.title}</div>
                        <div class="template-card-desc">${tmpl.description}</div>
                        <div class="template-preview-wireframe">${tmpl.wireframe}</div>
                    </div>
                    <div class="template-actions">
                        <button type="button" class="template-btn-apply" onclick="applyTemplateToCanvas('${tmpl.id}')" title="Load layout directly onto A4 paper">🚀 Apply to Canvas</button>
                        <button type="button" class="template-btn-ai" onclick="generateWithTemplateAI('${tmpl.id}')" title="Pre-fill generator prompt">✨ AI Generator</button>
                    </div>
                </div>
            `).join('');
        }

        function applyTemplateToCanvas(templateId) {
            const tmpl = WORKSHEET_LAYOUT_TEMPLATES.find(t => t.id === templateId);
            if (!tmpl) return;

            const root = document.getElementById('level-body');
            if (!root) return;

            const templateHTML = tmpl.getHTML();
            root.innerHTML = templateHTML;
            originalWorksheetHTML = templateHTML;

            closeTemplateLibraryModal();
            showToast(`📐 Applied '${tmpl.title}' template layout!`, "✨");

            if (isEditMode) {
                prepareWorksheetBlocksForEditing();
            }

            const a4Area = document.getElementById('a4-preview-area');
            if (a4Area) {
                a4Area.scrollIntoView({ behavior: 'smooth' });
            }
        }

        function generateWithTemplateAI(templateId) {
            const tmpl = WORKSHEET_LAYOUT_TEMPLATES.find(t => t.id === templateId);
            if (!tmpl) return;

            const promptInput = document.getElementById('custom-prompt');
            if (promptInput) {
                promptInput.value = tmpl.aiPrompt;
                promptInput.focus();
                
                promptInput.style.transition = 'border-color 0.3s, box-shadow 0.3s';
                promptInput.style.borderColor = 'var(--accent-primary)';
                promptInput.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.25)';
                setTimeout(() => {
                    promptInput.style.borderColor = '';
                    promptInput.style.boxShadow = '';
                }, 800);
            }

            closeTemplateLibraryModal();
            showToast(`✨ Pre-filled generator with '${tmpl.title}' structure!`, "🚀");
        }

        // --- THEMATIC ILLUSTRATION STUDIO ENGINE ---
        let currentSelectedIllustrationPreset = 'phonics_cat';
        let currentSelectedPrompt = 'a cute cartoon cat for a phonics lesson';

        function openIllustrationModal() {
            const modal = document.getElementById('illustration-modal');
            if (modal) {
                modal.classList.add('show');
            }
            const promptInput = document.getElementById('illustration-prompt-input');
            const mainPrompt = document.getElementById('custom-prompt');
            if (promptInput && mainPrompt && mainPrompt.value.trim() && !promptInput.value.trim()) {
                promptInput.value = mainPrompt.value.trim();
                currentSelectedPrompt = mainPrompt.value.trim();
            }
        }

        function closeIllustrationModal() {
            const modal = document.getElementById('illustration-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        function handleIllustrationOverlayClick(event) {
            if (event.target && event.target.id === 'illustration-modal') {
                closeIllustrationModal();
            }
        }

        function selectIllustrationPreset(presetKey, promptText) {
            currentSelectedIllustrationPreset = presetKey;
            currentSelectedPrompt = promptText;
            
            document.querySelectorAll('.illustration-preset-card').forEach(card => card.classList.remove('active'));
            const selectedCard = document.getElementById('preset-' + presetKey.replace(/_/g, '-'));
            if (selectedCard) selectedCard.classList.add('active');

            const input = document.getElementById('illustration-prompt-input');
            if (input) input.value = promptText;
        }

        function useQuickPrompt(promptText) {
            const input = document.getElementById('illustration-prompt-input');
            if (input) input.value = promptText;
            currentSelectedPrompt = promptText;
            selectIllustrationPreset('phonics_cat', promptText);
        }

        function generateGraphicIllustrationHTML(presetKey, promptText, frameStyle, sizeCategory) {
            const promptLower = (promptText || '').toLowerCase();

            let widthStyle = 'max-width: 220px;';
            if (sizeCategory === 'small') widthStyle = 'max-width: 140px;';
            else if (sizeCategory === 'large') widthStyle = 'max-width: 320px;';
            else if (sizeCategory === 'full') widthStyle = 'max-width: 100%;';

            let imageSrc = '';
            let captionText = promptText || 'Thematic Illustration';

            if (presetKey === 'phonics_cat' || promptLower.includes('cat') || promptLower.includes('phonics') || promptLower.includes('alphabet')) {
                imageSrc = 'illustrations/img_phonics_cat.jpg';
                captionText = promptText || '🐱 Phonics & Reading Assistant';
            } else if (presetKey === 'science_lab' || promptLower.includes('science') || promptLower.includes('lab') || promptLower.includes('chemistry')) {
                imageSrc = 'illustrations/img_science_lab.jpg';
                captionText = promptText || '🧪 Science Laboratory Corner';
            } else {
                return createDynamicSvgIllustration(presetKey, promptText, frameStyle, widthStyle);
            }

            return `
            <div class="worksheet-embedded-illustration style-${frameStyle}" style="${widthStyle}">
                <div class="illustration-controls-overlay no-print">
                    <button type="button" onclick="moveIllustration(this, 'up')" title="Move Up">⬆️</button>
                    <button type="button" onclick="moveIllustration(this, 'down')" title="Move Down">⬇️</button>
                    <button type="button" onclick="deleteIllustration(this)" title="Delete">🗑️</button>
                </div>
                <img src="${imageSrc}" alt="${captionText}" onerror="this.parentElement.outerHTML=createDynamicSvgIllustration('${presetKey}', '${captionText}', '${frameStyle}', '${widthStyle}')">
                <div class="illustration-caption">${captionText}</div>
            </div>
            `;
        }

        function createDynamicSvgIllustration(presetKey, promptText, frameStyle, widthStyle) {
            const title = promptText || 'Thematic Illustration';
            let primaryColor = '#2563eb';
            let iconEmoji = '🎨';

            const p = title.toLowerCase();
            if (p.includes('math') || p.includes('shape') || presetKey === 'math_shapes') {
                primaryColor = '#8b5cf6';
                iconEmoji = '📐';
            } else if (p.includes('space') || p.includes('rocket') || presetKey === 'space_explorer') {
                primaryColor = '#0284c7';
                iconEmoji = '🚀';
            } else if (p.includes('castle') || p.includes('dragon') || presetKey === 'storybook_castle') {
                primaryColor = '#d97706';
                iconEmoji = '🏰';
            } else if (p.includes('jungle') || p.includes('safari') || p.includes('lion') || presetKey === 'jungle_safari') {
                primaryColor = '#16a34a';
                iconEmoji = '🦁';
            }

            const svg = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; border-radius: 12px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);"><rect width="400" height="240" rx="14" fill="#f8fafc" stroke="${primaryColor}" stroke-width="3" stroke-dasharray="6,4"/><circle cx="200" cy="95" r="48" fill="${primaryColor}" opacity="0.12"/><text x="200" y="112" font-size="52" text-anchor="middle">${iconEmoji}</text><text x="200" y="175" font-size="15" font-weight="bold" fill="#0f172a" text-anchor="middle">${title}</text><text x="200" y="200" font-size="12" fill="#64748b" text-anchor="middle">A4 Classroom Learning Vector</text></svg>`;

            return `
            <div class="worksheet-embedded-illustration style-${frameStyle}" style="${widthStyle}">
                <div class="illustration-controls-overlay no-print">
                    <button type="button" onclick="moveIllustration(this, 'up')" title="Move Up">⬆️</button>
                    <button type="button" onclick="moveIllustration(this, 'down')" title="Move Down">⬇️</button>
                    <button type="button" onclick="deleteIllustration(this)" title="Delete">🗑️</button>
                </div>
                ${svg}
                <div class="illustration-caption">${title}</div>
            </div>
            `;
        }

        function confirmEmbedIllustration() {
            const promptInput = document.getElementById('illustration-prompt-input');
            const promptText = promptInput ? promptInput.value.trim() : currentSelectedPrompt;
            
            const position = document.getElementById('illustration-position-select').value;
            const sizeCat = document.getElementById('illustration-size-select').value;
            const frameStyle = document.getElementById('illustration-frame-select').value;

            const html = generateGraphicIllustrationHTML(currentSelectedIllustrationPreset, promptText, frameStyle, sizeCat);

            const root = document.getElementById('level-body');
            if (!root) return;

            if (position === 'top-header') {
                const header = root.querySelector('h2') || root.firstElementChild;
                if (header) {
                    header.insertAdjacentHTML('afterend', html);
                } else {
                    root.insertAdjacentHTML('afterbegin', html);
                }
            } else if (position === 'top-right') {
                const title = root.querySelector('h2');
                if (title) {
                    title.insertAdjacentHTML('beforebegin', `<div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;"><div>${title.outerHTML}</div>${html}</div>`);
                    title.remove();
                } else {
                    root.insertAdjacentHTML('afterbegin', html);
                }
            } else if (position === 'bottom-drawing') {
                root.insertAdjacentHTML('beforeend', html);
            } else {
                const headings = root.querySelectorAll('h3');
                if (headings.length > 1) {
                    headings[1].insertAdjacentHTML('beforebegin', html);
                } else if (headings.length === 1) {
                    headings[0].insertAdjacentHTML('afterend', html);
                } else {
                    root.insertAdjacentHTML('beforeend', html);
                }
            }

            closeIllustrationModal();
            showToast("🎨 Thematic illustration embedded into worksheet!", "✨");

            if (isEditMode) {
                prepareWorksheetBlocksForEditing();
            }
        }

        function moveIllustration(btn, direction) {
            const item = btn.closest('.worksheet-embedded-illustration');
            if (!item) return;
            if (direction === 'up' && item.previousElementSibling) {
                item.parentNode.insertBefore(item, item.previousElementSibling);
            } else if (direction === 'down' && item.nextElementSibling) {
                item.parentNode.insertBefore(item.nextElementSibling, item);
            }
        }

        function deleteIllustration(btn) {
            const item = btn.closest('.worksheet-embedded-illustration');
            if (item && confirm("Remove this illustration from worksheet?")) {
                item.remove();
                showToast("Illustration removed", "🗑️");
            }
        }

        // --- THEME SWITCHER ENGINE ---
        const THEMES_CONFIG = {
            sapphire: {
                name: 'Sapphire',
                dotColor: '#38bdf8'
            },
            icewhite: {
                name: 'Ice White',
                dotColor: '#7dd3fc'
            },
            emerald: {
                name: 'Emerald',
                dotColor: '#34d399'
            },
            amethyst: {
                name: 'Amethyst',
                dotColor: '#c084fc'
            },
            amber: {
                name: 'Sunset Amber',
                dotColor: '#fbbf24'
            },
            obsidian: {
                name: 'Midnight Obsidian',
                dotColor: '#818cf8'
            }
        };

        function toggleThemeMenu(event) {
            if (event) event.stopPropagation();
            const menu = document.getElementById('theme-dropdown-menu');
            if (menu) {
                menu.classList.toggle('show');
            }
        }

        function closeThemeMenu() {
            const menu = document.getElementById('theme-dropdown-menu');
            if (menu) {
                menu.classList.remove('show');
            }
        }

        function setTheme(themeKey, showNotification = true) {
            if (!THEMES_CONFIG[themeKey]) themeKey = 'sapphire';
            const body = document.body;
            
            // Remove existing theme classes
            const allThemeClasses = ['theme-sapphire', 'theme-icewhite', 'theme-emerald', 'theme-amethyst', 'theme-amber', 'theme-obsidian', 'dark-mode'];
            allThemeClasses.forEach(cls => body.classList.remove(cls));
            
            // Apply new theme
            body.classList.add(`theme-${themeKey}`);
            if (themeKey === 'obsidian') {
                body.classList.add('dark-mode');
            }

            // Update Header Display
            const label = document.getElementById('current-theme-label');
            const dot = document.getElementById('header-theme-dot');
            if (label) label.innerText = THEMES_CONFIG[themeKey].name;
            if (dot) dot.style.background = THEMES_CONFIG[themeKey].dotColor;

            // Update Active State on Header Swatches
            const swatchBtns = document.querySelectorAll('.theme-chip-btn');
            swatchBtns.forEach(btn => {
                if (btn.id === `swatch-${themeKey}`) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Update Active State in Menu (if present)
            const optionBtns = document.querySelectorAll('.theme-option-btn');
            optionBtns.forEach(btn => {
                if (btn.getAttribute('data-theme') === themeKey) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Persist to local storage
            try {
                localStorage.setItem('user_app_theme', themeKey);
            } catch (e) {
                // Ignore storage errors in restricted contexts
            }

            if (showNotification) {
                showToast(`Applied ${THEMES_CONFIG[themeKey].name} Theme`, "🎨");
            }
        }

        function loadSavedTheme() {
            try {
                const saved = localStorage.getItem('user_app_theme');
                if (saved && THEMES_CONFIG[saved]) {
                    setTheme(saved, false);
                    return;
                }
            } catch(e) {}
            // Default to Sapphire
            setTheme('sapphire', false);
        }

        // Close theme menu when clicking outside
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.theme-selector-container');
            if (container && !container.contains(e.target)) {
                closeThemeMenu();
            }
        });

        function openPrintPreviewModal() {
            if (isEditMode) setWorksheetEditMode(false);

            updateWatermarkPreview();
            updateQRCodePreview();

            // Sync modal controls with workspace controls
            const mainWatermark = document.getElementById('acc-pdf-watermark');
            const modalWatermark = document.getElementById('preview-watermark-select');
            if (mainWatermark && modalWatermark) {
                modalWatermark.value = mainWatermark.value || 'NONE';
            }

            const mainQR = document.getElementById('acc-pdf-qr-toggle');
            const modalQR = document.getElementById('preview-qr-toggle');
            if (mainQR && modalQR) {
                modalQR.checked = mainQR.checked;
            }

            renderPrintPreviewCanvas();

            const modal = document.getElementById('print-preview-modal');
            if (modal) {
                modal.classList.add('show');
            }
        }

        function renderPrintPreviewCanvas() {
            const source = document.getElementById('a4-preview-area');
            const target = document.getElementById('modal-a4-preview-frame');
            if (!source || !target) return;
            target.innerHTML = source.innerHTML;
        }

        function closePrintPreviewModal() {
            const modal = document.getElementById('print-preview-modal');
            if (modal) {
                modal.classList.remove('show');
            }
        }

        function handlePrintPreviewOverlayClick(event) {
            if (event.target && event.target.id === 'print-preview-modal') {
                closePrintPreviewModal();
            }
        }

        function syncModalWatermarkToWorkspace() {
            const modalWatermark = document.getElementById('preview-watermark-select');
            const mainWatermark = document.getElementById('acc-pdf-watermark');
            if (modalWatermark && mainWatermark) {
                mainWatermark.value = modalWatermark.value;
                updateWatermarkPreview();
                renderPrintPreviewCanvas();
            }
        }

        function syncModalQRToWorkspace() {
            const modalQR = document.getElementById('preview-qr-toggle');
            const mainQR = document.getElementById('acc-pdf-qr-toggle');
            if (modalQR && mainQR) {
                mainQR.checked = modalQR.checked;
                updateQRCodePreview();
                renderPrintPreviewCanvas();
            }
        }

        function confirmPrintFromPreview() {
            closePrintPreviewModal();
            setTimeout(printPage, 150);
        }

        function printPage() {
            const wasEditing = isEditMode;
            if (wasEditing) setWorksheetEditMode(false);

            setTimeout(() => {
                if (window.AndroidAI && window.AndroidAI.printWorksheet) {
                    window.AndroidAI.printWorksheet("EduWorksheet");
                } else {
                    window.print(); // Fallback for pure web
                }
                if (wasEditing) {
                    setTimeout(() => setWorksheetEditMode(true), 1000);
                }
            }, 50);
        }

        // --- ACCORDION CONTROLLER ENGINE ---
        function toggleAccordion(itemId) {
            const item = document.getElementById(itemId);
            if (!item) return;

            const isCurrentlyActive = item.classList.contains('active');
            
            // Close all accordion items for clean single-focus
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });

            if (!isCurrentlyActive) {
                item.classList.add('active');

                // Special setup per accordion pane
                if (itemId === 'acc-item-save') {
                    autoPopulateSaveAccordionFields();
                } else if (itemId === 'acc-item-saved-list') {
                    renderAccordionSavedList();
                } else if (itemId === 'acc-item-pdf') {
                    autoPopulatePdfFilename();
                }
            }
        }

        function openAccordionItem(itemId) {
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });
            const item = document.getElementById(itemId);
            if (item) {
                item.classList.add('active');
                if (itemId === 'acc-item-save') autoPopulateSaveAccordionFields();
                if (itemId === 'acc-item-saved-list') renderAccordionSavedList();
                if (itemId === 'acc-item-pdf') autoPopulatePdfFilename();
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        function autoPopulateSaveAccordionFields() {
            const root = document.getElementById('level-body');
            const titleInput = document.getElementById('acc-save-title');
            const catInput = document.getElementById('acc-save-category');

            if (titleInput && (!titleInput.value || titleInput.value.startsWith('Custom Worksheet'))) {
                let autoTitle = "";
                if (root) {
                    const firstHeader = root.querySelector('h1, h2, h3, strong, p');
                    if (firstHeader && firstHeader.innerText.trim()) {
                        autoTitle = firstHeader.innerText.trim().replace(/^Part\s*(\d+|\w+)\s*[:.-]?\s*/i, '').slice(0, 45);
                    }
                }
                if (!autoTitle) {
                    const promptVal = document.getElementById('custom-prompt') ? document.getElementById('custom-prompt').value.trim() : "";
                    if (promptVal) autoTitle = promptVal.slice(0, 35) + "...";
                    else autoTitle = "Classroom Worksheet - " + new Date().toLocaleDateString();
                }
                titleInput.value = autoTitle;
            }

            if (catInput && !catInput.value) {
                catInput.value = "General Practice";
            }
        }

        function autoPopulatePdfFilename() {
            const filenameInput = document.getElementById('acc-pdf-filename');
            const titleInput = document.getElementById('acc-save-title');
            if (filenameInput && titleInput && titleInput.value) {
                const sanitized = titleInput.value.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30);
                filenameInput.value = (sanitized || 'Classroom_Worksheet') + '.pdf';
            }
        }

        function downloadPDFFromAccordion() {
            const filenameInput = document.getElementById('acc-pdf-filename');
            const customName = (filenameInput && filenameInput.value.trim()) ? filenameInput.value.trim() : 'Classroom_Worksheet.pdf';
            downloadPDF(customName);
        }

        function confirmSaveWorksheetFromAccordion() {
            const root = document.getElementById('level-body');
            const textContent = root ? root.innerText.trim() : "";
            if (!root || !textContent || textContent.includes("Your generated worksheet will appear here...")) {
                showToast("Please generate or create a worksheet before saving.", "⚠️");
                return;
            }

            const titleInput = document.getElementById('acc-save-title');
            const catInput = document.getElementById('acc-save-category');
            const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : ("Worksheet - " + new Date().toLocaleDateString());
            const category = (catInput && catInput.value.trim()) ? catInput.value.trim() : "General";

            saveWorksheetData(title, category);

            // Button feedback
            const saveBtn = document.getElementById('acc-save-btn');
            if (saveBtn) {
                const origText = saveBtn.innerHTML;
                saveBtn.innerHTML = `<span>✅ Saved to Library!</span>`;
                setTimeout(() => { saveBtn.innerHTML = origText; }, 2200);
            }
        }

        function saveAsQuickDraft() {
            const root = document.getElementById('level-body');
            const textContent = root ? root.innerText.trim() : "";
            if (!root || !textContent || textContent.includes("Your generated worksheet will appear here...")) {
                showToast("Please generate or create a worksheet before saving.", "⚠️");
                return;
            }
            const title = "Draft - " + new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            saveWorksheetData(title, "Draft");
            showToast("Quick draft saved!", "💾");
        }

        function renderAccordionSavedList() {
            const container = document.getElementById('accordion-saved-list');
            if (!container) return;

            const list = getSavedWorksheets();
            const searchInput = document.getElementById('acc-saved-search');
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

            const filtered = query 
                ? list.filter(item => (item.title && item.title.toLowerCase().includes(query)) || (item.category && item.category.toLowerCase().includes(query)))
                : list;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 24px 12px; color: var(--text-muted); background: var(--input-bg); border-radius: 12px;">
                        <div style="font-size: 24px; margin-bottom: 6px;">📂</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 3px;">No Saved Worksheets ${query ? 'Found' : 'Yet'}</div>
                        <div style="font-size: 11.5px;">${query ? 'Try a different search keyword.' : 'Save your active worksheet above to build your classroom library!'}</div>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.html || '';
                const previewSnippet = tempDiv.innerText.trim().slice(0, 100) || 'Worksheet Content';

                return `
                    <div style="background: var(--input-bg); border: 1px solid var(--input-border); border-radius: 12px; padding: 10px 12px; display: flex; align-items: center; justify-content: space-between; gap: 10px; transition: all 0.2s ease;">
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                                <div style="font-weight: 700; font-size: 13.5px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    ${escapeHtml(item.title)}
                                </div>
                                <span class="sample-badge" style="font-size: 9px; padding: 1px 6px;">${escapeHtml(item.category || 'General')}</span>
                            </div>
                            <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                🕒 ${escapeHtml(item.date || '')} • ${escapeHtml(previewSnippet)}
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <button type="button" onclick="loadSavedWorksheet('${item.id}')" class="editor-btn primary" style="padding: 5px 12px; font-size: 11.5px;" title="Load worksheet">
                                👁️ Load
                            </button>
                            <button type="button" onclick="deleteSavedWorksheet('${item.id}', event)" class="editor-btn danger" style="padding: 4px 8px; font-size: 11px;" title="Delete worksheet">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function triggerImportBackup() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const imported = JSON.parse(event.target.result);
                        if (Array.isArray(imported)) {
                            const current = getSavedWorksheets();
                            const merged = [...imported, ...current.filter(c => !imported.some(i => i.id === c.id))];
                            setSavedWorksheets(merged);
                            renderAccordionSavedList();
                            showToast(`Successfully imported ${imported.length} worksheets!`, "📥");
                        } else {
                            showToast("Invalid backup JSON format", "⚠️");
                        }
                    } catch(err) {
                        showToast("Error parsing backup file", "⚠️");
                    }
                };
                reader.readAsText(file);
            };
            input.click();
        }

        function saveWorksheetData(title, category) {
            const root = document.getElementById('level-body');
            if (!root) return;

            const wasEditing = isEditMode;
            if (wasEditing) cleanWorksheetForPreview();

            const borderVal = document.getElementById('border-style-select') ? document.getElementById('border-style-select').value : 'border-classic';
            const fontVal = document.getElementById('font-family-select') ? document.getElementById('font-family-select').value : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            const sizeVal = document.getElementById('font-size-select') ? document.getElementById('font-size-select').value : '18px';
            const pageColorVal = document.getElementById('page-color-select') ? document.getElementById('page-color-select').value : 'white';

            const newItem = {
                id: currentLoadedWorksheetId || ('ws_' + Date.now()),
                title: title,
                category: category,
                date: new Date().toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now(),
                borderStyle: borderVal,
                fontFamily: fontVal,
                fontSize: sizeVal,
                pageColor: pageColorVal,
                html: root.innerHTML,
                originalRaw: originalWorksheetHTML || root.innerHTML
            };

            let list = getSavedWorksheets();
            const existingIdx = list.findIndex(item => item.id === newItem.id);
            if (existingIdx >= 0) {
                list[existingIdx] = newItem;
            } else {
                list.unshift(newItem);
            }

            setSavedWorksheets(list);
            currentLoadedWorksheetId = newItem.id;

            if (wasEditing) prepareWorksheetBlocksForEditing();

            renderAccordionSavedList();
            showToast(`"${title}" saved to library!`, "💾");
        }

        function updateWatermarkPreview() {
            const select = document.getElementById('acc-pdf-watermark');
            const customGroup = document.getElementById('custom-watermark-group');
            const customInput = document.getElementById('acc-pdf-custom-text');
            const overlay = document.getElementById('a4-watermark-overlay');
            const previewArea = document.getElementById('a4-preview-area');

            if (!select || !overlay || !previewArea) return;

            let text = select.value;
            if (text === 'CUSTOM') {
                if (customGroup) customGroup.style.display = 'block';
                text = customInput ? customInput.value.trim().toUpperCase() : '';
            } else {
                if (customGroup) customGroup.style.display = 'none';
            }

            if (text && text !== 'NONE') {
                overlay.innerText = text;
                previewArea.classList.add('has-watermark');
            } else {
                overlay.innerText = '';
                previewArea.classList.remove('has-watermark');
            }
        }

        function generateWorksheetShareUrl() {
            const root = document.getElementById('level-body');
            const contentHtml = root ? root.innerHTML : '';
            const titleEl = root ? root.querySelector('h1, h2, h3') : null;
            const title = titleEl ? titleEl.innerText : 'Worksheet';
            const payload = {
                title: title,
                html: contentHtml,
                time: Date.now()
            };
            try {
                const jsonStr = JSON.stringify(payload);
                const encoded = btoa(encodeURIComponent(jsonStr));
                const baseUrl = window.location.origin + window.location.pathname;
                return baseUrl + '#ws=' + encoded;
            } catch(e) {
                return window.location.href;
            }
        }

        function updateQRCodePreview() {
            const toggle = document.getElementById('acc-pdf-qr-toggle');
            const previewArea = document.getElementById('a4-preview-area');
            const qrBox = document.getElementById('qrcode-box');
            if (!previewArea || !qrBox) return;

            if (toggle && toggle.checked) {
                previewArea.classList.add('has-qr');
                qrBox.innerHTML = '';
                const shareUrl = generateWorksheetShareUrl();
                
                try {
                    if (window.QRCode) {
                        new QRCode(qrBox, {
                            text: shareUrl,
                            width: 54,
                            height: 54,
                            colorDark : "#0f172a",
                            colorLight : "#ffffff",
                            correctLevel : QRCode.CorrectLevel.M
                        });
                    } else {
                        const qrImg = document.createElement('img');
                        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`;
                        qrImg.alt = "Digital Worksheet QR Code";
                        qrBox.appendChild(qrImg);
                    }
                } catch(err) {
                    const qrImg = document.createElement('img');
                    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`;
                    qrImg.alt = "Digital Worksheet QR Code";
                    qrBox.appendChild(qrImg);
                }
            } else {
                previewArea.classList.remove('has-qr');
            }
        }

        function checkAndLoadSharedWorksheetHash() {
            if (window.location.hash && window.location.hash.startsWith('#ws=')) {
                try {
                    const rawHash = window.location.hash.substring(4);
                    const decodedJson = decodeURIComponent(atob(rawHash));
                    const data = JSON.parse(decodedJson);
                    if (data && data.html) {
                        const levelBody = document.getElementById('level-body');
                        if (levelBody) {
                            levelBody.innerHTML = data.html;
                            showToast(`Loaded shared worksheet: "${data.title || 'Worksheet'}"`, "📱");
                            updateWorksheetStyle();
                            setTimeout(updateQRCodePreview, 300);
                        }
                    }
                } catch(e) {
                    console.error("Failed to decode shared worksheet link", e);
                }
            }
        }

        function downloadPDF(filenameOverride) {
            const btn = document.getElementById('download-btn');
            if (btn) {
                btn.disabled = true;
                btn.innerText = '⏳ Generating PDF...';
            }

            const wasEditing = isEditMode;
            if (wasEditing) setWorksheetEditMode(false);

            // Determine active watermark text
            const select = document.getElementById('acc-pdf-watermark');
            const customInput = document.getElementById('acc-pdf-custom-text');
            let watermarkText = "";
            if (select && select.value !== 'NONE') {
                if (select.value === 'CUSTOM' && customInput) {
                    watermarkText = customInput.value.trim().toUpperCase();
                } else {
                    watermarkText = select.value.toUpperCase();
                }
            }
            
            const element = document.getElementById('a4-preview-area');
            const targetFilename = filenameOverride || 'Classroom_Worksheet.pdf';
            const opt = {
                margin:       10,
                filename:     targetFilename.endsWith('.pdf') ? targetFilename : (targetFilename + '.pdf'),
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            const restoreState = () => {
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = '📥 Download PDF';
                }
                if (wasEditing) setWorksheetEditMode(true);
            };

            setTimeout(() => {
                const worker = html2pdf().set(opt).from(element).toPdf().get('pdf').then(function (pdf) {
                    const totalPages = pdf.internal.getNumberOfPages();
                    for (let i = 1; i <= totalPages; i++) {
                        pdf.setPage(i);

                        // Draw centered translucent watermark if enabled
                        if (watermarkText) {
                            try {
                                pdf.saveState();
                                pdf.setFontSize(54);
                                pdf.setTextColor(170, 180, 195);
                                if (pdf.setGState && pdf.GState) {
                                    pdf.setGState(new pdf.GState({ opacity: 0.18 }));
                                }
                                const pageWidth = pdf.internal.pageSize.getWidth();
                                const pageHeight = pdf.internal.pageSize.getHeight();
                                pdf.text(watermarkText, pageWidth / 2, pageHeight / 2, {
                                    align: 'center',
                                    angle: 35
                                });
                                pdf.restoreState();
                            } catch(e) {
                                console.log("PDF watermark error", e);
                            }
                        }

                        pdf.setFontSize(10);
                        pdf.setTextColor(100);
                        const text = 'Page ' + i + ' of ' + totalPages;
                        const pageWidth = pdf.internal.pageSize.getWidth();
                        const pageHeight = pdf.internal.pageSize.getHeight();
                        // Calculate position: right-aligned, 5mm from bottom right
                        pdf.text(text, pageWidth - 10, pageHeight - 5, { align: 'right' });
                    }
                });

                if (window.AndroidAI && window.AndroidAI.savePdf) {
                    worker.output('datauristring').then(function(pdfAsString) {
                        window.AndroidAI.savePdf(pdfAsString, opt.filename);
                        restoreState();
                    }).catch(restoreState);
                } else {
                    worker.save().then(() => {
                        restoreState();
                    }).catch(restoreState);
                }
            }, 100);
        }

        // --- SAVED WORKSHEETS ENGINE ---
        const SAVED_STORAGE_KEY = 'saved_worksheets_collection';
        let currentLoadedWorksheetId = null;

        function getSavedWorksheets() {
            try {
                const data = localStorage.getItem(SAVED_STORAGE_KEY);
                return data ? JSON.parse(data) : [];
            } catch (e) {
                console.error("Storage read error", e);
                return [];
            }
        }

        function setSavedWorksheets(list) {
            try {
                localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(list));
                updateSavedCountBadges();
            } catch (e) {
                console.error("Storage write error", e);
            }
        }

        function updateSavedCountBadges() {
            const list = getSavedWorksheets();
            const count = list.length;
            const badges = [
                document.getElementById('header-saved-count'),
                document.getElementById('action-saved-count'),
                document.getElementById('modal-saved-count'),
                document.getElementById('bento-saved-count'),
                document.getElementById('accordion-saved-count')
            ];
            badges.forEach(b => {
                if (b) {
                    b.innerText = count;
                    b.classList.remove('pop');
                    void b.offsetWidth; // Trigger reflow
                    b.classList.add('pop');
                }
            });
            const statElem = document.getElementById('bento-stat-saved-count');
            if (statElem) statElem.innerText = count;

            renderBentoSavedList();
            renderSavedWorksheetsList();
        }

        function renderBentoSavedList() {
            const container = document.getElementById('bento-saved-list');
            if (!container) return;

            const list = getSavedWorksheets();
            const searchInput = document.getElementById('bento-saved-search');
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

            const filtered = query 
                ? list.filter(item => (item.title && item.title.toLowerCase().includes(query)) || (item.category && item.category.toLowerCase().includes(query)))
                : list;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 28px 14px; color: var(--text-muted); background: var(--input-bg); border-radius: 16px; border: 1px dashed var(--input-border); margin: auto 0;">
                        <div style="font-size: 28px; margin-bottom: 6px;">📂</div>
                        <div style="font-size: 13.5px; font-weight: 800; color: var(--text-main); margin-bottom: 3px;">No Saved Worksheets ${query ? 'Found' : 'Yet'}</div>
                        <div style="font-size: 11.5px;">${query ? 'Try searching another keyword.' : 'Save your active worksheet to build your personal library!'}</div>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.html || '';
                const previewSnippet = tempDiv.innerText.trim().slice(0, 110) || 'Worksheet Content';

                return `
                    <div style="background: var(--input-bg); border: 1px solid var(--input-border); border-radius: 14px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; transition: all 0.2s ease;">
                        <div style="flex: 1; min-width: 0;">
                            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                                <div style="font-weight: 800; font-size: 13.5px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                    ${escapeHtml(item.title)}
                                </div>
                                <span class="sample-badge" style="font-size: 9px; padding: 2px 7px; border-radius: 8px;">${escapeHtml(item.category || 'General')}</span>
                            </div>
                            <div style="font-size: 11.5px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                🕒 ${escapeHtml(item.date || '')} • ${escapeHtml(previewSnippet)}
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
                            <button type="button" onclick="loadSavedWorksheet('${item.id}')" class="editor-btn primary" style="padding: 6px 14px; font-size: 12px; border-radius: 10px;" title="Load worksheet">
                                👁️ Load
                            </button>
                            <button type="button" onclick="deleteSavedWorksheet('${item.id}', event)" class="editor-btn danger" style="padding: 5px 9px; font-size: 11px; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2);" title="Delete worksheet">
                                🗑️
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function renderAccordionSavedList() {
            renderBentoSavedList();
        }

        function triggerSaveWorksheet(isDraft = false) {
            const root = document.getElementById('level-body');
            const textContent = root ? root.innerText.trim() : "";
            if (!root || !textContent || textContent.includes("Your generated worksheet will appear here...")) {
                showToast("Please generate or create a worksheet before saving.", "⚠️");
                return;
            }

            autoPopulateSaveAccordionFields();
            const saveTile = document.getElementById('bento-tile-save');
            if (saveTile) {
                saveTile.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            const titleInput = document.getElementById('acc-save-title');
            if (titleInput) {
                setTimeout(() => { titleInput.focus(); titleInput.select(); }, 250);
            }
        }

        function openSavedWorksheetsModal() {
            const dashboard = document.getElementById('bento-dashboard');
            if (dashboard && dashboard.tagName === 'DETAILS') {
                dashboard.open = true;
            }
            
            const bentoTile = document.getElementById('bento-tile-saved-list');
            if (bentoTile) {
                bentoTile.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const searchInput = document.getElementById('bento-saved-search');
                if (searchInput) setTimeout(() => searchInput.focus(), 250);
            } else {
                const modal = document.getElementById('saved-worksheets-modal');
                if (modal) modal.style.display = 'flex';
                renderSavedWorksheetsList();
            }
        }

        function closeSaveWorksheetModal() {
            const modal = document.getElementById('save-worksheet-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleSaveModalOverlayClick(event) {
            if (event.target && event.target.id === 'save-worksheet-modal') {
                closeSaveWorksheetModal();
            }
        }

        function confirmSaveWorksheet() {
            const root = document.getElementById('level-body');
            if (!root) return;

            // Make sure controls are stripped if in edit mode
            const wasEditing = isEditMode;
            if (wasEditing) cleanWorksheetForPreview();

            const titleInput = document.getElementById('save-worksheet-title');
            const catInput = document.getElementById('save-worksheet-category');
            const title = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : ("Worksheet - " + new Date().toLocaleDateString());
            const category = (catInput && catInput.value.trim()) ? catInput.value.trim() : "General";

            const borderVal = document.getElementById('border-style-select') ? document.getElementById('border-style-select').value : 'border-classic';
            const fontVal = document.getElementById('font-family-select') ? document.getElementById('font-family-select').value : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            const sizeVal = document.getElementById('font-size-select') ? document.getElementById('font-size-select').value : '18px';
            const pageColorVal = document.getElementById('page-color-select') ? document.getElementById('page-color-select').value : 'white';

            const newItem = {
                id: currentLoadedWorksheetId || ('ws_' + Date.now()),
                title: title,
                category: category,
                date: new Date().toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now(),
                borderStyle: borderVal,
                fontFamily: fontVal,
                fontSize: sizeVal,
                pageColor: pageColorVal,
                html: root.innerHTML,
                originalRaw: originalWorksheetHTML || root.innerHTML
            };

            let list = getSavedWorksheets();
            const existingIdx = list.findIndex(item => item.id === newItem.id);
            if (existingIdx >= 0) {
                list[existingIdx] = newItem;
            } else {
                list.unshift(newItem);
            }

            setSavedWorksheets(list);
            currentLoadedWorksheetId = newItem.id;
            closeSaveWorksheetModal();

            if (wasEditing) prepareWorksheetBlocksForEditing();

            // Button feedback
            const saveBtn = document.getElementById('save-worksheet-btn');
            if (saveBtn) {
                const origText = saveBtn.innerHTML;
                saveBtn.innerHTML = `<span>✅ Saved!</span>`;
                setTimeout(() => { saveBtn.innerHTML = origText; }, 2000);
            }

            showToast(`"${title}" saved to library!`, "💾");
        }

        function closeSavedWorksheetsModal() {
            const modal = document.getElementById('saved-worksheets-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleSavedListOverlayClick(event) {
            if (event.target && event.target.id === 'saved-worksheets-modal') {
                closeSavedWorksheetsModal();
            }
        }

        function renderSavedWorksheetsList() {
            const container = document.getElementById('saved-worksheets-list');
            if (!container) return;

            const list = getSavedWorksheets();
            const searchInput = document.getElementById('saved-search-input');
            const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

            const filtered = query 
                ? list.filter(item => (item.title && item.title.toLowerCase().includes(query)) || (item.category && item.category.toLowerCase().includes(query)))
                : list;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                        <div style="font-size: 40px; margin-bottom: 12px;">📂</div>
                        <div style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">No Saved Worksheets ${query ? 'Found' : 'Yet'}</div>
                        <p style="font-size: 13px; max-width: 320px; margin: 0 auto 16px;">
                            ${query ? 'Try a different search keyword.' : 'Generate or edit a worksheet and click "💾 Save Worksheet" to save it here for future classes!'}
                        </p>
                        ${!query ? '<button onclick="closeSavedWorksheetsModal()" class="editor-btn primary" style="padding: 8px 20px;">✨ Create a Worksheet</button>' : ''}
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(item => {
                // Extract brief plain text preview
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = item.html || '';
                const previewSnippet = tempDiv.innerText.trim().slice(0, 160) || 'Worksheet Content';

                return `
                    <div class="sample-card-item" style="display: flex; flex-direction: column; gap: 8px; position: relative;">
                        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;">
                            <div>
                                <div style="font-weight: 700; font-size: 15px; color: var(--text-main); margin-bottom: 3px;">
                                    ${escapeHtml(item.title)}
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-muted);">
                                    <span class="sample-badge" style="font-size: 9px; padding: 1px 6px;">${escapeHtml(item.category || 'General')}</span>
                                    <span>🕒 ${escapeHtml(item.date || '')}</span>
                                </div>
                            </div>
                            <button onclick="deleteSavedWorksheet('${item.id}', event)" class="editor-btn danger" style="padding: 3px 8px; font-size: 11px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2);" title="Delete worksheet">🗑️</button>
                        </div>
                        
                        <div class="sample-card-text" style="max-height: 50px; font-size: 12px; color: var(--text-reading);">
                            ${escapeHtml(previewSnippet)}
                        </div>

                        <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px; margin-top: 4px;">
                            <button onclick="loadSavedWorksheet('${item.id}')" class="editor-btn primary" style="padding: 6px 14px; font-size: 12px;">
                                👁️ Open & Edit
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function loadSavedWorksheet(id) {
            const list = getSavedWorksheets();
            const item = list.find(w => w.id === id);
            if (!item) return;

            currentLoadedWorksheetId = item.id;
            originalWorksheetHTML = item.originalRaw || item.html;

            const root = document.getElementById('level-body');
            if (root) {
                root.innerHTML = item.html;
            }

            // Restore style configurations
            if (item.borderStyle && document.getElementById('border-style-select')) {
                document.getElementById('border-style-select').value = item.borderStyle;
            }
            if (item.fontFamily && document.getElementById('font-family-select')) {
                document.getElementById('font-family-select').value = item.fontFamily;
            }
            if (item.fontSize && document.getElementById('font-size-select')) {
                document.getElementById('font-size-select').value = item.fontSize;
            }
            if (item.pageColor && document.getElementById('page-color-select')) {
                document.getElementById('page-color-select').value = item.pageColor;
            }

            updateWorksheetStyle();
            updateQRCodePreview();
            closeSavedWorksheetsModal();

            if (isEditMode) {
                prepareWorksheetBlocksForEditing();
            }

            showToast(`Loaded "${item.title}" into workspace!`, "📂");

            // Scroll down smoothly to preview
            const previewArea = document.getElementById('a4-preview-area');
            if (previewArea) {
                previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function deleteSavedWorksheet(id, event) {
            if (event) event.stopPropagation();
            if (!confirm("Are you sure you want to delete this saved worksheet?")) return;

            let list = getSavedWorksheets();
            list = list.filter(w => w.id !== id);
            setSavedWorksheets(list);
            renderSavedWorksheetsList();
            showToast("Worksheet deleted", "🗑️");

            if (currentLoadedWorksheetId === id) {
                currentLoadedWorksheetId = null;
            }
        }

        function exportSavedWorksheetsBackup() {
            const list = getSavedWorksheets();
            if (list.length === 0) {
                showToast("No saved worksheets to export", "⚠️");
                return;
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(list, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "Worksheets_Backup_" + new Date().toISOString().slice(0,10) + ".json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("Worksheets backup downloaded!", "📤");
        }

        function showToast(message, icon = "💾") {
            const toast = document.getElementById('toast-notification');
            const text = document.getElementById('toast-text');
            const ico = document.getElementById('toast-icon');
            if (!toast) return;

            if (text) text.innerText = message;
            if (ico) ico.innerText = icon;

            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

        // Initialize features on DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            initSampleFeatures();
            updateSavedCountBadges();
            loadSavedTheme();
            checkAndLoadSharedWorksheetHash();
            updateQRCodePreview();
        });
        window.addEventListener('hashchange', checkAndLoadSharedWorksheetHash);
        // Also run immediately in case DOM is already loaded
        initSampleFeatures();
        updateSavedCountBadges();
        loadSavedTheme();
        checkAndLoadSharedWorksheetHash();
        updateQRCodePreview();
