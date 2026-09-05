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
                    showToast("The uploaded file is empty.", "⚠️");
                    return;
                }
                setLoadedSample(file.name, content.trim(), 'Uploaded File');
            };
            reader.onerror = function() {
                showToast("Failed to read the file. Please try a .txt, .md, or .csv file.", "⚠️");
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

        function resetFontStyling() {
            const fontSizeSelect = document.getElementById('font-size-select');
            const fontFamilySelect = document.getElementById('font-family-select');
            const colorPicker = document.getElementById('text-color-picker');
            const borderThicknessSelect = document.getElementById('border-thickness-select');
            if (fontSizeSelect) fontSizeSelect.value = '18px';
            if (fontFamilySelect) fontFamilySelect.value = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            if (colorPicker) colorPicker.value = '#1e293b';
            if (borderThicknessSelect) borderThicknessSelect.value = '2px';
            updateWorksheetStyle();
            showToast("Font & border styling reset to default", "↺");
        }

        function triggerBorderDrawAnimation() {
            const preview = document.getElementById('a4-preview-area');
            if (!preview) return;
            preview.classList.remove('animating-border');
            void preview.offsetWidth; // trigger reflow
            preview.classList.add('animating-border');
            showToast("Border draw & pulse animation activated ✨", "🎨");
            setTimeout(() => {
                preview.classList.remove('animating-border');
            }, 1200);
        }

        // --- CUSTOM REAL-TIME SPELLCHECK HIGHLIGHTER ---
        let typoDictionary = null;
        let isDictionaryLoading = false;
        let spellcheckTimeoutId = null;
        const spellcheckCache = new Map();

        async function initCustomSpellchecker() {
            if (typoDictionary || isDictionaryLoading) return;
            isDictionaryLoading = true;
            try {
                if (typeof Typo === 'undefined') {
                    await new Promise((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/typo-js@1.2.4/typo.min.js';
                        script.onload = resolve;
                        script.onerror = reject;
                        document.head.appendChild(script);
                    });
                }
                const [affData, dicData] = await Promise.all([
                    fetch('https://unpkg.com/dictionary-en@3.2.0/index.aff').then(r => r.text()),
                    fetch('https://unpkg.com/dictionary-en@3.2.0/index.dic').then(r => r.text())
                ]);
                typoDictionary = new Typo("en_US", affData, dicData);
                console.log("Custom Spellcheck Dictionary Loaded.");
                triggerRealTimeSpellcheck();
            } catch (err) {
                console.error("Failed to load spellcheck dictionary.", err);
            } finally {
                isDictionaryLoading = false;
            }
        }

        function checkWordSpelling(word) {
            if (spellcheckCache.has(word)) return spellcheckCache.get(word);
            const isCorrect = typoDictionary.check(word);
            spellcheckCache.set(word, isCorrect);
            return isCorrect;
        }

        function triggerRealTimeSpellcheck() {
            if (typeof CSS === 'undefined' || !CSS.highlights) return; // Fallback to native if not supported
            
            const toggle = document.getElementById('spellcheck-toggle');
            const enabled = toggle ? toggle.checked : true;
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            const isEditing = root && root.querySelector('.ws-block[contenteditable="true"]');
            
            if (!enabled || !isEditing || !typoDictionary) {
                CSS.highlights.delete("spelling-errors");
                return;
            }

            const ranges = [];
            const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
            let node;
            const wordRegex = /[a-zA-Z]+(?:'[a-zA-Z]+)?/g;
            
            while ((node = treeWalker.nextNode())) {
                const parent = node.parentElement;
                if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.closest('.no-print'))) {
                    continue;
                }
                const text = node.nodeValue;
                let match;
                while ((match = wordRegex.exec(text)) !== null) {
                    const word = match[0];
                    if (!checkWordSpelling(word)) {
                        try {
                            const range = new Range();
                            range.setStart(node, match.index);
                            range.setEnd(node, match.index + word.length);
                            ranges.push(range);
                        } catch (e) {}
                    }
                }
            }
            
            const highlight = new Highlight(...ranges);
            CSS.highlights.set("spelling-errors", highlight);
        }

        function toggleSpellcheck() {
            const toggle = document.getElementById('spellcheck-toggle');
            const enabled = toggle ? toggle.checked : true;
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            
            if (root) {
                const blocks = root.querySelectorAll('.ws-block');
                blocks.forEach(block => {
                    block.setAttribute('spellcheck', enabled ? 'true' : 'false');
                });
            }
            
            if (enabled) {
                initCustomSpellchecker();
                triggerRealTimeSpellcheck();
            } else {
                if (typeof CSS !== 'undefined' && CSS.highlights) {
                    CSS.highlights.delete("spelling-errors");
                }
            }
            
            showToast(enabled ? "Spellcheck enabled 📝" : "Spellcheck disabled 🚫", "✨");
        }

        
        // --- SPIRAL NOTEBOOK BINDING ENGINE ---
        let isSpiralNotebookEnabled = false;
        let isVisualCardsMode = true;

        function renderSpiralBinding() {
            const previewArea = document.getElementById('a4-preview-area');
            const spiralContainer = document.getElementById('a4-spiral-binding');
            if (!previewArea || !spiralContainer) return;

            const isSpiral = previewArea.classList.contains('border-spiral');
            if (!isSpiral) {
                spiralContainer.style.display = 'none';
                spiralContainer.innerHTML = '';
                return;
            }

            spiralContainer.style.display = 'flex';
            const height = previewArea.offsetHeight || 1123;
            // Spacing each ring roughly every 42px
            const ringCount = Math.max(18, Math.min(48, Math.floor((height - 40) / 42)));

            let ringsHtml = '';
            for (let i = 0; i < ringCount; i++) {
                ringsHtml += `
                <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible; flex-shrink: 0;">
                    <defs>
                        <linearGradient id="wireGrad-${i}" x1="0" y1="0" x2="42" y2="28" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#0f172a" />
                            <stop offset="20%" stop-color="#1e40af" />
                            <stop offset="45%" stop-color="#60a5fa" />
                            <stop offset="70%" stop-color="#2563eb" />
                            <stop offset="95%" stop-color="#0f172a" />
                        </linearGradient>
                        <filter id="shadow-${i}" x="-20%" y="-20%" width="160%" height="160%">
                            <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.32"/>
                        </filter>
                    </defs>
                    <!-- Punch hole in notebook paper -->
                    <ellipse cx="29" cy="18" rx="6.5" ry="4.2" fill="#0f172a" opacity="0.95" />
                    <ellipse cx="29" cy="17" rx="6" ry="3.5" fill="#1e293b" />
                    <ellipse cx="29" cy="19" rx="5.5" ry="2.2" fill="#020617" opacity="0.4" />
                    <!-- 3D Metallic Blue Spiral Wire looping through hole -->
                    <path d="M 2 24 C 2 7, 18 4, 30 16" stroke="url(#wireGrad-${i})" stroke-width="4.2" stroke-linecap="round" filter="url(#shadow-${i})" />
                    <!-- Wire glossy highlight -->
                    <path d="M 5 21 C 6 9, 17 7, 26 15" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.8" />
                </svg>`;
            }
            spiralContainer.innerHTML = ringsHtml;
        }

        function toggleSpiralNotebook() {
            const previewArea = document.getElementById('a4-preview-area');
            const statusEl = document.getElementById('spiral-toggle-status');
            const borderSelect = document.getElementById('border-style-select');
            if (!previewArea) return;

            const isCurrentlySpiral = previewArea.classList.contains('border-spiral');
            if (isCurrentlySpiral) {
                previewArea.classList.remove('border-spiral');
                previewArea.classList.add('border-classic');
                if (borderSelect) borderSelect.value = 'border-classic';
                if (statusEl) statusEl.textContent = 'OFF';
                isSpiralNotebookEnabled = false;
                showToast("Spiral binding turned OFF (Classic border)", "📓");
            } else {
                const borderClasses = ['border-none', 'border-classic', 'border-double', 'border-dashed', 'border-dotted', 'border-certificate', 'border-modern', 'border-bold'];
                borderClasses.forEach(cls => previewArea.classList.remove(cls));
                previewArea.classList.add('border-spiral');
                if (borderSelect) borderSelect.value = 'border-spiral';
                if (statusEl) statusEl.textContent = 'ON';
                isSpiralNotebookEnabled = true;
                showToast("Spiral notebook binding activated! 📓✨", "✨");
            }
            renderSpiralBinding();
        }

        function toggleVisualCardsMode() {
            isVisualCardsMode = !isVisualCardsMode;
            const statusEl = document.getElementById('visual-cards-status');
            const btn = document.getElementById('btn-visual-cards-toggle');
            if (statusEl) statusEl.textContent = isVisualCardsMode ? 'ON' : 'OFF';
            if (btn) {
                btn.style.background = isVisualCardsMode ? '#059669' : 'var(--input-bg)';
                btn.style.color = isVisualCardsMode ? '#ffffff' : 'var(--text-main)';
            }
            showToast(isVisualCardsMode ? "📸 Illustrated Picture Cards enabled for AI generation!" : "Standard text worksheets enabled", "🎨");
        }

        function loadSpiralWorkbookTemplate() {
            const previewArea = document.getElementById('a4-preview-area');
            const levelBody = document.getElementById('level-body');
            const borderSelect = document.getElementById('border-style-select');
            const promptInput = document.getElementById('custom-prompt');

            // 1. Enable spiral border
            if (borderSelect) borderSelect.value = 'border-spiral';
            if (previewArea) {
                const borderClasses = ['border-none', 'border-classic', 'border-double', 'border-dashed', 'border-dotted', 'border-certificate', 'border-modern', 'border-bold'];
                borderClasses.forEach(cls => previewArea.classList.remove(cls));
                previewArea.classList.add('border-spiral');
            }
            const statusEl = document.getElementById('spiral-toggle-status');
            if (statusEl) statusEl.textContent = 'ON';
            isSpiralNotebookEnabled = true;

            // 2. Load template content
            const tmpl = WORKSHEET_LAYOUT_TEMPLATES.find(t => t.id === 'tmpl-spiral-workbook');
            if (tmpl && levelBody) {
                levelBody.innerHTML = tmpl.getHTML();
                if (promptInput) {
                    promptInput.value = tmpl.aiPrompt;
                }
            }

            renderSpiralBinding();
            showToast("Loaded Illustrated Spiral Workbook from screenshot! 📓⭐", "✨");
            if (previewArea) {
                previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function updateWorksheetStyle() {
            const borderStyle = document.getElementById('border-style-select').value;
            const borderThickness = document.getElementById('border-thickness-select') ? document.getElementById('border-thickness-select').value : '2px';
            const fontFamily = document.getElementById('font-family-select').value;
            const fontSize = document.getElementById('font-size-select').value;
            const pageColor = document.getElementById('page-color-select').value;
            const colorTheme = document.getElementById('color-theme-select') ? document.getElementById('color-theme-select').value : 'theme-default';
            const previewArea = document.getElementById('a4-preview-area');
            
            // Apply border thickness CSS custom property and direct style
            previewArea.style.setProperty('--ws-border-width', borderThickness);
            if (borderStyle !== 'border-none') {
                previewArea.style.borderWidth = borderThickness;
            } else {
                previewArea.style.borderWidth = '0px';
            }

            // Remove previous border classes and apply selected one
            const borderClasses = ['border-none', 'border-classic', 'border-spiral', 'border-double', 'border-dashed', 'border-dotted', 'border-certificate', 'border-modern', 'border-bold'];
            borderClasses.forEach(cls => previewArea.classList.remove(cls));
            previewArea.classList.add(borderStyle);

            // Remove previous theme classes
            const themeClasses = ['theme-default', 'theme-indigo', 'theme-emerald', 'theme-violet', 'theme-sunset', 'theme-ocean', 'theme-rose'];
            themeClasses.forEach(cls => previewArea.classList.remove(cls));
            previewArea.classList.add(colorTheme);

            // Apply Visual Formatting Theme (Standard, Minimalist, High-Contrast)
            const formattingTheme = document.getElementById('formatting-theme-select') ? document.getElementById('formatting-theme-select').value : 'formatting-standard';
            const formattingClasses = ['formatting-standard', 'formatting-minimalist', 'formatting-high-contrast'];
            formattingClasses.forEach(cls => previewArea.classList.remove(cls));
            previewArea.classList.add(formattingTheme);

            // Remove previous layout classes and apply selected one
            const layoutColumns = document.getElementById('layout-columns-select') ? document.getElementById('layout-columns-select').value : 'layout-1col';
            const layoutClasses = ['layout-1col', 'layout-2col'];
            layoutClasses.forEach(cls => previewArea.classList.remove(cls));
            previewArea.classList.add(layoutColumns);

            previewArea.style.fontFamily = fontFamily;
            if (formattingTheme === 'formatting-high-contrast' || formattingTheme === 'formatting-minimalist') {
                previewArea.style.backgroundColor = '#ffffff';
            } else {
                previewArea.style.backgroundColor = pageColor;
            }

            // Define theme color maps for stunning colorization of blocks & headers
            const themePalettes = {
                'theme-default': { bg: '#f8fafc', border: '#e2e8f0', h3: '#1e40af', h2: '#0f172a' },
                'theme-indigo': { bg: '#eef2ff', border: '#c7d2fe', h3: '#4338ca', h2: '#312e81' },
                'theme-emerald': { bg: '#ecfdf5', border: '#a7f3d0', h3: '#047857', h2: '#065f46' },
                'theme-violet': { bg: '#f5f3ff', border: '#ddd6fe', h3: '#6d28d9', h2: '#5b21b6' },
                'theme-sunset': { bg: '#fffbeb', border: '#fde68a', h3: '#b45309', h2: '#92400e' },
                'theme-ocean': { bg: '#ecfeff', border: '#a5f3fc', h3: '#0e7490', h2: '#155e75' },
                'theme-rose': { bg: '#fff1f2', border: '#fecdd3', h3: '#be123c', h2: '#9f1239' }
            };
            const palette = themePalettes[colorTheme] || themePalettes['theme-default'];

            const blocks = previewArea.querySelectorAll('.ws-block');
            blocks.forEach(block => {
                if (formattingTheme === 'formatting-minimalist') {
                    block.style.backgroundColor = 'transparent';
                    block.style.borderColor = '#cbd5e1';
                    block.style.borderWidth = '0 0 1.5px 0';
                    block.style.borderStyle = 'solid';
                } else if (formattingTheme === 'formatting-high-contrast') {
                    block.style.backgroundColor = '#ffffff';
                    block.style.borderColor = '#000000';
                    block.style.borderWidth = '2px';
                    block.style.borderStyle = 'solid';
                } else {
                    block.style.backgroundColor = palette.bg;
                    block.style.borderColor = palette.border;
                    block.style.borderWidth = '1px';
                    block.style.borderStyle = 'solid';
                }
            });

            const h2s = previewArea.querySelectorAll('h2');
            h2s.forEach(h2 => {
                h2.style.color = (formattingTheme === 'formatting-high-contrast') ? '#000000' : palette.h2;
                h2.style.fontSize = `calc(${fontSize} + 8px)`;
                h2.style.fontFamily = fontFamily;
                if (formattingTheme === 'formatting-high-contrast') {
                    h2.style.fontWeight = '800';
                }
            });

            const h3s = previewArea.querySelectorAll('h3');
            h3s.forEach(h3 => {
                h3.style.color = (formattingTheme === 'formatting-high-contrast') ? '#000000' : palette.h3;
                h3.style.fontSize = `calc(${fontSize} + 4px)`;
                h3.style.fontFamily = fontFamily;
                if (formattingTheme === 'formatting-high-contrast') {
                    h3.style.fontWeight = '700';
                }
            });
            
            const textElements = previewArea.querySelectorAll('p, span, input, textarea, li, label');
            textElements.forEach(el => {
                el.style.fontSize = fontSize;
                el.style.fontFamily = fontFamily;
                if (formattingTheme === 'formatting-high-contrast') {
                    el.style.color = '#000000';
                }
            });
        }

        function askAITutor() {
            const btn = document.getElementById('ai-button');
            const customPromptInput = document.getElementById('custom-prompt');
            let userRequest = customPromptInput ? customPromptInput.value.trim() : "";
            
            // If empty, auto-populate an authentic premier curriculum prompt
            if (!userRequest && !currentLoadedSample) {
                userRequest = "Present Simple vs Present Continuous: rules, cartoon picture cards, vocabulary exercises, and reading quiz";
                if (customPromptInput) {
                    customPromptInput.value = userRequest;
                }
            }

            if (btn) {
                btn.disabled = true;
                btn.innerHTML = '✨ Generating Worksheet... <span class="premium-pill">PRO</span>';
            }
            
            // Scroll smoothly to worksheet area so user immediately sees activity
            const previewArea = document.getElementById('a4-preview-area');
            if (previewArea) {
                previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Show active multi-step progress indicator in levelBody
            const levelBody = document.getElementById('level-body');
            if (levelBody) {
                levelBody.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px; padding: 30px 16px; color: var(--text-muted); text-align: center;">
                        <div style="font-size: 38px; margin-bottom: 12px; animation: pulseGlow 1.5s infinite;">✨</div>
                        <div style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">Generating Custom Worksheet...</div>
                        <div style="font-size: 13.5px; color: var(--accent-primary); font-weight: 700; margin-bottom: 16px;" id="gen-step-indicator">
                            Step 1: Structuring Pedagogical Objectives & Content...
                        </div>
                        <div style="width: 220px; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-bottom: 12px;">
                            <div style="height: 100%; width: 75%; background: var(--accent-primary); border-radius: 999px; animation: progressPulse 1.2s ease-in-out infinite alternate;"></div>
                        </div>
                        <div style="font-size: 12px; color: #64748b; font-style: italic;">Creating exercises, illustrated cards, and answer key</div>
                    </div>
                `;
            }

            window.__genStepTimer1 = setTimeout(() => {
                const el = document.getElementById('gen-step-indicator');
                if (el) el.innerText = "Step 2: 🎨 Generating Visual Picture Cards & Spiral Binding...";
            }, 1200);
            window.__genStepTimer2 = setTimeout(() => {
                const el = document.getElementById('gen-step-indicator');
                if (el) el.innerText = "Step 3: 📝 Formulating Grammar Practice & Answer Key...";
            }, 2400);
            
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

            let currentTeacherName = "___________________________";
            const nameTextEl = document.getElementById('teacher-name-text');
            if (nameTextEl && nameTextEl.innerText.trim()) {
                currentTeacherName = nameTextEl.innerText.trim();
            }

            
            const isWorkbookRequest = isVisualCardsMode || /picture|pictures|spiral|workbook|clipart|screenshot|draw|visual|kid|children/i.test(userRequest);
            let workbookInstruction = "";
            if (isWorkbookRequest) {
                // Activate spiral notebook border if not already on
                const previewArea = document.getElementById('a4-preview-area');
                if (previewArea && !previewArea.classList.contains('border-spiral')) {
                    const borderClasses = ['border-none', 'border-classic', 'border-double', 'border-dashed', 'border-dotted', 'border-certificate', 'border-modern', 'border-bold'];
                    borderClasses.forEach(cls => previewArea.classList.remove(cls));
                    previewArea.classList.add('border-spiral');
                    const borderSelect = document.getElementById('border-style-select');
                    if (borderSelect) borderSelect.value = 'border-spiral';
                    const statusEl = document.getElementById('spiral-toggle-status');
                    if (statusEl) statusEl.textContent = 'ON';
                    renderSpiralBinding();
                }

                workbookInstruction = `
            SPECIAL MANDATE - CHILDREN'S ILLUSTRATED WORKBOOK WITH PICTURE CARDS:
            The user wants an illustrated workbook layout with cute cartoon pictures (like the picture cards in children's grammar/vocab textbooks):
            - Title: Bold uppercase title flanked by stars/pencil doodles (e.g. ⭐ [TITLE] ✏️) with Name, Class, Date header line.
            - Numbered pill headers: <div style="display: inline-flex; align-items: center; gap: 8px; background: #1e40af; color: white; border-radius: 9999px; padding: 4px 14px; font-weight: 800; font-size: 13px; margin-bottom: 12px;"><span style="background: white; color: #1e40af; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">1</span> <span>LEARN: [TOPIC]</span></div>
            - Picture Card Grids: Group concepts/rules/vocabulary into neat card grids. Each card MUST have:
              * A top pill label or conversion arrow (e.g., I -> my, he -> his, or word)
              * A cute cartoon educational clipart image from Pollinations AI:
                <img src="https://image.pollinations.ai/prompt/{detailed-URL-encoded-character-or-object-description}%20cute%20vibrant%20cartoon%20character%20children%20book%20illustration%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="{label}">
              * A clear, authentic example sentence underneath with target word in bold.
            - REMEMBER Box: A soft-tinted tip box with icons (⭐, 💡) and mini illustrated example cards (e.g., "my bag", "her pen", "their house").
            - Possession / Application Cards: 4 visual cards with cartoon pictures illustrating the rule (e.g., Tom's ball, Sara's pen, Mum's car, teacher's desk).
            - QUICK PRACTICE: Matching columns with connection dots (•) and Circle the correct word sentences.
            - Footer: Page number flanked by stars (e.g. ✨ 1 / 3 ⭐).
            `;
            }

            const prompt = `You are an expert English Language Teacher (ESL / EFL / ELT) and master educational worksheet designer. ${workbookInstruction} Create an impeccably organized, pedagogy-driven English language learning worksheet based exactly on this request: "${userRequest}". ${sampleContextInstruction}
            Format the response ENTIRELY in valid, clean HTML. 
            
            Strict Guidelines for English Worksheets Organization & Layout:
            1. ALWAYS include the classic teacher & student header at the top:
               <div style="display: flex; justify-content: space-between; margin-bottom: 24px; border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; font-size: 14.5px; color: #334155;"><span><strong>Teacher:</strong> <span class="teacher-name-display">${currentTeacherName}</span></span><span><strong>Student:</strong> ___________________________</span><span><strong>Date:</strong> _________________</span></div>
            2. Main Worksheet Title:
               <h2 style="text-align: center; color: #0f172a; margin: 16px 0 20px; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">[Descriptive English Topic / Unit Title]</h2>
            3. Structure EVERY section/part inside an organized, neat container block:
               <div class="ws-block" style="margin-bottom: 22px; padding: 14px 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                   <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px; font-size: 17px; display: flex; align-items: center; gap: 8px;">Part 1: [Section Title, e.g. Reading Passage & Comprehension / Vocabulary Bank / Grammar Rules / Fill in the Blanks / Sentence Transformation / Writing Task]</h3>
                   <p style="font-size: 13.5px; color: #475569; margin-bottom: 12px; font-style: italic;"><strong>Instructions:</strong> [Clear, pedagogical step-by-step instructions for the learner]</p>
                   [Content, word banks, tables, numbered questions with clean blank underlines (_______) or matching pairs]
               </div>
            4. For Word Banks, present them in clean styled boxes:
               <div style="background: #ffffff; border: 1.5px dashed #3b82f6; border-radius: 8px; padding: 10px 14px; margin: 10px 0 14px; text-align: center; font-weight: 600; color: #1e3a8a; letter-spacing: 0.5px;">[ word1 • word2 • word3 • word4 • word5 ]</div>
            5. For Questions, use clear numbered lists <ol style="padding-left: 20px; line-height: 1.9; font-size: 15px; color: #1e293b;"> with generous spacing and distinct answer lines.
            6. EXTREME FORMATTING RULE: You MUST return ONLY valid, clean HTML. Absolutely NO markdown, NO markdown code blocks (\&#96;\&#96;\&#96;html), NO **bold**, NO # headings, NO backticks. Do NOT wrap your output in code blocks. Ensure ALL text is inside appropriate tags (<p>, <li>, <span>, <div>). Ensure NO raw disorganized text floats outside of HTML tags.
            7. PROACTIVELY embed 1-2 relevant high-quality flat vector icons or illustrations based on the worksheet topic, even if the user hasn't explicitly requested them. Embed generative clipart using this format: <img src="https://image.pollinations.ai/prompt/{detailed-URL-encoded-description}%20clean%20flat%20vector%20icon%20educational%20clipart%20white%20background?width=400&height=400&nologo=true" style="max-width: 150px; border-radius: 12px; display: block; margin: 18px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" alt="Educational Icon"> (Ensure you append descriptive style keywords like "clean flat vector icon" to the prompt URL). For vocabulary matching or lists, you should also proactively use large emojis as inline icons next to the words (e.g., <span style="font-size: 38px;">🍎</span>).
            8. Ensure vocabulary, grammar rules, dialogues, and exercises are authentic, error-free, pedagogical, and completely organized. If generating a table, use proper HTML <table>, <tr>, <th>, <td> tags with inline styles for borders.`;

            if (window.AndroidAI) {
                window.AndroidAI.askGemini(prompt, "onAiResponse");
            } else {
                const apiKey = (localStorage.getItem('web_gemini_api_key') || '').trim();
                if (!apiKey) {
                    document.getElementById('api-key-modal').style.display = 'flex';
                    btn.disabled = false;
                    btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
                    return;
                }
                
                fetchGeminiWithFallback(apiKey, prompt)
                    .then(text => onAiResponse(text))
                    .catch(err => onAiResponse(`API_ERROR: ${err.message}`));
            }
        }

        async function fetchGeminiWithFallback(apiKey, prompt) {
            const btn = document.getElementById('ai-button');
            const updateStatus = (msg) => {
                const statusEl = document.querySelector('#level-body div span');
                if (statusEl) statusEl.textContent = msg;
                if (btn) btn.innerHTML = `⏳ ${msg}`;
            };

            updateStatus("Connecting to Google Gemini AI...");

            // 1. Check if we already found and cached a working model for this API key
            const cachedWorkingModel = localStorage.getItem('cached_working_gemini_model');

            // 2. Discover models dynamically from Google's ModelService for this specific key
            let candidateModels = [];
            if (cachedWorkingModel) {
                candidateModels.push(cachedWorkingModel);
            }

            try {
                const listController = new AbortController();
                const listTimeout = setTimeout(() => listController.abort(), 4000);
                const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
                    signal: listController.signal
                });
                clearTimeout(listTimeout);
                const listData = await listRes.json();
                
                if (listData.models && Array.isArray(listData.models)) {
                    const dynamicModels = listData.models
                        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                        .map(m => m.name.replace('models/', ''));
                    
                    if (dynamicModels.length > 0) {
                        // Prioritize fastest flash models
                        dynamicModels.sort((a, b) => {
                            const score = (name) => {
                                if (name.includes('2.0-flash')) return 10;
                                if (name.includes('2.5-flash')) return 9;
                                if (name.includes('1.5-flash')) return 8;
                                if (name.includes('flash')) return 7;
                                if (name.includes('pro')) return 6;
                                return 1;
                            };
                            return score(b) - score(a);
                        });
                        candidateModels = Array.from(new Set([...candidateModels, ...dynamicModels]));
                    }
                } else if (listData.error) {
                    if (listData.error.message && (listData.error.message.includes('API key not valid') || listData.error.message.includes('API_KEY_INVALID'))) {
                        throw new Error("Invalid API key. Please verify your key in the 🔑 API Key settings.");
                    }
                }
            } catch (err) {
                if (err.message && err.message.includes('Invalid API key')) throw err;
                console.warn("Dynamic model discovery bypassed, using standard model list:", err);
            }

            // Fallback list of modern standard models
            const fallbackList = [
                'gemini-2.0-flash',
                'gemini-2.5-flash',
                'gemini-1.5-flash',
                'gemini-1.5-flash-8b',
                'gemini-1.5-pro',
                'gemini-pro'
            ];
            candidateModels = Array.from(new Set([...candidateModels, ...fallbackList]));

            updateStatus("Generating custom worksheet with Gemini AI...");

            let lastErr = "";
            for (const model of candidateModels) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 20000); // generous 20s timeout per call

                    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        signal: controller.signal,
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { 
                                temperature: 0.7,
                                maxOutputTokens: 3000
                            }
                        })
                    });
                    clearTimeout(timeoutId);

                    const data = await res.json();
                    if (res.ok && data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                        // Success! Cache working model
                        localStorage.setItem('cached_working_gemini_model', model);
                        return data.candidates[0].content.parts[0].text;
                    }

                    if (data.error) {
                        lastErr = data.error.message;
                        if (data.error.message.includes('API key not valid') || data.error.message.includes('API_KEY_INVALID')) {
                            throw new Error("Invalid API key. Please check your key in the 🔑 API Key settings.");
                        }
                    }
                } catch (e) {
                    if (e.message && e.message.includes('Invalid API key')) throw e;
                    lastErr = e.message;
                }
            }

            throw new Error(lastErr || "Could not generate content from Gemini AI. Please check your connection and API key.");
        }

        function openApiKeyModal() {
            const modal = document.getElementById('api-key-modal');
            const input = document.getElementById('web-api-key-input');
            const statusBox = document.getElementById('api-key-test-status');
            if (statusBox) statusBox.style.display = 'none';

            const savedKey = localStorage.getItem('web_gemini_api_key');
            if (savedKey) {
                input.value = savedKey;
            }
            modal.style.display = 'flex';
        }

        function toggleApiKeyVisibility() {
            const input = document.getElementById('web-api-key-input');
            const btn = document.getElementById('btn-toggle-key-visibility');
            if (!input) return;
            if (input.type === 'password') {
                input.type = 'text';
                if (btn) btn.innerText = '🙈';
            } else {
                input.type = 'password';
                if (btn) btn.innerText = '👁️';
            }
        }

        async function testWebApiKey() {
            const input = document.getElementById('web-api-key-input');
            const statusBox = document.getElementById('api-key-test-status');
            const testBtn = document.getElementById('btn-test-api-key');
            const key = input ? input.value.trim() : "";

            if (!key) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#fef2f2';
                    statusBox.style.border = '1px solid #fecaca';
                    statusBox.style.color = '#991b1b';
                    statusBox.innerHTML = '⚠️ Please enter an API key first before testing.';
                }
                return;
            }

            if (testBtn) testBtn.disabled = true;
            if (statusBox) {
                statusBox.style.display = 'block';
                statusBox.style.background = '#f0f9ff';
                statusBox.style.border = '1px solid #bae6fd';
                statusBox.style.color = '#0369a1';
                statusBox.innerHTML = '⏳ Testing connection to Google Gemini API...';
            }

            try {
                const responseText = await fetchGeminiWithFallback(key, "Write a 1-sentence friendly greeting for an English classroom.");
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#f0fdf4';
                    statusBox.style.border = '1px solid #bbf7d0';
                    statusBox.style.color = '#166534';
                    const activeModel = localStorage.getItem('cached_working_gemini_model') || 'Gemini Flash';
                    statusBox.innerHTML = `✅ <strong>Connected successfully!</strong> Verified with model: <code>${escapeHtml(activeModel)}</code>.<br><span style="font-size: 11.5px; opacity: 0.9;">AI Test Output: "${escapeHtml(responseText.substring(0, 70))}..."</span>`;
                }
            } catch (err) {
                if (statusBox) {
                    statusBox.style.display = 'block';
                    statusBox.style.background = '#fef2f2';
                    statusBox.style.border = '1px solid #fecaca';
                    statusBox.style.color = '#991b1b';
                    statusBox.innerHTML = `❌ <strong>Connection failed:</strong> ${escapeHtml(err.message)}`;
                }
            } finally {
                if (testBtn) testBtn.disabled = false;
            }
        }

        function saveWebApiKey() {
            const input = document.getElementById('web-api-key-input');
            const key = input ? input.value.trim() : "";
            if (key) {
                localStorage.setItem('web_gemini_api_key', key);
                document.getElementById('api-key-modal').style.display = 'none';
                showToast("API Key saved successfully!", "🔑");
                
                // If user was trying to generate, re-trigger AI creation now
                const promptVal = document.getElementById('custom-prompt') ? document.getElementById('custom-prompt').value.trim() : "";
                if (promptVal || typeof currentLoadedSample !== 'undefined') {
                    setTimeout(() => { askAITutor(); }, 300);
                }
            } else {
                localStorage.removeItem('web_gemini_api_key');
                localStorage.removeItem('cached_working_gemini_model');
                document.getElementById('api-key-modal').style.display = 'none';
                showToast("API Key cleared.", "🗑️");
            }
        }

        function generateOfflineWorksheetFallback(userQuery, sampleData) {
            const rawTopic = (userQuery || (sampleData ? sampleData.title : 'English Practice')).trim();
            const lowerTopic = rawTopic.toLowerCase();
            
            let title = rawTopic ? rawTopic.toUpperCase() : 'ENGLISH LANGUAGE COMPREHENSIVE PRACTICE';
            if (!title.includes('WORKSHEET') && !title.includes('PRACTICE') && !title.includes('LESSON')) {
                title += ' — PRACTICE WORKSHEET';
            }

            let headerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px solid #cbd5e1; padding-bottom: 12px; font-size: 15px; color: #475569;">
                <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
                <span><strong>Student:</strong> ___________________________</span>
                <span><strong>Date:</strong> _________________</span>
            </div>
            <h2 style="text-align: center; color: #0f172a; margin-bottom: 6px; font-size: 24px; font-weight: 700;">${title}</h2>
            <p style="text-align: center; color: #64748b; font-size: 14px; margin-bottom: 24px; font-style: italic;">Curriculum Topic: ${rawTopic}</p>
            `;

            // If sample material is loaded, create exercises based on the sample
            if (sampleData && sampleData.content) {
                const excerpt = sampleData.content.substring(0, 450);
                return headerHTML + `
                <h3>Part 1: Text Study & Key Vocabulary</h3>
                <p><strong>Instructions:</strong> Read the reference material carefully and identify key terms.</p>
                <div style="background: #f8fafc; padding: 18px 22px; border-left: 4px solid #3b82f6; border-radius: 8px; margin-bottom: 20px; font-size: 14.5px; line-height: 1.6; color: #1e293b;">
                    ${excerpt}${sampleData.content.length > 450 ? '...' : ''}
                </div>

                <h3>Part 2: Comprehension & Text Analysis</h3>
                <p><strong>Instructions:</strong> Answer the following questions based on the text above.</p>
                <ol style="line-height: 2.3; margin-bottom: 24px;">
                    <li>What is the main theme or primary focus discussed in this passage?<br>__________________________________________________________________________________________</li>
                    <li>List two important facts or vocabulary details mentioned in the text:<br>a) ______________________________________________________________________________________<br>b) ______________________________________________________________________________________</li>
                    <li>According to the context, explain why this topic is significant for English learners:<br>__________________________________________________________________________________________</li>
                </ol>

                <h3>Part 3: Vocabulary in Action & Sentence Building</h3>
                <p><strong>Instructions:</strong> Complete the sentences below by choosing suitable words from the reading.</p>
                <ol style="line-height: 2.3; margin-bottom: 24px;">
                    <li>The author emphasizes that understanding ______________________ leads to greater confidence.</li>
                    <li>Students should actively practice using these terms in everyday ______________________.</li>
                    <li>Rewrite one key idea from the text in your own words:<br>__________________________________________________________________________________________</li>
                </ol>

                <h3>Part 4: Creative Extension & Writing</h3>
                <p><strong>Instructions:</strong> Write a short paragraph (3-4 sentences) expressing your thoughts on this topic.</p>
                <p style="line-height: 2.2;">
                    ___________________________________________________________________________________________________<br>
                    ___________________________________________________________________________________________________<br>
                    ___________________________________________________________________________________________________
                </p>

                <div class='image-placeholder' style='width: 100%; max-width: 450px; height: 140px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 25px auto; background: #fafafa; color: #64748b; font-weight: 600;'>
                    📷 Student Illustration Corner: Draw a visual concept related to this lesson
                </div>
                `;
            }

            // Check topic themes:
            if (lowerTopic.includes('past') || lowerTopic.includes('present') || lowerTopic.includes('future') || lowerTopic.includes('tense') || lowerTopic.includes('grammar') || lowerTopic.includes('verb') || lowerTopic.includes('passive') || lowerTopic.includes('conditional')) {
                return headerHTML + `
                <h3>Part 1: Grammar Focus & Rule Summary</h3>
                <div style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; color: #166534;">
                    <strong>Grammar Tip:</strong> Pay close attention to subject-verb agreement, auxiliary verbs, and time signal words (e.g., <em>always, yesterday, tomorrow, since, for, usually</em>).
                </div>

                <h3>Part 2: Fill in the Blanks (Correct Verb Form)</h3>
                <p><strong>Instructions:</strong> Put the verbs in brackets into the correct tense according to the context.</p>
                <ol style="line-height: 2.4; margin-bottom: 24px;">
                    <li>Sarah usually ______________________ (study) English for two hours every evening.</li>
                    <li>Last weekend, the students ______________________ (visit) the historical museum in town.</li>
                    <li>If we prepare thoroughly for the exam, we ______________________ (achieve) excellent results.</li>
                    <li>While my brother ______________________ (read) an article, the phone rang.</li>
                    <li>They have already ______________________ (complete) their weekly grammar assignments.</li>
                </ol>

                <h3>Part 3: Sentence Transformation & Error Correction</h3>
                <p><strong>Instructions:</strong> Find the error in each sentence and rewrite it correctly.</p>
                <ol style="line-height: 2.4; margin-bottom: 24px;">
                    <li><em>Incorrect:</em> She do not likes waking up early on Monday mornings.<br><strong>Correction:</strong> _______________________________________________________________________</li>
                    <li><em>Incorrect:</em> Yesterday they was playing football when it started raining.<br><strong>Correction:</strong> _______________________________________________________________________</li>
                    <li><em>Incorrect:</em> He has lived in London since five years.<br><strong>Correction:</strong> _______________________________________________________________________</li>
                </ol>

                <h3>Part 4: Writing Practice</h3>
                <p><strong>Instructions:</strong> Write three original sentences using the target grammar structure to describe your daily life.</p>
                <ol style="line-height: 2.3;">
                    <li>1) ____________________________________________________________________________________</li>
                    <li>2) ____________________________________________________________________________________</li>
                    <li>3) ____________________________________________________________________________________</li>
                </ol>

                <div class='image-placeholder' style='width: 100%; max-width: 450px; height: 130px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 25px auto; background: #fafafa; color: #64748b; font-weight: 600;'>
                    📷 Diagram / Visual Box: Mind map of grammar rules and example sentences
                </div>
                `;
            }

            if (lowerTopic.includes('food') || lowerTopic.includes('animal') || lowerTopic.includes('family') || lowerTopic.includes('job') || lowerTopic.includes('school') || lowerTopic.includes('weather') || lowerTopic.includes('vocab') || lowerTopic.includes('sport') || lowerTopic.includes('travel') || lowerTopic.includes('house')) {
                return headerHTML + `
                <h3>Part 1: Key Vocabulary Bank</h3>
                <p><strong>Instructions:</strong> Study the vocabulary box below and match each word with its corresponding description.</p>
                
                <div style="border: 2px dashed #3b82f6; padding: 14px 20px; border-radius: 12px; background: #eff6ff; margin-bottom: 20px; font-weight: 600; text-align: center; color: #1e40af; letter-spacing: 0.5px;">
                    [ Discovery &bull; Harmony &bull; Essential &bull; Environment &bull; Adventure &bull; Resource ]
                </div>

                <ol style="line-height: 2.3; margin-bottom: 24px;">
                    <li>Something that is absolutely necessary and important: ______________________</li>
                    <li>The natural world including land, water, plants, and animals: ______________________</li>
                    <li>An exciting and memorable journey or experience: ______________________</li>
                    <li>The act of finding or learning something new for the first time: ______________________</li>
                    <li>A valuable supply or material that can be used effectively: ______________________</li>
                </ol>

                <h3>Part 2: Sentence Completion</h3>
                <p><strong>Instructions:</strong> Complete the sentences below using words from the vocabulary bank.</p>
                <ol style="line-height: 2.4; margin-bottom: 24px;">
                    <li>Drinking clean water and eating fresh fruit is ______________________ for staying healthy.</li>
                    <li>Our teacher encouraged us to protect the local ______________________ by planting trees.</li>
                    <li>Traveling to a new country is always a wonderful ______________________ filled with new stories.</li>
                    <li>Libraries provide a rich educational ______________________ for students of all ages.</li>
                </ol>

                <h3>Part 3: Reading Passage & Comprehension</h3>
                <div style="background: #f8fafc; padding: 16px 20px; border-left: 4px solid #2563eb; border-radius: 8px; margin-bottom: 18px; font-size: 14.5px; line-height: 1.6;">
                    Developing a rich vocabulary is one of the most rewarding aspects of learning English. When students encounter new words in context and practice using them in conversations, their communication becomes fluent, expressive, and natural.
                </div>
                <ol style="line-height: 2.3; margin-bottom: 24px;">
                    <li>Why is learning vocabulary in context beneficial for learners?<br>__________________________________________________________________________________________</li>
                    <li>How does daily practice help improve speaking confidence?<br>__________________________________________________________________________________________</li>
                </ol>

                <h3>Part 4: Expressive Writing</h3>
                <p><strong>Instructions:</strong> Write 2-3 sentences about your favorite experience related to <strong>${rawTopic}</strong>.</p>
                <p style="line-height: 2.2;">
                    ___________________________________________________________________________________________________<br>
                    ___________________________________________________________________________________________________
                </p>

                <div class='image-placeholder' style='width: 100%; max-width: 450px; height: 140px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 25px auto; background: #fafafa; color: #64748b; font-weight: 600;'>
                    📷 Visual Picture Corner: Draw and label 2 items related to ${rawTopic}
                </div>
                `;
            }

            // Default Rich General English Reading & Practice Worksheet
            return headerHTML + `
            <h3>Part 1: Key Vocabulary & Word Study</h3>
            <p><strong>Instructions:</strong> Read the words in the box and use them to fill in the blanks correctly.</p>
            
            <div style="border: 2px dashed #94a3b8; padding: 14px 20px; border-radius: 12px; background: #f8fafc; margin-bottom: 20px; font-weight: 600; text-align: center; letter-spacing: 0.5px; color: #334155;">
                [ Practice &bull; Structure &bull; Knowledge &bull; Fluency &bull; Expression &bull; Progress ]
            </div>

            <ol style="line-height: 2.3; margin-bottom: 24px;">
                <li>Consistent speaking ______________________ helps learners build strong communicative confidence.</li>
                <li>Clear grammar rules provide a sturdy ______________________ for writing coherent essays.</li>
                <li>Expanding your ______________________ of idioms makes everyday English more natural.</li>
                <li>Reading diverse books is a proven way to achieve higher reading ______________________.</li>
                <li>Creative storytelling gives students freedom of personal ______________________.</li>
            </ol>

            <h3>Part 2: Reading Comprehension</h3>
            <p><strong>Instructions:</strong> Read the short educational passage below and answer the comprehension questions.</p>
            
            <div style="background: #f1f5f9; padding: 18px 22px; border-left: 4px solid #2563eb; border-radius: 8px; margin-bottom: 20px; font-size: 14.5px; line-height: 1.6; color: #1e293b;">
                Language learning is an empowering journey that connects people across cultures. By actively reading authentic texts, engaging in discussions, and reflecting on feedback, learners turn basic vocabulary into meaningful communication. Dedicated practice each day ensures long-term mastery and academic success.
            </div>

            <ol style="line-height: 2.3; margin-bottom: 24px;">
                <li>What makes language learning an empowering journey according to the text?<br>__________________________________________________________________________________________</li>
                <li>Name two specific activities mentioned that help students improve their English:<br>a) ______________________________________________________________________________________<br>b) ______________________________________________________________________________________</li>
                <li>In your own words, explain why daily practice is essential for mastery:<br>__________________________________________________________________________________________</li>
            </ol>

            <h3>Part 3: Grammar & Sentence Construction</h3>
            <p><strong>Instructions:</strong> Reorder the words below to form complete, grammatically correct sentences.</p>
            
            <ol style="line-height: 2.4; margin-bottom: 24px;">
                <li>(every / reads / student / the / morning / articles)<br>__________________________________________________________________________________________</li>
                <li>(effective / practice / builds / communication / daily / skills)<br>__________________________________________________________________________________________</li>
                <li>(always / their / prepare / teachers / lessons / carefully)<br>__________________________________________________________________________________________</li>
            </ol>

            <h3>Part 4: Writing & Reflection Prompt</h3>
            <p><strong>Instructions:</strong> Write 3-4 complete sentences describing what you learned from this lesson.</p>
            <p style="line-height: 2.2;">
                ___________________________________________________________________________________________________<br>
                ___________________________________________________________________________________________________<br>
                ___________________________________________________________________________________________________
            </p>

            <div class='image-placeholder' style='width: 100%; max-width: 450px; height: 140px; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 25px auto; background: #fafafa; color: #64748b; font-weight: 600;'>
                📷 Student Drawing Corner: Illustrate your key takeaway from this worksheet
            </div>
            `;
        }

        function generateAndLoadOfflineNow() {
            const customPromptInput = document.getElementById('custom-prompt');
            const userRequest = customPromptInput ? customPromptInput.value.trim() : "";
            const content = generateOfflineWorksheetFallback(userRequest, currentLoadedSample);
            showToast("Loaded ready-made worksheet!", "⚡");
            onAiResponse(content);
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
            
            try {
                enqueueNodes(sourceNodes, root);
            } catch (e) {
                console.error("DOM Parsing error", e);
                container.innerHTML = html; // fallback
                if(callback) callback();
                return;
            }
            
            let qIdx = 0;
            let textIdx = 0;
            
            function processQueue() {
                try {
                    if (qIdx >= queue.length) {
                        if (cursor.parentNode) cursor.remove();
                        if (callback) callback();
                        return;
                    }
                    
                    let item = queue[qIdx];
                    
                    if (item.type === 'element') {
                        if (item.parent) item.parent.appendChild(item.element);
                        qIdx++;
                        processQueue();
                    } else if (item.type === 'text') {
                        if (textIdx === 0) {
                            item.textNode = document.createTextNode('');
                            if (item.parent) {
                                item.parent.appendChild(item.textNode);
                                item.parent.appendChild(cursor);
                            }
                        }
                        
                        if (textIdx < item.text.length) {
                            let chunk = 35; // fast responsive typing
                            item.textNode.textContent += item.text.substring(textIdx, textIdx + chunk);
                            textIdx += chunk;
                            
                            setTimeout(processQueue, 0); 
                        } else {
                            textIdx = 0;
                            qIdx++;
                            processQueue();
                        }
                    }
                } catch(e) {
                    console.error("Typing error", e);
                    // Abort animation and just show everything
                    container.innerHTML = '<div id="ws-content-root" style="color: black; padding: 10px;">' + html + '</div>';
                    if (callback) callback();
                }
            }
            
            processQueue();
        }

        function onAiResponse(responseText) {
            const btn = document.getElementById('ai-button');
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '✨ Generate Worksheet <span class="premium-pill">PRO</span>';
            }
            
            const customPromptInput = document.getElementById('custom-prompt');
            const userRequest = customPromptInput ? customPromptInput.value.trim() : "";

            let formattedText = responseText.replace(/```html/g, '').replace(/```/g, '');

            // Clear progress timers
            clearTimeout(window.__genStepTimer1);
            clearTimeout(window.__genStepTimer2);

            const isError = !formattedText || 
                formattedText.trim() === '' ||
                formattedText.startsWith('API_ERROR:') || 
                formattedText.includes('API_KEY_MISSING:') || 
                formattedText.includes('Please configure your GEMINI_API_KEY');

            if (isError) {
                console.warn("AI generation returned API error or key missing. Generating full pedagogical worksheet via curriculum engine:", formattedText);
                const generatedWorksheet = generateOfflineWorksheetFallback(userRequest, currentLoadedSample);
                const topNotice = `
                <div class="no-print" style="margin-bottom: 18px; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 12px; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #1e40af; font-weight: 600;">
                        <span>⚡</span>
                        <span>Generated using Built-In Pedagogical Curriculum Engine</span>
                    </div>
                    <button type="button" onclick="openApiKeyModal()" style="background: #2563eb; color: white; border: none; border-radius: 8px; padding: 5px 12px; font-size: 12px; font-weight: 700; cursor: pointer;">
                        🔑 Connect Gemini Key for Cloud AI
                    </button>
                </div>
                `;
                formattedText = topNotice + generatedWorksheet;
                showToast("Worksheet generated successfully! 📄✨", "✨");
            } else {
                // Auto-embed Pollinations AI illustration based on worksheet topic if missing
                if (!formattedText.includes('<img') && userRequest) {
                    const encodedTopic = encodeURIComponent(userRequest.substring(0, 80) + " clean flat vector icon educational clipart white background");
                    const imageHtml = `<div class="ws-block" style="text-align: center; margin-bottom: 20px; background: transparent; border: none; box-shadow: none; padding: 0;"><img src="https://image.pollinations.ai/prompt/${encodedTopic}?width=400&height=400&nologo=true" style="max-width: 140px; border-radius: 16px; display: inline-block; box-shadow: 0 8px 24px rgba(0,0,0,0.12);" alt="Educational Illustration"></div>`;
                    
                    if (formattedText.includes('</h2>')) {
                        formattedText = formattedText.replace('</h2>', '</h2>\n' + imageHtml);
                    } else {
                        formattedText = imageHtml + formattedText;
                    }
                }
                showToast("Worksheet generated with Gemini AI! 📄✨", "✨");
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

        let currentWorksheetZoom = 1.0;
        function setWorksheetContentZoom(scale) {
            currentWorksheetZoom = Math.max(0.5, Math.min(2.0, scale));
            const levelBody = document.getElementById('level-body');
            const display = document.getElementById('worksheet-font-size-display');
            if (levelBody) {
                levelBody.style.setProperty('--ws-scale', currentWorksheetZoom);
                levelBody.style.transformOrigin = 'top center';
                levelBody.style.fontSize = (currentWorksheetZoom * 100) + '%';
                
                // Scale any explicitly styled children while maintaining proportional hierarchy
                const elements = levelBody.querySelectorAll('h1, h2, h3, h4, p, span, li, label, input, textarea, div.ws-block, table, th, td');
                elements.forEach(el => {
                    if (!el.dataset.origBaseSize) {
                        const computed = window.getComputedStyle(el).fontSize;
                        el.dataset.origBaseSize = computed;
                    }
                    if (el.dataset.origBaseSize && el.dataset.origBaseSize.endsWith('px')) {
                        const basePx = parseFloat(el.dataset.origBaseSize);
                        el.style.fontSize = (basePx * currentWorksheetZoom).toFixed(1) + 'px';
                    }
                });
            }
            if (display) {
                display.innerText = Math.round(currentWorksheetZoom * 100) + '%';
            }
        }

        function changeWorksheetFontSize(delta) {
            setWorksheetContentZoom(currentWorksheetZoom + (delta * 0.1));
            showToast(`Content scale: ${Math.round(currentWorksheetZoom * 100)}%`, "🔍");
        }

        function resetWorksheetContentSize() {
            setWorksheetContentZoom(1.0);
            showToast("Content size reset to 100%", "↺");
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

        function handleWorksheetInputForSpellcheck() {
            if (spellcheckTimeoutId) clearTimeout(spellcheckTimeoutId);
            spellcheckTimeoutId = setTimeout(() => {
                triggerRealTimeSpellcheck();
            }, 600);
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
            const spellcheckEnabled = document.getElementById('spellcheck-toggle') ? document.getElementById('spellcheck-toggle').checked : true;
            blocks.forEach((block, index) => {
                block.setAttribute('contenteditable', 'true');
                block.setAttribute('spellcheck', spellcheckEnabled ? 'true' : 'false');
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
            
            // Add custom real-time spellcheck hook
            if (spellcheckEnabled) {
                initCustomSpellchecker();
                triggerRealTimeSpellcheck();
                root.removeEventListener('input', handleWorksheetInputForSpellcheck);
                root.addEventListener('input', handleWorksheetInputForSpellcheck);
            }
        }

        function cleanWorksheetForPreview() {
            const root = document.getElementById('ws-content-root') || document.getElementById('level-body');
            if (!root) return;
            
            root.removeEventListener('input', handleWorksheetInputForSpellcheck);

            const blocks = root.querySelectorAll('.ws-block');
            blocks.forEach(block => {
                block.removeAttribute('contenteditable');
                block.removeAttribute('draggable');
                const controls = block.querySelector('.ws-block-controls');
                if (controls) controls.remove();
            });
            
            // Dynamically update the QR code content to reflect the new edited worksheet state
            updateQRCodePreview();
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
                showToast("No original AI generation to restore.", "ℹ️");
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

        function insertPageBreak() {
            // contenteditable="false" ensures the user can't accidentally type inside the divider line itself
            const breakHtml = `<div class="manual-page-break" contenteditable="false"></div><p style="margin: 8px 0;"><br></p>`;
            insertHtmlAtCursor(breakHtml);
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
                id: 'tmpl-spiral-workbook',
                title: 'Illustrated Visual Workbook (Spiral)',
                category: 'ILLUSTRATED & GRAMMAR',
                badgeBg: '#e0f2fe',
                badgeColor: '#0284c7',
                icon: '📓',
                description: "Children's illustrated visual grammar & vocabulary workbook with realistic spiral notebook binding, cute cartoon picture cards, remember tips, and quick practice matching exercises (as seen in screenshot).",
                wireframe: '<b>[Spiral Notebook Left Binding]</b><br>⭐ <b>POSSESSIVE ADJECTIVES</b> ✏️<br><b>[Part 1]</b> 7 Cartoon Picture Cards (I→my, you→your, etc.)<br><b>[Part 2]</b> Remember Box + 3 Example Cards<br><b>[Part 3]</b> 4 Possession Cards (\'s)<br><b>[Part 4]</b> Quick Practice (Match + Circle)',
                aiPrompt: "Generate an illustrated children's workbook worksheet about Possessive Adjectives and 'S Possession with spiral notebook binding. Include cute cartoon picture cards for each pronoun, a remember rule box, example illustrated cards, and quick practice matching exercises.",
                getHTML: function() {
                    return `
                    <!-- Header Title & Teacher / Student Details -->
                    <div style="text-align: center; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        <span style="font-size: 22px;">⭐</span>
                        <h2 style="color: #1e3a8a; font-size: 21px; font-weight: 900; letter-spacing: 0.5px; margin: 0; text-transform: uppercase;">POSSESSIVE ADJECTIVES & 'S POSSESSION</h2>
                        <span style="font-size: 22px;">✏️</span>
                    </div>

                    <div style="display: flex; justify-content: space-between; margin-bottom: 16px; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 8px; font-size: 13.5px; color: #334155; font-weight: 600;">
                        <span>Name: __________________________</span>
                        <span>Class: ____________</span>
                        <span>Date: ____________</span>
                    </div>

                    <!-- 1 LEARN: POSSESSIVE ADJECTIVES -->
                    <div class="ws-block" style="margin-bottom: 16px; padding: 12px; background: #ffffff; border-radius: 14px; border: 1.5px solid #bfdbfe; box-shadow: 0 2px 8px rgba(37,99,235,0.05);">
                        <div style="display: inline-flex; align-items: center; gap: 8px; background: #1e40af; color: white; border-radius: 9999px; padding: 4px 14px; font-weight: 800; font-size: 13px; margin-bottom: 12px;">
                            <span style="background: white; color: #1e40af; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">1</span>
                            <span>LEARN: POSSESSIVE ADJECTIVES</span>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center;">
                            <!-- 1: I -> my -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #dbeafe; color: #1e40af; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">I<br>↓<br>my</div>
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20boy%20sitting%20reading%20a%20red%20book%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="my book">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">This is<br><strong style="color: #1e40af;">my</strong> book.</div>
                            </div>
                            <!-- 2: you -> your -->
                            <div style="border: 1.2px solid #bbf7d0; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #dcfce7; color: #15803d; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">you<br>↓<br>your</div>
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20little%20girl%20smiling%20holding%20a%20pencil%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="your pencil">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">This is<br><strong style="color: #15803d;">your</strong> pencil.</div>
                            </div>
                            <!-- 3: he -> his -->
                            <div style="border: 1.2px solid #e9d5ff; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #f3e8ff; color: #7e22ce; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">he<br>↓<br>his</div>
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20boy%20riding%20a%20bicycle%20wearing%20helmet%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="his bike">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">This is<br><strong style="color: #7e22ce;">his</strong> bike.</div>
                            </div>
                            <!-- 4: she -> her -->
                            <div style="border: 1.2px solid #fbcfe8; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #fce7f3; color: #be185d; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">she<br>↓<br>her</div>
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20girl%20hugging%20a%20doll%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="her doll">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">This is<br><strong style="color: #be185d;">her</strong> doll.</div>
                            </div>
                            <!-- 5: it -> its -->
                            <div style="border: 1.2px solid #fde68a; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #fef3c7; color: #b45309; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">it<br>↓<br>its</div>
                                <img src="https://image.pollinations.ai/prompt/cute%20grey%20and%20white%20cat%20eating%20food%20from%20a%20blue%20bowl%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="its food">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">The cat is<br>eating <strong style="color: #b45309;">its</strong> food.</div>
                            </div>
                            <!-- 6: we -> our -->
                            <div style="border: 1.2px solid #99f6e4; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #ccfbf1; color: #0f766e; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">we<br>↓<br>our</div>
                                <img src="https://image.pollinations.ai/prompt/school%20classroom%20with%20blackboard%20and%20desks%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="our classroom">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">This is<br><strong style="color: #0f766e;">our</strong> classroom.</div>
                            </div>
                            <!-- 7: they -> their -->
                            <div style="border: 1.2px solid #c7d2fe; border-radius: 10px; padding: 6px 4px; background: #f8fafc;">
                                <div style="background: #e0e7ff; color: #4338ca; border-radius: 9999px; padding: 2px 4px; font-weight: 800; font-size: 11px; margin-bottom: 4px;">they<br>↓<br>their</div>
                                <img src="https://image.pollinations.ai/prompt/two%20happy%20school%20children%20wearing%20backpacks%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 54px; height: 54px; object-fit: contain; margin: 0 auto 4px; display: block; border-radius: 6px;" alt="their bags">
                                <div style="font-size: 10px; font-weight: 600; color: #1e293b; line-height: 1.2;">These are<br><strong style="color: #4338ca;">their</strong> bags.</div>
                            </div>
                        </div>
                    </div>

                    <!-- 2 REMEMBER -->
                    <div class="ws-block" style="margin-bottom: 16px; padding: 12px; background: #ffffff; border-radius: 14px; border: 1.5px solid #93c5fd; box-shadow: 0 2px 8px rgba(37,99,235,0.05);">
                        <div style="display: inline-flex; align-items: center; gap: 8px; background: #1e40af; color: white; border-radius: 9999px; padding: 4px 14px; font-weight: 800; font-size: 13px; margin-bottom: 10px;">
                            <span style="background: white; color: #1e40af; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">2</span>
                            <span>REMEMBER</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1.3fr; gap: 10px; align-items: center;">
                            <!-- Tip 1 -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 10px; background: #f0f9ff; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 22px;">⭐</span>
                                <div style="font-size: 12px; line-height: 1.4; color: #1e3a8a; font-weight: 600;">Possessive adjectives come <strong>before nouns</strong>.</div>
                            </div>
                            <!-- Tip 2 -->
                            <div style="border: 1.2px solid #fde68a; border-radius: 10px; padding: 10px; background: #fefce8; display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 22px;">💡</span>
                                <div style="font-size: 12px; line-height: 1.4; color: #854d0e; font-weight: 600;">We use them to show <strong>who something belongs to</strong>.</div>
                            </div>
                            <!-- Examples -->
                            <div style="border: 1.2px solid #cbd5e1; border-radius: 10px; padding: 8px 10px; background: #f8fafc;">
                                <div style="font-size: 11px; font-weight: 800; color: #64748b; margin-bottom: 6px;">Examples:</div>
                                <div style="display: flex; justify-content: space-around; gap: 6px; text-align: center;">
                                    <div>
                                        <img src="https://image.pollinations.ai/prompt/blue%20school%20backpack%20bag%20children%20book%20educational%20clipart%20clean%20white%20background?width=180&height=180&nologo=true" style="width: 36px; height: 36px; object-fit: contain; margin: 0 auto 2px; display: block;" alt="my bag">
                                        <span style="background: #e0f2fe; color: #0369a1; border-radius: 6px; padding: 2px 6px; font-size: 10.5px; font-weight: 700;">my bag</span>
                                    </div>
                                    <div>
                                        <img src="https://image.pollinations.ai/prompt/pink%20writing%20pen%20children%20book%20educational%20clipart%20clean%20white%20background?width=180&height=180&nologo=true" style="width: 36px; height: 36px; object-fit: contain; margin: 0 auto 2px; display: block;" alt="her pen">
                                        <span style="background: #fce7f3; color: #be185d; border-radius: 6px; padding: 2px 6px; font-size: 10.5px; font-weight: 700;">her pen</span>
                                    </div>
                                    <div>
                                        <img src="https://image.pollinations.ai/prompt/cozy%20little%20family%20house%20with%20roof%20children%20book%20educational%20clipart%20clean%20white%20background?width=180&height=180&nologo=true" style="width: 36px; height: 36px; object-fit: contain; margin: 0 auto 2px; display: block;" alt="their house">
                                        <span style="background: #f1f5f9; color: #334155; border-radius: 6px; padding: 2px 6px; font-size: 10.5px; font-weight: 700;">their house</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3 LEARN: 'S POSSESSION -->
                    <div class="ws-block" style="margin-bottom: 16px; padding: 12px; background: #ffffff; border-radius: 14px; border: 1.5px solid #bfdbfe; box-shadow: 0 2px 8px rgba(37,99,235,0.05);">
                        <div style="display: inline-flex; align-items: center; gap: 8px; background: #1e40af; color: white; border-radius: 9999px; padding: 4px 14px; font-weight: 800; font-size: 13px; margin-bottom: 8px;">
                            <span style="background: white; color: #1e40af; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">3</span>
                            <span>LEARN: 'S POSSESSION</span>
                        </div>
                        <div style="text-align: center; font-size: 13px; color: #1e3a8a; font-weight: 600; margin-bottom: 10px;">
                            We add <strong>'s</strong> to a name to show possession.
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center;">
                            <!-- 1 -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 8px; background: #f8fafc;">
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20boy%20holding%20a%20soccer%20ball%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 65px; height: 65px; object-fit: contain; margin: 0 auto 6px; display: block;" alt="Tom's ball">
                                <span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 2px 10px; font-size: 11.5px; font-weight: 700; display: inline-block;">Tom's ball</span>
                            </div>
                            <!-- 2 -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 8px; background: #f8fafc;">
                                <img src="https://image.pollinations.ai/prompt/cute%20cartoon%20girl%20smiling%20holding%20a%20purple%20pen%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 65px; height: 65px; object-fit: contain; margin: 0 auto 6px; display: block;" alt="Sara's pen">
                                <span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 2px 10px; font-size: 11.5px; font-weight: 700; display: inline-block;">Sara's pen</span>
                            </div>
                            <!-- 3 -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 8px; background: #f8fafc;">
                                <img src="https://image.pollinations.ai/prompt/cute%20blue%20compact%20car%20sedan%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 65px; height: 65px; object-fit: contain; margin: 0 auto 6px; display: block;" alt="Mum's car">
                                <span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 2px 10px; font-size: 11.5px; font-weight: 700; display: inline-block;">Mum's car</span>
                            </div>
                            <!-- 4 -->
                            <div style="border: 1.2px solid #bfdbfe; border-radius: 10px; padding: 8px; background: #f8fafc;">
                                <img src="https://image.pollinations.ai/prompt/wooden%20teacher%20desk%20with%20books%20and%20pencils%20children%20book%20educational%20clipart%20clean%20white%20background?width=250&height=250&nologo=true" style="width: 65px; height: 65px; object-fit: contain; margin: 0 auto 6px; display: block;" alt="the teacher's desk">
                                <span style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 9999px; padding: 2px 10px; font-size: 11.5px; font-weight: 700; display: inline-block;">the teacher's desk</span>
                            </div>
                        </div>
                    </div>

                    <!-- 4 QUICK PRACTICE -->
                    <div class="ws-block" style="margin-bottom: 12px; padding: 12px; background: #ffffff; border-radius: 14px; border: 1.5px solid #bfdbfe; box-shadow: 0 2px 8px rgba(37,99,235,0.05);">
                        <div style="display: inline-flex; align-items: center; gap: 8px; background: #1e40af; color: white; border-radius: 9999px; padding: 4px 14px; font-weight: 800; font-size: 13px; margin-bottom: 12px;">
                            <span style="background: white; color: #1e40af; border-radius: 50%; width: 18px; height: 18px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900;">4</span>
                            <span>QUICK PRACTICE</span>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 14px;">
                            <!-- A. Match -->
                            <div style="border: 1.2px solid #e2e8f0; border-radius: 10px; padding: 10px; background: #f8fafc;">
                                <div style="font-weight: 800; font-size: 12px; color: #1e40af; margin-bottom: 8px;">A. Match</div>
                                <table style="width: 100%; font-size: 12px; border-collapse: collapse; font-weight: 600; color: #1e293b;">
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">1</span> I</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">a</span> our</td></tr>
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">2</span> you</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">b</span> my</td></tr>
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">3</span> he</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">c</span> their</td></tr>
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">4</span> she</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">d</span> his</td></tr>
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">5</span> we</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">e</span> your</td></tr>
                                    <tr><td style="padding: 2.5px 0;"><span style="background: #dbeafe; color: #1e40af; padding: 1px 5px; border-radius: 4px;">6</span> they</td><td style="text-align: center; color: #94a3b8;">•</td><td style="text-align: center; color: #94a3b8;">•</td><td><span style="background: #e2e8f0; padding: 1px 5px; border-radius: 4px;">f</span> her</td></tr>
                                </table>
                            </div>
                            <!-- B. Circle the correct word -->
                            <div style="border: 1.2px solid #e2e8f0; border-radius: 10px; padding: 10px; background: #f8fafc;">
                                <div style="font-weight: 800; font-size: 12px; color: #1e40af; margin-bottom: 8px;">B. Circle the correct word.</div>
                                <ol style="margin: 0; padding-left: 16px; line-height: 1.85; font-size: 12px; color: #1e293b; font-weight: 600;">
                                    <li>I have a pencil. It is ( <span style="color: #64748b;">her</span> / <span style="color: #2563eb; text-decoration: underline;">my</span> / <span style="color: #64748b;">their</span> ) pencil.</li>
                                    <li>Ben has a kite. It is ( <span style="color: #64748b;">our</span> / <span style="color: #64748b;">your</span> / <span style="color: #2563eb; text-decoration: underline;">his</span> ) kite.</li>
                                    <li>We love our school. It is ( <span style="color: #2563eb; text-decoration: underline;">our</span> / <span style="color: #64748b;">its</span> / <span style="color: #64748b;">his</span> ) school.</li>
                                    <li>The girls have bags. These are ( <span style="color: #64748b;">her</span> / <span style="color: #2563eb; text-decoration: underline;">their</span> / <span style="color: #64748b;">my</span> ) bags.</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <!-- Footer Page Number with Stars -->
                    <div style="text-align: center; margin-top: 14px; font-size: 13px; font-weight: 700; color: #64748b; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>✨</span>
                        <span>1 / 3</span>
                        <span>⭐</span>
                    </div>
                    `;
                }
            },

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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                        <span><strong>Teacher:</strong> <span class="teacher-name-display">Zaafouri Abdelmalek</span></span>
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
                // Generate a real dynamic image using Pollinations AI!
                const encodedPrompt = encodeURIComponent((promptText || presetKey) + " clean flat vector icon clipart white background educational simple graphic");
                imageSrc = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=500&height=500&nologo=true`;
            }

            return `
            <div class="worksheet-embedded-illustration style-${frameStyle}" style="${widthStyle}">
                <div class="illustration-controls-overlay no-print">
                    <button type="button" onclick="moveIllustration(this, 'up')" title="Move Up">⬆️</button>
                    <button type="button" onclick="moveIllustration(this, 'down')" title="Move Down">⬇️</button>
                    <button type="button" onclick="deleteIllustration(this)" title="Delete">🗑️</button>
                </div>
                <img src="${imageSrc}" alt="${captionText}">
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
                dotColor: '#38bdf8',
                desc: 'Academic Blue & Crisp Whites',
                headerGradient: 'linear-gradient(135deg, #1e40af, #0284c7)',
                bgGradient: 'linear-gradient(135deg, #eff6ff, #e0f2fe)',
                accentColor: '#2563eb',
                swatches: ['#1e40af', '#0284c7', '#2563eb', '#eff6ff']
            },
            icewhite: {
                name: 'Ice White',
                dotColor: '#7dd3fc',
                desc: 'Arctic Frost & Clean Slate',
                headerGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                bgGradient: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
                accentColor: '#0284c7',
                swatches: ['#0284c7', '#38bdf8', '#0ea5e9', '#ffffff']
            },
            emerald: {
                name: 'Emerald',
                dotColor: '#34d399',
                desc: 'Botanical Green & Mint Canvas',
                headerGradient: 'linear-gradient(135deg, #047857, #10b981)',
                bgGradient: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                accentColor: '#059669',
                swatches: ['#047857', '#10b981', '#059669', '#ecfdf5']
            },
            amethyst: {
                name: 'Amethyst',
                dotColor: '#c084fc',
                desc: 'Royal Violet & Soft Purple',
                headerGradient: 'linear-gradient(135deg, #6b21a8, #9333ea)',
                bgGradient: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
                accentColor: '#7c3aed',
                swatches: ['#6b21a8', '#9333ea', '#7c3aed', '#faf5ff']
            },
            amber: {
                name: 'Sunset Amber',
                dotColor: '#fbbf24',
                desc: 'Warm Terracotta & Golden Glow',
                headerGradient: 'linear-gradient(135deg, #c2410c, #d97706)',
                bgGradient: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
                accentColor: '#ea580c',
                swatches: ['#c2410c', '#d97706', '#ea580c', '#fff7ed']
            },
            obsidian: {
                name: 'Midnight Obsidian',
                dotColor: '#818cf8',
                desc: 'High-Contrast Dark Canvas',
                headerGradient: 'linear-gradient(135deg, #0f172a, #1e1b4b)',
                bgGradient: 'linear-gradient(135deg, #090d16, #1e293b)',
                accentColor: '#6366f1',
                swatches: ['#0f172a', '#1e1b4b', '#6366f1', '#090d16']
            }
        };

        function renderThemeCards() {
            const container = document.getElementById('theme-cards-container');
            if (!container) return;

            let currentTheme = 'sapphire';
            try {
                currentTheme = localStorage.getItem('user_app_theme') || 'sapphire';
            } catch(e) {}

            let html = '';
            for (const [key, cfg] of Object.entries(THEMES_CONFIG)) {
                const isActive = (key === currentTheme) || (document.body.classList.contains(`theme-${key}`));

                html += `
                    <div class="theme-preview-card ${isActive ? 'active' : ''}" onclick="setTheme('${key}'); closeThemeMenu();" title="Apply ${cfg.name} Theme">
                        <!-- Mini Window Mockup Preview -->
                        <div class="mini-mock-window" style="background: ${cfg.bgGradient};">
                            <div class="mini-mock-header" style="background: ${cfg.headerGradient};">
                                <div class="mini-mock-header-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <div style="font-size: 7.5px; color: rgba(255,255,255,0.95); font-weight: 800; letter-spacing: 0.4px;">${cfg.name.toUpperCase()}</div>
                            </div>
                            <div class="mini-mock-body">
                                <div class="mini-mock-row">
                                    <div class="mini-mock-pill" style="background: ${cfg.accentColor};"></div>
                                    <div class="mini-mock-line" style="background: ${cfg.accentColor}; opacity: 0.35;"></div>
                                </div>
                                <div class="mini-mock-box" style="background: rgba(255,255,255,0.75);">
                                    <div style="width: 4px; height: 4px; border-radius: 50%; background: ${cfg.accentColor};"></div>
                                    <div style="height: 3px; width: 60%; background: ${cfg.accentColor}; opacity: 0.75; border-radius: 2px;"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Card Info & Color Swatches -->
                        <div class="theme-card-info">
                            <div class="theme-card-title-row">
                                <span class="theme-card-name">${cfg.name}</span>
                                ${isActive ? `<span class="theme-card-active-badge">✓ ACTIVE</span>` : ''}
                            </div>
                            <div class="theme-card-sub">${cfg.desc || ''}</div>
                            
                            <!-- Swatches Bar -->
                            <div class="theme-swatches-bar">
                                ${(cfg.swatches || []).map(color => `
                                    <span class="theme-color-swatch-circle" style="background: ${color};" title="Color swatch ${color}"></span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }
            container.innerHTML = html;
        }

        function toggleThemeMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            const modal = document.getElementById('theme-modal-overlay');
            if (modal) {
                const isShowing = (modal.style.display === 'flex');
                if (!isShowing) {
                    renderThemeCards();
                    modal.style.display = 'flex';
                } else {
                    modal.style.display = 'none';
                }
            }
        }

        function closeThemeMenu() {
            const modal = document.getElementById('theme-modal-overlay');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        function updateDarkModeToggleButton(isDark) {
            const btn = document.getElementById('global-dark-mode-toggle');
            const icon = document.getElementById('dark-mode-icon');
            const label = document.getElementById('dark-mode-label');
            if (icon) icon.innerText = isDark ? '☀️' : '🌙';
            if (label) label.innerText = isDark ? 'Day Mode' : 'Night Mode';

            const modalIcon = document.getElementById('modal-dark-toggle-icon');
            const modalLabel = document.getElementById('modal-dark-toggle-label');
            if (modalIcon) modalIcon.innerText = isDark ? '☀️' : '🌙';
            if (modalLabel) modalLabel.innerText = isDark ? 'Switch to Day Mode' : 'Toggle Night Mode (Obsidian)';

            if (btn) {
                if (isDark) {
                    btn.title = 'Switch to Day Mode (Light Theme)';
                    btn.classList.add('active');
                } else {
                    btn.title = 'Switch to Night Mode (Midnight Obsidian)';
                    btn.classList.remove('active');
                }
            }
        }

        // Make the teacher name in the header pill editable and dynamically update worksheets
        function editTeacherName() {
            const textEl = document.getElementById('teacher-name-text');
            if (!textEl) return;
            const currentName = textEl.innerText;
            const newName = prompt("Enter teacher's name for worksheets:", currentName);
            
            if (newName !== null && newName.trim() !== '') {
                const formattedName = newName.trim();
                textEl.innerText = formattedName;
                
                // Update any currently displayed worksheet
                const levelBody = document.getElementById('level-body');
                if (levelBody) {
                    const teacherDisplays = levelBody.querySelectorAll('.teacher-name-display');
                    teacherDisplays.forEach(el => {
                        el.innerText = formattedName;
                    });
                }
            }
        }

        function toggleGlobalDarkMode() {
            const isCurrentlyDark = document.body.classList.contains('dark-mode') || document.body.classList.contains('theme-obsidian');
            if (isCurrentlyDark) {
                // Switch back to saved light theme or Sapphire
                let lastLightTheme = 'sapphire';
                try {
                    const savedLight = localStorage.getItem('user_last_light_theme');
                    if (savedLight && savedLight !== 'obsidian' && THEMES_CONFIG[savedLight]) {
                        lastLightTheme = savedLight;
                    }
                } catch(e) {}
                setTheme(lastLightTheme, true);
            } else {
                // Remember current theme as light theme before switching to dark
                try {
                    const current = localStorage.getItem('user_app_theme') || 'sapphire';
                    if (current !== 'obsidian') {
                        localStorage.setItem('user_last_light_theme', current);
                    }
                } catch(e) {}
                setTheme('obsidian', true);
            }
        }

        function setTheme(themeKey, showNotification = true) {
            if (!THEMES_CONFIG[themeKey]) themeKey = 'sapphire';
            const body = document.body;
            const html = document.documentElement;
            
            // Remove existing theme classes & attribute
            const allThemeClasses = ['theme-sapphire', 'theme-icewhite', 'theme-emerald', 'theme-amethyst', 'theme-amber', 'theme-obsidian', 'dark-mode'];
            allThemeClasses.forEach(cls => {
                body.classList.remove(cls);
                html.classList.remove(cls);
            });

            // Set data-theme attribute on root html element
            html.setAttribute('data-theme', themeKey);
            
            // Apply new theme class to both body & html
            body.classList.add(`theme-${themeKey}`);
            html.classList.add(`theme-${themeKey}`);

            const isDark = (themeKey === 'obsidian');
            if (isDark) {
                body.classList.add('dark-mode');
                html.classList.add('dark-mode');
                html.setAttribute('data-theme', 'obsidian');
            }

            // Update Dark Mode Toggle Button UI
            updateDarkModeToggleButton(isDark);

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

            // Update Active State in Menu Cards
            renderThemeCards();

            // Persist to local storage
            try {
                localStorage.setItem('user_app_theme', themeKey);
                if (!isDark) {
                    localStorage.setItem('user_last_light_theme', themeKey);
                }
            } catch (e) {
                // Ignore storage errors in restricted contexts
            }

            if (showNotification) {
                showToast(`Applied ${THEMES_CONFIG[themeKey].name} Theme`, isDark ? "🌙" : "🎨");
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

        // Theme menu uses overlay click or close button to dismiss

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

        
        function updatePrintOrientation() {
            const orientation = document.getElementById('preview-orientation-select').value;
            const a4Area = document.getElementById('a4-preview-area');
            const target = document.getElementById('modal-a4-preview-frame');
            const badge = document.querySelector('#print-preview-modal .sample-badge');
            
            let styleBlock = document.getElementById('dynamic-print-orientation');
            if (!styleBlock) {
                styleBlock = document.createElement('style');
                styleBlock.id = 'dynamic-print-orientation';
                document.head.appendChild(styleBlock);
            }
        
            if (orientation === 'landscape') {
                styleBlock.innerHTML = `@media print { @page { size: A4 landscape !important; } }`;
                if (a4Area) a4Area.classList.add('orientation-landscape');
                if (target) target.classList.add('orientation-landscape');
                if (badge) badge.innerText = "297 x 210 mm (Landscape)";
            } else {
                styleBlock.innerHTML = `@media print { @page { size: A4 portrait !important; } }`;
                if (a4Area) a4Area.classList.remove('orientation-landscape');
                if (target) target.classList.remove('orientation-landscape');
                if (badge) badge.innerText = "210 x 297 mm (Portrait)";
            }
        }

        function renderPrintPreviewCanvas() {
            updateQRCodePreview(); // Ensure QR code is up-to-date with current DOM state
            const source = document.getElementById('a4-preview-area');
            const target = document.getElementById('modal-a4-preview-frame');
            if (!source || !target) return;
            
            target.className = 'a4-preview ' + source.className.replace('a4-preview', '');
            target.style.fontFamily = source.style.fontFamily || '';
            target.style.backgroundColor = source.style.backgroundColor || '';
            target.style.borderWidth = source.style.borderWidth || '';
            target.style.borderColor = source.style.borderColor || '';
            target.innerHTML = source.innerHTML;

            const orientationSel = document.getElementById('preview-orientation-select');
            if (orientationSel) {
                if (orientationSel.value === 'landscape') {
                    target.classList.add('orientation-landscape');
                } else {
                    target.classList.remove('orientation-landscape');
                }
            }
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

        function downloadPDFFromPreviewModal() {
            closePrintPreviewModal();
            setTimeout(() => {
                downloadPDFFromAccordion();
            }, 150);
        }

        function printWorksheet() {
            printPage();
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
            const borderThicknessVal = document.getElementById('border-thickness-select') ? document.getElementById('border-thickness-select').value : '2px';
            const fontVal = document.getElementById('font-family-select') ? document.getElementById('font-family-select').value : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            const sizeVal = document.getElementById('font-size-select') ? document.getElementById('font-size-select').value : '18px';
            const pageColorVal = document.getElementById('page-color-select') ? document.getElementById('page-color-select').value : 'white';
            const formattingThemeVal = document.getElementById('formatting-theme-select') ? document.getElementById('formatting-theme-select').value : 'formatting-standard';
            const layoutVal = document.getElementById('layout-columns-select') ? document.getElementById('layout-columns-select').value : 'layout-1col';

            const newItem = {
                id: currentLoadedWorksheetId || ('ws_' + Date.now()),
                title: title,
                category: category,
                date: new Date().toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now(),
                borderStyle: borderVal,
                borderThickness: borderThicknessVal,
                fontFamily: fontVal,
                fontSize: sizeVal,
                pageColor: pageColorVal,
                formattingTheme: formattingThemeVal,
                layoutColumns: layoutVal,
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
            const modalToggle = document.getElementById('preview-qr-toggle');
            const labelInput = document.getElementById('acc-pdf-qr-label');
            const titleText = document.getElementById('a4-qr-title-text');
            if (!previewArea || !qrBox) return;
            
            // Sync modal toggle to match main toggle
            if (modalToggle && toggle) {
                modalToggle.checked = toggle.checked;
            }
            
            // Update custom label
            if (labelInput && titleText) {
                titleText.innerText = labelInput.value.trim() || "📱 Digital Version Link";
            }

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

        // --- DIGITAL SHARE MODAL LOGIC ---
        function openDigitalShareModal(event) {
            if (event) event.stopPropagation();
            const shareUrl = generateWorksheetShareUrl();
            const input = document.getElementById('digital-share-url-input');
            if (input) input.value = shareUrl;
            
            const modal = document.getElementById('digital-share-modal');
            if (modal) modal.style.display = 'flex';
        }

        function closeDigitalShareModal() {
            const modal = document.getElementById('digital-share-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleDigitalShareOverlayClick(event) {
            if (event.target && event.target.id === 'digital-share-modal') {
                closeDigitalShareModal();
            }
        }

        function copyDigitalShareUrl() {
            const shareUrl = generateWorksheetShareUrl();
            if (window.AndroidAI && window.AndroidAI.copyToClipboard) {
                window.AndroidAI.copyToClipboard("Digital Worksheet Link", shareUrl);
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    showToast("Link copied to clipboard!", "📋");
                }).catch(() => {
                    const input = document.getElementById('digital-share-url-input');
                    if (input) { input.select(); document.execCommand('copy'); }
                    showToast("Link copied!", "📋");
                });
            } else {
                const input = document.getElementById('digital-share-url-input');
                if (input) { input.select(); document.execCommand('copy'); }
                showToast("Link copied!", "📋");
            }
        }

        function shareDigitalLinkNative() {
            const shareUrl = generateWorksheetShareUrl();
            const root = document.getElementById('level-body');
            const titleEl = root ? root.querySelector('h1, h2, h3') : null;
            const title = titleEl ? titleEl.innerText : 'English Worksheet';
            
            if (window.AndroidAI && window.AndroidAI.shareText) {
                window.AndroidAI.shareText("Share Digital Worksheet: " + title, shareUrl);
            } else if (navigator.share) {
                navigator.share({
                    title: title,
                    text: 'Interactive English Worksheet: ' + title,
                    url: shareUrl
                }).catch(e => console.log('Share canceled or error', e));
            } else {
                copyDigitalShareUrl();
            }
        }

        function openDigitalLinkDirectly() {
            const shareUrl = generateWorksheetShareUrl();
            if (window.AndroidAI && window.AndroidAI.openExternalUrl) {
                window.AndroidAI.openExternalUrl(shareUrl);
            } else {
                window.open(shareUrl, '_blank');
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

            const element = document.getElementById('a4-preview-area');
            if (element) {
                element.classList.add('rendering-pdf');
                
                // Smart auto-pagination logic
                // A standard A4 page at 96 DPI is ~1123px high. With 1.8cm (~68px) padding top/bottom,
                // the usable content height is roughly 980-1000px.
                const MAX_CONTENT_HEIGHT = 980; 
                
                // Remove any existing dynamic page breaks first
                element.querySelectorAll('.dynamic-page-break').forEach(pb => pb.remove());
                
                // Iterate through blocks and smartly inject page breaks to prevent mid-block clipping
                let currentHeight = 0;
                const blocks = Array.from(element.children).filter(child => {
                    // Ignore elements like the background watermark or QR layer that aren't flow content
                    if(child.classList.contains('a4-qr-layer') || child.classList.contains('pdf-page-break')) return false;
                    return true;
                });
                
                blocks.forEach((block, index) => {
                    const blockHeight = block.offsetHeight;
                    const style = window.getComputedStyle(block);
                    const marginTotal = parseFloat(style.marginTop || 0) + parseFloat(style.marginBottom || 0);
                    const totalBlockSpace = blockHeight + marginTotal;
                    
                    if (currentHeight + totalBlockSpace > MAX_CONTENT_HEIGHT && index !== 0) {
                        // Insert a page break before this block
                        const pageBreak = document.createElement('div');
                        pageBreak.className = 'pdf-page-break dynamic-page-break';
                        element.insertBefore(pageBreak, block);
                        
                        // Reset height accumulator for the new page
                        currentHeight = totalBlockSpace;
                    } else {
                        currentHeight += totalBlockSpace;
                    }
                });
            }

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
            
            const targetFilename = filenameOverride || 'Classroom_Worksheet.pdf';
            const opt = {
                margin:       [8, 8, 10, 8],
                filename:     targetFilename.endsWith('.pdf') ? targetFilename : (targetFilename + '.pdf'),
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false, windowWidth: 794, width: 794, scrollX: 0, scrollY: 0 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['css', 'legacy'], avoid: ['.ws-block', '.middle-box', '.a4-qr-layer', '.image-placeholder', 'tr', 'img', 'p', 'li'] }
            };

            const restoreState = () => {
                if (element) {
                    element.classList.remove('rendering-pdf');
                    // Clean up the dynamic page breaks so they don't break the web view
                    element.querySelectorAll('.dynamic-page-break').forEach(pb => pb.remove());
                }
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = '📥 Download PDF';
                }
                if (wasEditing) setWorksheetEditMode(true);
            };

            setTimeout(() => {
                if (typeof html2pdf !== 'function') {
                    showToast("Directing to print/save as PDF...", "🖨️");
                    restoreState();
                    printWorksheet();
                    return;
                }

                try {
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
                            if (typeof onAndroidFileSaved === 'function') {
                                onAndroidFileSaved(opt.filename, 'application/pdf');
                            } else {
                                showToast("PDF Saved to Downloads!", "📥");
                            }
                        }).catch((e) => {
                            console.error("PDF datauri generation failed, using native print", e);
                            restoreState();
                            printWorksheet();
                        });
                    } else {
                        worker.output('blob').then(function(blob) {
                            restoreState();
                            const url = URL.createObjectURL(blob);
                            const downloadAnchor = document.createElement('a');
                            downloadAnchor.href = url;
                            downloadAnchor.download = opt.filename;
                            document.body.appendChild(downloadAnchor);
                            downloadAnchor.click();
                            setTimeout(() => {
                                if (downloadAnchor.parentNode) downloadAnchor.parentNode.removeChild(downloadAnchor);
                            }, 1000);
                            setTimeout(() => {
                                URL.revokeObjectURL(url);
                            }, 600000);
                            showToast(`PDF downloaded! <a href="${url}" target="_blank" download="${escapeHtml(opt.filename)}" style="margin-left: 8px; color: #60a5fa; font-weight: 700; text-decoration: underline;">📂 Open PDF</a>`, "📥", 10000);
                        }).catch((e) => {
                            console.error("PDF save failed, using print", e);
                            restoreState();
                            printWorksheet();
                        });
                    }
                } catch (pdfErr) {
                    console.error("PDF processing failed, falling back to system print", pdfErr);
                    restoreState();
                    printWorksheet();
                }
            }, 150);
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
            const modal = document.getElementById('saved-worksheets-modal');
            if (modal) {
                modal.style.display = 'flex';
                renderSavedWorksheetsList();
                const searchInput = document.getElementById('saved-search-input');
                if (searchInput) setTimeout(() => searchInput.focus(), 200);
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
            const borderThicknessVal = document.getElementById('border-thickness-select') ? document.getElementById('border-thickness-select').value : '2px';
            const fontVal = document.getElementById('font-family-select') ? document.getElementById('font-family-select').value : "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
            const sizeVal = document.getElementById('font-size-select') ? document.getElementById('font-size-select').value : '18px';
            const pageColorVal = document.getElementById('page-color-select') ? document.getElementById('page-color-select').value : 'white';
            const formattingThemeVal = document.getElementById('formatting-theme-select') ? document.getElementById('formatting-theme-select').value : 'formatting-standard';
            const layoutVal = document.getElementById('layout-columns-select') ? document.getElementById('layout-columns-select').value : 'layout-1col';

            const newItem = {
                id: currentLoadedWorksheetId || ('ws_' + Date.now()),
                title: title,
                category: category,
                date: new Date().toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now(),
                borderStyle: borderVal,
                borderThickness: borderThicknessVal,
                fontFamily: fontVal,
                fontSize: sizeVal,
                pageColor: pageColorVal,
                formattingTheme: formattingThemeVal,
                layoutColumns: layoutVal,
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
            if (item.borderThickness && document.getElementById('border-thickness-select')) {
                document.getElementById('border-thickness-select').value = item.borderThickness;
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
            if (item.formattingTheme && document.getElementById('formatting-theme-select')) {
                document.getElementById('formatting-theme-select').value = item.formattingTheme;
            }
            if (item.layoutColumns && document.getElementById('layout-columns-select')) {
                document.getElementById('layout-columns-select').value = item.layoutColumns;
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

        function openSavedAndroidFile(filename, mimeType) {
            if (window.AndroidAI && typeof window.AndroidAI.openFile === 'function') {
                window.AndroidAI.openFile(filename, mimeType || '*/*');
            } else if (window.AndroidAI && typeof window.AndroidAI.openExternalUrl === 'function') {
                window.AndroidAI.openExternalUrl(filename);
            } else {
                showToast("File is saved in your device Downloads / Pictures folder", "📂");
            }
        }

        function onAndroidFileSaved(filename, mimeType) {
            const isImg = (mimeType || '').startsWith('image/');
            const isPdf = (mimeType || '').includes('pdf');
            const label = isImg ? 'PNG Image' : (isPdf ? 'PDF Document' : 'Document');
            const openBtnHtml = `<button onclick="openSavedAndroidFile('${escapeHtml(filename)}', '${escapeHtml(mimeType)}')" style="margin-left: 10px; padding: 4px 12px; border-radius: 8px; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; border: none; cursor: pointer; font-weight: 700; font-size: 12px; box-shadow: 0 2px 6px rgba(37,99,235,0.3);">📂 Open File</button>`;
            showToast(`${label} saved! ${openBtnHtml}`, "✨", 10000);
        }

        function showToast(message, icon = "💾", duration = 4000) {
            const toast = document.getElementById('toast-notification');
            const text = document.getElementById('toast-text');
            const ico = document.getElementById('toast-icon');
            if (!toast) return;

            if (text) text.innerHTML = message;
            if (ico) ico.innerText = icon;

            toast.classList.add('show');
            clearTimeout(toast._timeout);
            toast._timeout = setTimeout(() => {
                toast.classList.remove('show');
            }, duration);
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

        function utf8ToBase64(str) {
            try {
                const bytes = new TextEncoder().encode(str);
                let binary = '';
                const len = bytes.byteLength;
                for (let i = 0; i < len; i++) {
                    binary += String.fromCharCode(bytes[i]);
                }
                return btoa(binary);
            } catch (e) {
                console.error("utf8ToBase64 fallback error:", e);
                return btoa(unescape(encodeURIComponent(str)));
            }
        }

        // Initialize features on DOM ready
        document.addEventListener('DOMContentLoaded', () => {
            initSampleFeatures();
            updateSavedCountBadges();
            loadSavedTheme();
            renderSpiralBinding();
            checkAndLoadSharedWorksheetHash();
            updateQRCodePreview();
            restoreAutoSavedWorksheet();
            initSlideTouchAndKeyboardControls();
            restoreCopilotChatFromStorage();
        });
        window.addEventListener('resize', () => {
            renderSpiralBinding();
        });
        window.addEventListener('hashchange', checkAndLoadSharedWorksheetHash);
        
        function restoreAutoSavedWorksheet() {
            const savedHtml = localStorage.getItem('autosaved_worksheet_html');
            const savedPrompt = localStorage.getItem('autosaved_worksheet_prompt');
            const levelBody = document.getElementById('level-body');
            if (savedHtml && levelBody && (!levelBody.innerHTML.trim() || levelBody.innerHTML.includes('Welcome'))) {
                levelBody.innerHTML = savedHtml;
                originalWorksheetHTML = savedHtml;
                if (savedPrompt && document.getElementById('custom-prompt')) {
                    document.getElementById('custom-prompt').value = savedPrompt;
                }
                updateWorksheetStyle();
                showToast("Restored your previously auto-saved worksheet draft 💾", "✨");
            }
        }

        // Periodic Auto-Save every 8 seconds
        setInterval(() => {
            const levelBody = document.getElementById('level-body');
            const customPrompt = document.getElementById('custom-prompt');
            if (levelBody && levelBody.innerHTML.trim() !== '') {
                localStorage.setItem('autosaved_worksheet_html', levelBody.innerHTML);
                if (customPrompt) {
                    localStorage.setItem('autosaved_worksheet_prompt', customPrompt.value);
                }
            }
        }, 8000);

        // Presentation Slides Presentation State & Logic
        let currentSlidesData = [
            {
                title: "Welcome to English Masterclass",
                subtitle: "Interactive Lesson & Practice Suite",
                type: "title",
                bullets: ["Objective: Master essential grammar and communication", "Interactive exercises and guided practice", "Engaging discussions & vocabulary building"],
                accent: "#2563eb"
            },
            {
                title: "Key Vocabulary & Concepts",
                subtitle: "Essential terminology for today's lesson",
                type: "vocab",
                bullets: ["• Hypothesis: A proposed explanation for a phenomenon", "• Variable: A factor or condition that can be changed", "• Data: Facts and statistics collected for analysis"],
                accent: "#7c3aed"
            },
            {
                title: "Grammar Rule & Structure",
                subtitle: "How to form and apply the target structure",
                type: "rule",
                bullets: ["Rule: Subject + Auxiliary Verb + Base Verb", "Example: She studies English every single morning.", "Tip: Pay attention to third-person singular (-s/es)."],
                accent: "#059669"
            },
            {
                title: "Guided Practice Exercise",
                subtitle: "Apply what you've learned in context",
                type: "practice",
                bullets: ["1. Fill in the blank: He ________ (play) tennis on weekends.", "2. Correct the sentence: They was studying grammar.", "3. Discussion: Describe your daily routine using 3 sentences."],
                accent: "#d97706"
            },
            {
                title: "Summary & Homework",
                subtitle: "Great job completing today's lesson!",
                type: "summary",
                bullets: ["• Key takeaway: Consistent practice builds fluency", "• Homework: Complete worksheet exercises on page 3", "• Next session: Advanced conversational dialogues"],
                accent: "#dc2626"
            }
        ];
        let currentSlideIndex = 0;
        let currentSlideLayout = 'horizontal'; // 'horizontal' (side-by-side with graphic) or 'vertical' (stacked)

        function toggleSlideLayout() {
            currentSlideLayout = currentSlideLayout === 'horizontal' ? 'vertical' : 'horizontal';
            const btn = document.getElementById('slide-layout-toggle-btn');
            if (btn) {
                btn.innerText = currentSlideLayout === 'horizontal' ? 'Layout: Horizontal ↔️' : 'Layout: Vertical ↕️';
            }
            renderCurrentSlide();
            showToast(`Switched to ${currentSlideLayout} slide layout`, "📊");
        }

        function switchAppMode(mode) {
            const btnWs = document.getElementById('tab-mode-worksheet');
            const btnSl = document.getElementById('tab-mode-slides');
            const btnCp = document.getElementById('tab-mode-copilot');
            const containerWs = document.getElementById('worksheet-app-container');
            const containerSl = document.getElementById('slides-app-container');
            const containerCp = document.getElementById('copilot-app-container');

            if (btnWs) btnWs.classList.remove('active');
            if (btnSl) btnSl.classList.remove('active');
            if (btnCp) btnCp.classList.remove('active');
            if (containerWs) containerWs.style.display = 'none';
            if (containerSl) containerSl.style.display = 'none';
            if (containerCp) containerCp.style.display = 'none';

            // Instant scroll to top to ensure clean visual display across modes
            window.scrollTo({ top: 0, behavior: 'instant' });

            if (mode === 'worksheet') {
                if (btnWs) btnWs.classList.add('active');
                if (containerWs) {
                    containerWs.style.display = 'block';
                    renderSpiralBinding();
                }
                showToast("Switched to Worksheets Studio 📄", "✨");
            } else if (mode === 'slides') {
                if (btnSl) btnSl.classList.add('active');
                if (containerSl) {
                    containerSl.style.display = 'block';
                    renderCurrentSlide();
                }
                showToast("Switched to Presentation Slides 📊", "✨");
            } else if (mode === 'copilot') {
                if (btnCp) btnCp.classList.add('active');
                if (containerCp) {
                    containerCp.style.display = 'block';
                    scrollCopilotToBottom();
                    const input = document.getElementById('copilot-user-input');
                    if (input) {
                        setTimeout(() => input.focus(), 150);
                    }
                }
                showToast("AI Lesson Co-Pilot active 🤖", "✨");
            }
        }

        function generateSmartCopilotResponse(userText) {
            const lower = (userText || "").toLowerCase();
            
            if (lower.includes('warm-up') || lower.includes('warm up') || lower.includes('speaking questions') || lower.includes('question')) {
                return `### 💡 5 Interactive ESL Warm-Up Questions

Here are 5 engaging, communicative speaking prompts designed to get learners talking immediately:

1. **Personal Connection:** *"What is your favorite hobby or weekend activity, and what first inspired you to start doing it?"*
   - *Follow-up:* *"How much time do you spend on it each week?"*

2. **Past Experience:** *"Think about yesterday. What was the most relaxing or enjoyable thing you did in your free time?"*
   - *Follow-up:* *"Did you do it alone or with friends/family?"*

3. **Future Aspirations:** *"If you had an extra 2 hours of free time every single day, what new creative hobby would you pick up?"*
   - *Follow-up:* *"Why haven't you started it yet?"*

4. **Opinion / Debate:** *"Do you think people spend too much time on mobile screens instead of active hobbies? Why or why not?"*
   - *Follow-up:* *"What screen-free hobby would you recommend to a friend?"*

5. **Reflection:** *"How does having a favorite hobby help lower stress during busy school or work weeks?"*

---
💡 **Teacher Tip:** Group students into pairs for 3 minutes per prompt before conducting a quick 2-minute whole-class review!`;
            }

            if (lower.includes('fill in') || lower.includes('blank') || lower.includes('exercise') || lower.includes('drill')) {
                return `### 📝 ESL Practice Drill: Fill in the Blanks

**Instructions:** Complete the sentences using the correct verb form from the word bank.

<div class="ws-block" style="margin: 14px 0; padding: 14px 18px; background: #f8fafc; border-radius: 12px; border: 1.5px solid #cbd5e1;">
    <div style="font-weight: 700; color: #1e40af; margin-bottom: 8px;">Word Bank:</div>
    <div style="font-family: monospace; font-size: 13.5px; background: white; padding: 8px 12px; border-radius: 8px; border: 1px dashed #94a3b8; display: inline-block; margin-bottom: 12px;">
        [ was walking • arrived • were studying • called • had finished ]
    </div>
    <ol style="margin: 0; padding-left: 20px; line-height: 2;">
        <li>While I _________________ to school this morning, it started to rain heavily.</li>
        <li>The students _________________ in the library when the fire alarm rang.</li>
        <li>By the time the teacher entered the classroom, everyone _________________ their homework.</li>
        <li>She _________________ her best friend as soon as she heard the wonderful news.</li>
        <li>When we finally _________________ at the airport, our flight was already boarding.</li>
    </ol>
</div>

**🔑 Answer Key:**
1. *was walking* | 2. *were studying* | 3. *had finished* | 4. *called* | 5. *arrived*

<div style="margin-top: 10px;">
    <button type="button" onclick="insertCopilotBlockToWorksheet(this)" style="background: #2563eb; color: white; border: none; font-weight: 700; padding: 7px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
        <span>📥</span> <span>Insert into Active Worksheet</span>
    </button>
</div>`;
            }

            if (lower.includes('slide') || lower.includes('presentation') || lower.includes('deck')) {
                return `### 📊 5-Slide Presentation Lesson Plan

Here is a structured, high-engagement presentation deck outline ready for your classroom:

- **Slide 1: Hook & Topic Introduction (🎯)**
  - *Title:* Discovering English Through Action & Communication
  - *Objective:* Introduce core communicative goals and activate student schema.
  - *Speaking Prompt:* *"What comes to your mind when you think of this topic?"*

- **Slide 2: Core Vocabulary & Visual Clues (🔤)**
  - *Key Terms:* 4 essential words with real-life context sentences.
  - *Visual Focus:* High-contrast clipart illustrations supporting memory retention.

- **Slide 3: Grammar Rule & Form Breakdown (📐)**
  - *Rule Pattern:* Formula breakdown with color-coded subject + verb agreement.
  - *Common Pitfall:* What mistakes to watch out for (e.g. singular vs plural agreements).

- **Slide 4: Interactive Pairwork & Practice (🗣️)**
  - *Mini Dialogue:* 4-line guided conversation exchange.
  - *Pronunciation Focus:* Word stress and intonation patterns.

- **Slide 5: Wrap-up Challenge & Cool Down (🎓)**
  - *Exit Ticket:* 2 rapid-fire questions for students before the bell.

<div style="margin-top: 12px;">
    <button type="button" onclick="switchAppMode('slides'); generatePresentationDeck();" style="background: #7c3aed; color: white; border: none; font-weight: 700; padding: 7px 16px; border-radius: 8px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
        <span>📽️</span> <span>Open & Generate in Slides Studio</span>
    </button>
</div>`;
            }

            if (lower.includes('dialogue') || lower.includes('roleplay') || lower.includes('conversation')) {
                return `### 🎭 Communicative Roleplay Dialogue: "Planning a Weekend Adventure"

**Setting:** Two friends, Alex and Jordan, are deciding how to spend Saturday afternoon.

- **Alex:** *"Hey Jordan, have you made any plans for this Saturday yet?"*
- **Jordan:** *"Not yet! The weather forecast says it's going to be sunny and warm. What do you feel like doing?"*
- **Alex:** *"I was thinking we could either rent bicycles by the lake or check out that new photography exhibition downtown."*
- **Jordan:** *"Riding bikes sounds fantastic! We haven't spent time outdoors in weeks. What time should we meet up?"*
- **Alex:** *"How about ten in the morning at the central park entrance? We can grab coffee first."*
- **Jordan:** *"Deal! Don't forget to wear comfortable shoes. See you on Saturday!"*

---
🗣️ **Classroom Speaking Activity:**
1. Have students practice in pairs focusing on natural contractions (*haven't, it's, let's*).
2. Ask pairs to replace the activities with two hobbies of their own choice!`;
            }

            return `### 🌟 Lesson Plan & Pedagogical Suggestions

Here is a tailored educational breakdown based on your request:

1. **Learning Objective:**
   Enable students to confidently express ideas, apply accurate grammatical structures, and build active vocabulary in context.

2. **Recommended Lesson Flow (45 Mins):**
   - **0-10m:** Dynamic warm-up prompt or picture-based prediction task.
   - **10-25m:** Guided discovery of rules and target vocabulary with illustrated cards.
   - **25-35m:** Controlled written drill (Fill-in-the-blanks or sentence rewriting).
   - **35-45m:** Communicative pairwork roleplay or classroom exit ticket.

3. **Next Steps:**
   - Click **Generate Worksheet** to create a printable student paper with picture cards and spiral binding.
   - Or click **Presentation slides** to launch interactive classroom slides for this topic!`;
        }

        function insertCopilotBlockToWorksheet(btn) {
            const block = btn.closest('.copilot-bubble-content').querySelector('.ws-block');
            if (block) {
                const levelBody = document.getElementById('level-body');
                if (levelBody) {
                    levelBody.insertAdjacentHTML('beforeend', block.outerHTML);
                    switchAppMode('worksheet');
                    showToast("Added exercise to active worksheet! 📄", "✨");
                    const previewArea = document.getElementById('a4-preview-area');
                    if (previewArea) previewArea.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }
        }

        // ==========================================
        // AI LESSON CO-PILOT CHAT SYSTEM
        // ==========================================
        let copilotChatHistory = [];
        let isCopilotGenerating = false;

        function openCopilotWithTopic(topic, originMode) {
            switchAppMode('copilot');
            const input = document.getElementById('copilot-user-input');
            if (input) {
                if (topic && topic.trim().length > 0) {
                    const cleanTopic = topic.trim();
                    if (originMode === 'slides') {
                        input.value = `Help me plan and brainstorm 5 interactive presentation slides about: "${cleanTopic}". Include speaking dialogues and pronunciation tips.`;
                    } else {
                        input.value = `Help me create an engaging English worksheet with exercises, vocabulary bank, and answers for: "${cleanTopic}".`;
                    }
                    updateCopilotInputStats();
                }
                setTimeout(() => input.focus(), 150);
            }
        }

        function updateCopilotInputStats() {
            const input = document.getElementById('copilot-user-input');
            const counter = document.getElementById('copilot-char-counter');
            if (!input) return;
            
            // Auto resize
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 140) + 'px';

            if (counter) {
                counter.innerText = `${input.value.length} chars`;
            }
        }

        function handleCopilotKeyDown(event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendCopilotMessage();
            }
        }

        function sendQuickCopilotPrompt(promptText) {
            const input = document.getElementById('copilot-user-input');
            if (input) {
                input.value = promptText;
                updateCopilotInputStats();
                sendCopilotMessage();
            }
        }

        function getActiveLessonContext() {
            let contextParts = [];
            
            // 1. Active Worksheet details
            const previewArea = document.getElementById('a4-preview-area');
            const wsTitleInput = document.getElementById('acc-save-title');
            const wsPromptInput = document.getElementById('custom-prompt');
            let wsTitle = wsTitleInput && wsTitleInput.value.trim() ? wsTitleInput.value.trim() : "";
            if (!wsTitle && previewArea) {
                const h2 = previewArea.querySelector('h2, h1');
                if (h2) wsTitle = h2.innerText.trim();
            }
            let wsPrompt = wsPromptInput && wsPromptInput.value.trim() ? wsPromptInput.value.trim() : "";
            let wsTextSnippet = "";
            if (previewArea) {
                const levelBody = document.getElementById('level-body');
                if (levelBody && levelBody.innerText) {
                    wsTextSnippet = levelBody.innerText.replace(/\s+/g, ' ').slice(0, 350);
                }
            }

            if (wsTitle || wsPrompt || wsTextSnippet) {
                contextParts.push(`Active Worksheet Context:\n- Title: "${wsTitle || 'Untitled Worksheet'}"\n- Current Prompt: "${wsPrompt}"\n- Content Excerpt: "${wsTextSnippet}"`);
            }

            // 2. Active Presentation Slide Deck details
            if (currentSlidesData && currentSlidesData.length > 0) {
                const currentSlide = currentSlidesData[currentSlideIndex];
                const slidesPromptInput = document.getElementById('slides-prompt');
                const slidesPrompt = slidesPromptInput ? slidesPromptInput.value.trim() : "";
                contextParts.push(`Active Presentation Deck Context:\n- Topic: "${slidesPrompt || 'Current Deck'}"\n- Total Slides: ${currentSlidesData.length}\n- Active Slide (${currentSlideIndex + 1}): "${currentSlide ? currentSlide.title : ''}"\n- Slide Bullets: ${currentSlide ? (currentSlide.bullets || []).join('; ') : ''}`);
            }

            return contextParts.length > 0 ? contextParts.join('\n\n') : "No active worksheet or slides loaded yet.";
        }

        async function sendCopilotMessage() {
            if (isCopilotGenerating) return;

            const input = document.getElementById('copilot-user-input');
            const sendBtn = document.getElementById('copilot-send-btn');
            const includeContextCb = document.getElementById('copilot-include-context');
            
            if (!input) return;
            const userText = input.value.trim();
            if (!userText) return;

            // Clear input
            input.value = '';
            updateCopilotInputStats();

            // Append User Message to UI
            appendCopilotMessage('user', userText);
            copilotChatHistory.push({ role: 'user', content: userText, timestamp: Date.now() });

            // Prepare System Context & AI Prompt
            isCopilotGenerating = true;
            if (sendBtn) sendBtn.disabled = true;
            showCopilotTypingIndicator();

            let contextPayload = "";
            if (includeContextCb && includeContextCb.checked) {
                contextPayload = `\n\n--- CURRENT WORKSPACE CONTEXT ---\n${getActiveLessonContext()}\n---------------------------------`;
            }

            const systemPrompt = `You are an elite, highly pedagogically skilled AI ESL / EFL Teacher and Educational Content Co-Pilot.
Your purpose is to collaborate with educators to brainstorm, draft, refine, and structure English worksheets, grammar explanations, reading comprehension tasks, vocabulary banks, and interactive presentation slide decks.

Key Guidelines:
1. Provide accurate, CEFR-aligned English learning content (A1, A2, B1, B2, C1).
2. When the user asks for a worksheet or specific exercises (Fill in Blanks, MCQs, Dialogues, Grammar drills, Word banks):
   - Provide impeccably formatted HTML or clean structured sections with clear instructions, numbered items, blank underlines (_______), and answer keys.
   - You can enclose HTML blocks inside <div class="ws-block" style="margin-bottom: 16px; padding: 12px 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;"><h3 style="color: #1e40af; margin-top:0;">Part Title</h3>...</div> so they can be injected into the worksheet with 1 click.
3. When the user asks for presentation slides:
   - Provide a clear breakdown of slide titles, key talking points, vocabulary badges, and speaking focus notes.
4. Keep explanations conversational, encouraging, professional, and practical for English language teachers.
${contextPayload}`;

            try {
                let aiResponseText = await callUnifiedGeminiAi(userText, systemPrompt);
                hideCopilotTypingIndicator();

                if (!aiResponseText || aiResponseText.startsWith('API_ERROR:') || aiResponseText.includes('API_KEY_MISSING:') || aiResponseText.includes('Please configure your GEMINI_API_KEY')) {
                    console.warn("Co-Pilot AI key or network issue. Generating smart pedagogical response:", aiResponseText);
                    aiResponseText = generateSmartCopilotResponse(userText);
                }

                appendCopilotMessage('assistant', aiResponseText);
                copilotChatHistory.push({ role: 'assistant', content: aiResponseText, timestamp: Date.now() });
                saveCopilotChatToStorage();
            } catch (err) {
                hideCopilotTypingIndicator();
                console.warn("Co-Pilot AI exception. Falling back to built-in curriculum assistant:", err);
                const smartResponse = generateSmartCopilotResponse(userText);
                appendCopilotMessage('assistant', smartResponse);
                copilotChatHistory.push({ role: 'assistant', content: smartResponse, timestamp: Date.now() });
                saveCopilotChatToStorage();
            } finally {
                isCopilotGenerating = false;
                if (sendBtn) sendBtn.disabled = false;
                scrollCopilotToBottom();
            }
        }

        function showCopilotTypingIndicator() {
            const stream = document.getElementById('copilot-messages-stream');
            if (!stream) return;
            const existing = document.getElementById('copilot-typing-row');
            if (existing) existing.remove();

            const row = document.createElement('div');
            row.id = 'copilot-typing-row';
            row.className = 'copilot-message-row assistant';
            row.innerHTML = `
                <div class="copilot-bubble-avatar">🤖</div>
                <div class="copilot-bubble-content">
                    <div class="copilot-typing-indicator">
                        <span class="copilot-typing-dot"></span>
                        <span class="copilot-typing-dot"></span>
                        <span class="copilot-typing-dot"></span>
                        <span style="font-size: 12px; color: var(--text-muted); margin-left: 6px; font-weight: 600;">Co-Pilot is typing...</span>
                    </div>
                </div>
            `;
            stream.appendChild(row);
            scrollCopilotToBottom();
        }

        function hideCopilotTypingIndicator() {
            const existing = document.getElementById('copilot-typing-row');
            if (existing) existing.remove();
        }

        function scrollCopilotToBottom() {
            const stream = document.getElementById('copilot-messages-stream');
            if (stream) {
                setTimeout(() => {
                    stream.scrollTop = stream.scrollHeight;
                }, 50);
            }
        }

        function renderCopilotMarkdown(raw) {
            if (!raw) return '';
            let s = raw;

            // If raw is already wrapped in HTML or contains structured HTML blocks, preserve standard tags
            // Escape basic special entities only in plain text parts
            s = s.replace(/```html([\s\S]*?)```/gi, (match, code) => {
                return `<pre style="background: #0f172a; color: #38bdf8; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 13px;"><code>${escapeHtml(code.trim())}</code></pre>`;
            });

            s = s.replace(/```json([\s\S]*?)```/gi, (match, code) => {
                return `<pre style="background: #0f172a; color: #a7f3d0; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 13px;"><code>${escapeHtml(code.trim())}</code></pre>`;
            });

            s = s.replace(/```([\s\S]*?)```/gi, (match, code) => {
                return `<pre style="background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 8px; overflow-x: auto; font-size: 13px;"><code>${escapeHtml(code.trim())}</code></pre>`;
            });

            // Headers
            s = s.replace(/^### (.*$)/gim, '<h4 style="color: var(--accent-primary); margin: 8px 0 4px;">$1</h4>');
            s = s.replace(/^## (.*$)/gim, '<h3 style="color: var(--accent-primary); margin: 12px 0 6px;">$1</h3>');
            s = s.replace(/^# (.*$)/gim, '<h2 style="color: var(--accent-primary); margin: 14px 0 8px;">$1</h2>');

            // Bold and Italic
            s = s.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
            s = s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            s = s.replace(/\*(.*?)\*/g, '<em>$1</em>');
            s = s.replace(/`([^`]+)`/g, '<code>$1</code>');

            // Blockquotes
            s = s.replace(/^\> (.*$)/gim, '<blockquote style="border-left: 3px solid var(--accent-primary); padding-left: 10px; margin: 8px 0; color: var(--text-muted);">$1</blockquote>');

            // Lists
            s = s.replace(/^\s*[\-\*]\s+(.*$)/gim, '<li style="margin-bottom: 4px;">$1</li>');
            s = s.replace(/^\s*(\d+)\.\s+(.*$)/gim, '<li style="margin-bottom: 4px;">$2</li>');

            // Wrap consecutive <li> into <ul>
            s = s.replace(/(<li[\s\S]*?<\/li>)+/gi, (match) => `<ul style="padding-left: 20px; margin: 8px 0;">${match}</ul>`);

            // Convert newlines to paragraphs/breaks when not inside tags
            s = s.replace(/\n\n/g, '<div style="margin: 8px 0;"></div>');

            return s;
        }

        function appendCopilotMessage(sender, text) {
            const stream = document.getElementById('copilot-messages-stream');
            if (!stream) return;

            const row = document.createElement('div');
            row.className = `copilot-message-row ${sender}`;

            const avatar = sender === 'user' ? '👤' : '🤖';
            const renderedContent = sender === 'user' ? escapeHtml(text).replace(/\n/g, '<br>') : renderCopilotMarkdown(text);

            // Detect actionable capabilities in AI responses
            let actionsHtml = '';
            if (sender === 'assistant') {
                const hasHtmlStructure = text.includes('<div') || text.includes('Part 1') || text.includes('ws-block') || text.includes('Fill in the Blanks') || text.includes('Multiple Choice') || text.includes('Word Bank');
                const hasSlideStructure = text.toLowerCase().includes('slide 1') || text.toLowerCase().includes('presentation') || text.toLowerCase().includes('"bullets":');

                const msgId = 'msg_' + Math.random().toString(36).substring(2, 9);
                window['__copilot_payload_' + msgId] = text;

                actionsHtml = `
                    <div class="copilot-action-bar">
                        ${hasHtmlStructure ? `
                            <button type="button" class="copilot-action-btn btn-apply-ws" onclick="applyCopilotToWorksheet('${msgId}', 'replace')" title="Replace active worksheet with this content">
                                📄 Insert into Worksheet
                            </button>
                            <button type="button" class="copilot-action-btn" onclick="applyCopilotToWorksheet('${msgId}', 'append')" title="Append to active worksheet">
                                ➕ Append to Worksheet
                            </button>
                        ` : ''}
                        ${hasSlideStructure ? `
                            <button type="button" class="copilot-action-btn btn-apply-slides" onclick="applyCopilotToSlides('${msgId}')" title="Create presentation slides from this AI response">
                                📊 Convert to Slides Deck
                            </button>
                        ` : ''}
                        <button type="button" class="copilot-action-btn" onclick="copyCopilotResponse(this, '${msgId}')" title="Copy text to clipboard">
                            📋 Copy
                        </button>
                        <button type="button" class="copilot-action-btn" onclick="speakCopilotResponse('${msgId}')" title="Listen with voice pronunciation">
                            🔊 Read Aloud
                        </button>
                    </div>
                `;
            }

            row.innerHTML = `
                <div class="copilot-bubble-avatar">${avatar}</div>
                <div class="copilot-bubble-content">
                    <div class="copilot-bubble-body">
                        ${renderedContent}
                    </div>
                    ${actionsHtml}
                </div>
            `;

            stream.appendChild(row);
            scrollCopilotToBottom();
        }

        function applyCopilotToWorksheet(msgId, mode = 'replace') {
            const rawText = window['__copilot_payload_' + msgId];
            if (!rawText) {
                showToast("No content found for this message", "⚠️");
                return;
            }

            const levelBody = document.getElementById('level-body');
            if (!levelBody) return;

            let cleanHtml = rawText.replace(/```html/gi, '').replace(/```/gi, '').trim();

            // If rawText is markdown, wrap it in neat educational worksheet blocks
            if (!cleanHtml.includes('<div') && !cleanHtml.includes('<h2') && !cleanHtml.includes('<h3')) {
                const formattedMd = renderCopilotMarkdown(cleanHtml);
                cleanHtml = `
                    <div class="ws-block" style="margin-bottom: 20px; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                        <h3 style="color: #1e40af; margin-top: 0;">AI Co-Pilot Activity</h3>
                        ${formattedMd}
                    </div>
                `;
            }

            if (mode === 'replace') {
                levelBody.innerHTML = `<div id="ws-content-root" style="color: black; padding: 10px;">${cleanHtml}</div>`;
                showToast("Worksheet updated with AI Co-Pilot content! 📄", "✨");
            } else {
                const root = document.getElementById('ws-content-root') || levelBody;
                root.insertAdjacentHTML('beforeend', `<div style="margin-top: 16px;">${cleanHtml}</div>`);
                showToast("Appended to active worksheet! ➕", "✨");
            }

            switchAppMode('worksheet');
        }

        function applyCopilotToSlides(msgId) {
            const rawText = window['__copilot_payload_' + msgId];
            if (!rawText) return;

            const slidesPromptInput = document.getElementById('slides-prompt');
            if (slidesPromptInput) {
                // Extract first line or title as prompt
                const firstLine = rawText.split('\n')[0].replace(/^[#\*\-\s]+/g, '').slice(0, 60);
                slidesPromptInput.value = firstLine || "Interactive AI Lesson Presentation";
            }

            switchAppMode('slides');
            generatePresentationDeck();
            showToast("Generating slide deck from Co-Pilot content... 📊", "✨");
        }

        function copyCopilotResponse(btn, msgId) {
            const rawText = window['__copilot_payload_' + msgId];
            if (!rawText) return;

            navigator.clipboard.writeText(rawText).then(() => {
                const orig = btn.innerText;
                btn.innerText = '✅ Copied!';
                setTimeout(() => { btn.innerText = orig; }, 2000);
                showToast("Copied to clipboard! 📋", "✨");
            }).catch(() => {
                showToast("Failed to copy to clipboard", "⚠️");
            });
        }

        function speakCopilotResponse(msgId) {
            const rawText = window['__copilot_payload_' + msgId];
            if (!rawText) return;

            if (!('speechSynthesis' in window)) {
                showToast("Web Speech API not supported in this browser", "⚠️");
                return;
            }

            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                showToast("Speech stopped", "⏹️");
                return;
            }

            // Clean text of HTML tags and markdown symbols
            const cleanText = rawText.replace(/<[^>]+>/g, ' ').replace(/[#\*\`\_\[\]\(\)]/g, ' ').replace(/\s+/g, ' ').trim();
            const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 600));
            utterance.lang = 'en-US';
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
            showToast("Reading AI response aloud... 🗣️", "🔊");
        }

        function exportCopilotChatHistory() {
            if (!copilotChatHistory || copilotChatHistory.length === 0) {
                showToast("No chat history to export yet!", "⚠️");
                return;
            }

            let transcript = `# English Worksheet Studio — AI Co-Pilot Conversation Transcript\n`;
            transcript += `Date: ${new Date().toLocaleString()}\n\n---\n\n`;

            copilotChatHistory.forEach((msg, idx) => {
                const senderName = msg.role === 'user' ? 'Educator' : 'AI Lesson Co-Pilot';
                transcript += `### ${idx + 1}. [${senderName}] (${new Date(msg.timestamp).toLocaleTimeString()})\n\n`;
                transcript += `${msg.content}\n\n---\n\n`;
            });

            const blob = new Blob([transcript], { type: 'text/markdown;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `AI_CoPilot_Transcript_${new Date().toISOString().slice(0,10)}.md`;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 200);

            showToast("Chat transcript exported! 📥", "✨");
        }

        function clearCopilotChat() {
            if (confirm("Are you sure you want to clear the conversation history?")) {
                copilotChatHistory = [];
                localStorage.removeItem('copilot_chat_history_v1');
                const stream = document.getElementById('copilot-messages-stream');
                if (stream) {
                    stream.innerHTML = `
                        <div class="copilot-message-row assistant">
                            <div class="copilot-bubble-avatar">🤖</div>
                            <div class="copilot-bubble-content">
                                <div class="copilot-bubble-body">
                                    <h3 style="margin-top: 0; font-size: 15px;">Conversation cleared! 👋</h3>
                                    <p style="margin: 6px 0 10px;">I'm ready for your next lesson planning or worksheet topic. Type any question below or pick a quick prompt!</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                showToast("Conversation cleared", "🗑️");
            }
        }

        function saveCopilotChatToStorage() {
            try {
                // Keep last 30 messages in localStorage
                const recent = copilotChatHistory.slice(-30);
                localStorage.setItem('copilot_chat_history_v1', JSON.stringify(recent));
            } catch (e) {
                console.warn("Could not save copilot chat history", e);
            }
        }

        function restoreCopilotChatFromStorage() {
            try {
                const saved = localStorage.getItem('copilot_chat_history_v1');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (Array.isArray(parsed) && parsed.length > 0) {
                        copilotChatHistory = parsed;
                        parsed.forEach(msg => {
                            appendCopilotMessage(msg.role === 'user' ? 'user' : 'assistant', msg.content);
                        });
                    }
                }
            } catch (e) {
                console.warn("Could not restore copilot chat history", e);
            }
        }
        
        function openSlidesTemplateModal() {
            const modal = document.getElementById('slides-template-modal');
            if (modal) modal.style.display = 'flex';
        }

        function closeSlidesTemplateModal() {
            const modal = document.getElementById('slides-template-modal');
            if (modal) modal.style.display = 'none';
        }

        function handleSlidesTemplateOverlayClick(event) {
            if (event.target && event.target.id === 'slides-template-modal') {
                closeSlidesTemplateModal();
            }
        }

        function applySlideTemplate(type) {
            const promptInput = document.getElementById('slides-prompt');
            const countSelect = document.getElementById('slides-count-select');
            const styleSelect = document.getElementById('slides-image-style-select');
            
            if (!promptInput) return;
            
            let promptText = "";
            let num = "5";
            let style = "concept";
            
            if (type === 'grammar') {
                promptText = "Create a comprehensive Grammar lesson on [Grammar Topic]. Include introduction, structure rules, real-world examples, common mistakes, and interactive quiz questions.";
                num = "8";
                style = "diagram";
            } else if (type === 'vocab') {
                promptText = "Create a thematic Vocabulary introduction on [Topic]. Include definitions, visual associations, context sentences, pronunciation tips, and a matching exercise.";
                num = "5";
                style = "photo";
            } else if (type === 'discussion') {
                promptText = "Create a Group Discussion lesson about [Topic]. Include engaging hooks, debate prompts, conversation starters, vocabulary highlights, and wrap-up reflections.";
                num = "5";
                style = "concept";
            } else if (type === 'reading') {
                promptText = "Create a Reading Comprehension lesson on [Topic]. Include short reading excerpts, vocabulary analysis, structure breakdown, and comprehension questions.";
                num = "8";
                style = "minimal";
            }
            
            promptInput.value = promptText;
            if (countSelect) countSelect.value = num;
            if (styleSelect) styleSelect.value = style;
            
            closeSlidesTemplateModal();
            promptInput.focus();
            
            promptInput.style.transition = 'border-color 0.3s, box-shadow 0.3s';
            promptInput.style.borderColor = 'var(--accent-primary)';
            promptInput.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.25)';
            setTimeout(() => {
                promptInput.style.borderColor = '';
                promptInput.style.boxShadow = '';
            }, 800);
            
            showToast("Template applied! Edit the topic in brackets.", "✨");
        }

        function setSlidesTopic(topic) {
            const input = document.getElementById('slides-prompt');
            if (input) {
                input.value = topic;
                generatePresentationDeck();
            }
        }

        async function callUnifiedGeminiAi(promptText, systemPrompt) {
            const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser Topic & Instructions:\n${promptText}` : promptText;

            // 1. Android Native WebAppInterface Bridge
            if (window.AndroidAI && typeof window.AndroidAI.askGemini === 'function') {
                return new Promise((resolve, reject) => {
                    const cbName = '__gemini_slide_cb_' + Math.random().toString(36).substring(2, 9);
                    const timer = setTimeout(() => {
                        delete window[cbName];
                        reject(new Error("Gemini AI bridge timed out"));
                    }, 28000);

                    window[cbName] = function(response) {
                        clearTimeout(timer);
                        delete window[cbName];
                        if (typeof response === 'string' && (response.startsWith('API_KEY_MISSING') || response.startsWith('API_ERROR'))) {
                            reject(new Error(response));
                        } else {
                            resolve(response);
                        }
                    };

                    try {
                        window.AndroidAI.askGemini(fullPrompt, cbName);
                    } catch (e) {
                        clearTimeout(timer);
                        delete window[cbName];
                        reject(e);
                    }
                });
            }

            // 2. Web Browser Gemini API with Key
            const webApiKey = (localStorage.getItem('web_gemini_api_key') || '').trim();
            if (webApiKey) {
                return fetchGeminiWithFallback(webApiKey, fullPrompt);
            }

            throw new Error("NO_API_KEY");
        }

        function extractCleanJsonArray(rawText) {
            if (!rawText) return null;
            try {
                // Remove code fences like ```json ... ```
                let cleaned = rawText.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
                const firstBracket = cleaned.indexOf('[');
                const lastBracket = cleaned.lastIndexOf(']');
                if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
                    cleaned = cleaned.substring(firstBracket, lastBracket + 1);
                }
                const parsed = JSON.parse(cleaned);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            } catch (e) {
                console.warn("JSON array extraction failed:", e);
            }
            return null;
        }

        // Deep Topic-Aware Generator matching Prompt Keywords, Dialogue, and Structure
        function generatePromptMatchedSlideDeck(rawPrompt, numSlides, imageStyle) {
            const accents = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0284c7", "#9333ea", "#16a34a", "#ca8a04", "#e11d48"];
            
            // Clean up prompt into a focused display topic
            let displayTopic = rawPrompt
                .replace(/^(Create|Generate|Make|Design|Write|Build|Give me|I need)\s+(an?\s+)?(English\s+)?(classroom\s+)?(lesson\s+)?(presentation|slides|deck|slide deck)?\s*(for|about|on)?/i, '')
                .replace(/\(Proficiency Level:[^)]+\)/gi, '')
                .replace(/\[.*?\]/g, '')
                .trim();
            if (!displayTopic) displayTopic = "English Language Masterclass";

            // Extract specific terms, words in quotes, or list items from prompt
            const quoteMatches = (rawPrompt.match(/"([^"]+)"/g) || []).map(s => s.replace(/"/g, '').trim()).filter(s => s.length > 1);
            const rawSentences = rawPrompt.split(/[.\n;]/).map(s => s.trim()).filter(s => s.length > 6 && !s.toLowerCase().startsWith('create') && !s.toLowerCase().startsWith('generate'));
            
            const lower = rawPrompt.toLowerCase();
            const isGrammar = lower.includes('grammar') || lower.includes('tense') || lower.includes('passive') || lower.includes('modal') || lower.includes('conditional') || lower.includes('preposition') || lower.includes('verb');
            const isVocab = lower.includes('vocab') || lower.includes('word') || lower.includes('food') || lower.includes('animal') || lower.includes('weather') || lower.includes('clothes') || lower.includes('family') || lower.includes('color');
            const isDialogue = lower.includes('dialogue') || lower.includes('conversation') || lower.includes('roleplay') || lower.includes('interview') || lower.includes('restaurant') || lower.includes('travel') || lower.includes('airport');
            const isBusiness = lower.includes('business') || lower.includes('meeting') || lower.includes('email') || lower.includes('work') || lower.includes('presentation') || lower.includes('career');

            const slides = [];

            for (let i = 0; i < numSlides; i++) {
                const accent = accents[i % accents.length];
                let title = "";
                let subtitle = "";
                let bullets = [];
                let icon = "🎯";
                let focusLabel = "Core Objective";
                let focusNote = `Focus on active speaking and clear pronunciation of ${displayTopic}.`;

                if (i === 0) {
                    title = displayTopic;
                    subtitle = "Interactive Classroom Presentation & Guided Lesson";
                    icon = "🎯";
                    focusLabel = "Lesson Objective";
                    focusNote = `Warm-up: Ask learners what they already know about ${displayTopic}.`;
                    bullets = [
                        `🎯 Learning Objective: Master practical usage of "${displayTopic}" in natural communication`,
                        `🗣️ Key Skill Focus: Fluency, vocabulary recall, and sentence building`,
                        `📝 Lesson Flow: Warm-up ➔ Key Vocabulary & Rules ➔ Real-World Practice ➔ Interactive Quiz`
                    ];
                } else if (i === numSlides - 1) {
                    title = `${i + 1}. Lesson Wrap-up & Homework`;
                    subtitle = `Consolidating everything learned about ${displayTopic}`;
                    icon = "🎓";
                    focusLabel = "Review & Next Steps";
                    focusNote = "Encourage students to summarize one new word or pattern they mastered today.";
                    bullets = [
                        `✅ Key Takeaway: Regular communicative use of "${displayTopic}" builds effortless confidence`,
                        `✍️ Homework Task: Create 5 original sentences or a mini-dialogue applying today's lesson patterns`,
                        `🤝 Peer Discussion: Share one question or real-life scenario with your study partner`
                    ];
                } else {
                    const step = i;
                    if (step === 1) {
                        title = `${i + 1}. Foundations & Overview: ${displayTopic}`;
                        subtitle = "Context, core definitions, and why this matters";
                        icon = "📖";
                        focusLabel = "Meaning & Context";
                        focusNote = "Read through the main concept together as a whole class.";
                        
                        if (rawSentences.length > 0) {
                            bullets = [
                                `📌 Central Theme: Understanding the rules and applications of "${displayTopic}"`,
                                `💡 Key Context: ${rawSentences[0]}`,
                                `🔍 Look & Listen: Notice how native speakers emphasize target words in authentic conversation`
                            ];
                        } else {
                            bullets = [
                                `📌 Definition: Explains when and why we use "${displayTopic}" in standard English`,
                                `🌟 Everyday Use: Practical scenarios where accurate language prevents misunderstandings`,
                                `💡 Pro Tip: Focus on clear stress and intonation when using these target phrases`
                            ];
                        }
                    } else if (step === 2) {
                        title = isVocab ? `${i + 1}. Target Vocabulary & Essential Words` : `${i + 1}. Essential Rules & Structure Blueprint`;
                        subtitle = isVocab ? "Key terms, pronunciation, and practical definitions" : "Sentence patterns and structural formulas";
                        icon = isVocab ? "🔤" : "📐";
                        focusLabel = isVocab ? "Vocabulary & Phonics" : "Grammar Pattern";
                        focusNote = isVocab ? "Choral repetition: Repeat each term 3 times with proper word stress." : "Analyze the formula carefully before trying the examples.";

                        if (quoteMatches.length >= 2) {
                            bullets = quoteMatches.slice(0, 4).map(w => `• "${w}" ➔ Key target phrase for active use in today's lesson`);
                        } else if (isVocab) {
                            bullets = [
                                `🔑 Core Term 1: Primary vocabulary items related directly to "${displayTopic}"`,
                                `🔑 Core Term 2: Descriptive adjectives and action verbs that pair naturally`,
                                `🗣️ Pronunciation Note: Pay special attention to silent letters and vowel sounds`,
                                `💡 Memory Hook: Associate each word with a vivid mental image or personal experience`
                            ];
                        } else {
                            bullets = [
                                `📐 Standard Formula: Subject + Auxiliary / Modal + Main Action [Context]`,
                                `🌟 Model Positive Example: "We consistently apply this structure in ${displayTopic}."`,
                                `⚠️ Question & Negative Pattern: "Do you know how to use this pattern correctly?"`,
                                `💡 Structural Rule: Always verify subject-verb agreement and proper word order`
                            ];
                        }
                    } else if (step === 3) {
                        title = `${i + 1}. Real-World Dialogue & Model Sentences`;
                        subtitle = "Authentic situational usage and natural examples";
                        icon = "🗣️";
                        focusLabel = "Conversational Fluency";
                        focusNote = "Roleplay in pairs: Student A reads Person 1, Student B reads Person 2.";

                        if (isDialogue) {
                            bullets = [
                                `🗣️ Person A: "Hello! Could you help me with ${displayTopic}?"`,
                                `🗣️ Person B: "Certainly! Let's review the most important points together."`,
                                `🗣️ Person A: "That sounds wonderful! What should I remember first?"`,
                                `🗣️ Person B: "Always speak clearly and double-check your target vocabulary."`
                            ];
                        } else {
                            bullets = [
                                `🌟 Example A: "In everyday situations, practicing ${displayTopic} ensures great clarity."`,
                                `🌟 Example B: "When writing formal messages, this structure shows high proficiency."`,
                                `❌ Common Error: Avoid translating directly from your native language word-for-word`,
                                `✔️ Better Alternative: Think in English chunks and use standard collocations`
                            ];
                        }
                    } else if (step === 4) {
                        title = `${i + 1}. Interactive Classroom Practice & Challenge`;
                        subtitle = "Pair activity, roleplay prompts, and speed drills";
                        icon = "👥";
                        focusLabel = "Interactive Activity";
                        focusNote = "Pair students up and give them 3 minutes to complete the prompt.";

                        bullets = [
                            `👥 Pair Challenge: Take turns creating 2 original sentences using "${displayTopic}"`,
                            `⏱️ 2-Minute Drill: Transform standard sentences into the target grammatical form`,
                            `🎤 Class Showcase: Volunteer pairs share their dialogue with the class for live feedback`
                        ];
                    } else if (step === 5) {
                        title = `${i + 1}. Quick Check & Concept Quiz`;
                        subtitle = "Spot the error and test your understanding";
                        icon = "❓";
                        focusLabel = "Formative Assessment";
                        focusNote = "Have students write answers on mini-whiteboards or raise fingers for choices.";

                        bullets = [
                            `❓ Question 1: What is the main rule to remember when using "${displayTopic}"?`,
                            `❓ Question 2: Spot and correct the deliberate mistake in the example sentence`,
                            `❓ Question 3: Fill in the missing word to complete the target phrase accurately`
                        ];
                    } else {
                        title = `${i + 1}. Advanced Extension & Discussion`;
                        subtitle = "Nuance, idioms, and deeper conversation";
                        icon = "🚀";
                        focusLabel = "Advanced Fluency";
                        focusNote = "Encourage students to express their personal opinions in English.";

                        bullets = [
                            `🚀 Level Up: Incorporate idiomatic expressions and advanced discourse connectors`,
                            `🌍 Cultural Context: How tone and body language support "${displayTopic}" in conversation`,
                            `📖 Self-Study Tip: Listen to native podcasts and note down authentic variations`
                        ];
                    }
                }

                slides.push({
                    title: title,
                    subtitle: subtitle,
                    bullets: bullets,
                    accent: accent,
                    imageStyle: imageStyle,
                    icon: icon,
                    focusLabel: focusLabel,
                    focusNote: focusNote
                });
            }

            return slides;
        }

        async function generatePresentationDeck() {
            const promptInput = document.getElementById('slides-prompt');
            const countSelect = document.getElementById('slides-count-select');
            const styleSelect = document.getElementById('slides-image-style-select');
            const generateBtn = document.querySelector('#slides-app-container .composer-ai-btn') || document.querySelector('#slides-app-container .generate-btn');
            
            let rawPrompt = promptInput ? promptInput.value.trim() : "";
            const numSlides = countSelect ? parseInt(countSelect.value, 10) : 5;
            const imageStyle = styleSelect ? styleSelect.value : "concept";
            
            if (!rawPrompt) {
                const wsPrompt = document.getElementById('custom-prompt') ? document.getElementById('custom-prompt').value.trim() : "";
                rawPrompt = wsPrompt || "Present Simple vs Present Continuous: Interactive Lesson & Practice";
                if (promptInput) promptInput.value = rawPrompt;
            }

            let displayTopic = rawPrompt
                .replace(/^(Create|Generate|Make|Design|Write|Build|Give me|I need)\s+(an?\s+)?(English\s+)?(classroom\s+)?(lesson\s+)?(presentation|slides|deck|slide deck)?\s*(for|about|on)?/i, '')
                .replace(/\(Proficiency Level:[^)]+\)/gi, '')
                .trim();
            if (!displayTopic) displayTopic = "English Language & Communication";

            showToast(`Generating ${numSlides} presentation slides tailored to your prompt... 📊`, "✨");
            if (generateBtn) {
                generateBtn.disabled = true;
                generateBtn.innerHTML = '<span>⏳ Generating Slides with AI...</span>';
            }

            const accents = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0284c7", "#9333ea", "#16a34a", "#ca8a04", "#e11d48"];
            let slidesResult = [];

            try {
                const systemPrompt = `You are an expert English language educator, pedagogical consultant, and slide presentation designer.
Create a high-impact, engaging, pedagogical ${numSlides}-slide classroom presentation deck for ESL / English learners that PRECISELY matches the user's specific prompt, topic, target vocabulary, grammar rules, dialogues, or questions.

IMPORTANT: Do NOT generate generic or boilerplate slide decks. Every slide must strictly contain the exact grammar points, vocabulary terms, dialogue lines, sentences, or quiz questions mentioned or implied in the user's prompt.

Respond ONLY with a valid JSON array of ${numSlides} slide objects (no markdown fences, no explanatory text, just raw valid JSON).
Each object MUST strictly contain:
- "title": (string, engaging specific title for this slide)
- "subtitle": (string, pedagogical objective or subtitle)
- "bullets": (array of 3 to 4 rich, informative strings with concrete rules, examples, dialogue quotes, or questions)
- "icon": (string, 1 relevant emoji such as 🎯, 📖, 🗣️, 🔤, ✈️, 💼, ❓, 🎓)
- "focusLabel": (string, short 2-3 word focus label, e.g. "Pronunciation Focus", "Grammar Pattern", "Roleplay Challenge")
- "focusNote": (string, concise teacher tip or student activity instruction for this slide)`;

                const aiRaw = await callUnifiedGeminiAi(rawPrompt, systemPrompt);
                const parsedArray = extractCleanJsonArray(aiRaw);

                if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                    slidesResult = parsedArray.slice(0, numSlides).map((s, idx) => ({
                        title: s.title || `Slide ${idx + 1}: ${displayTopic}`,
                        subtitle: s.subtitle || `Interactive Analysis & Practice`,
                        bullets: Array.isArray(s.bullets) ? s.bullets.map(b => typeof b === 'string' ? b : JSON.stringify(b)) : [String(s.bullets || "Interactive lesson content")],
                        accent: accents[idx % accents.length],
                        imageStyle: imageStyle,
                        icon: s.icon || (idx === 0 ? '🎯' : idx === numSlides - 1 ? '🎓' : '💡'),
                        focusLabel: s.focusLabel || "Interactive Practice",
                        focusNote: s.focusNote || `Practice active speaking and pronunciation with ${displayTopic}.`
                    }));
                }
            } catch (err) {
                console.warn("AI slide generation fell back to topic-matching engine:", err);
            }

            // If AI failed or returned invalid response, use topic-matched fallback
            if (!slidesResult || slidesResult.length === 0) {
                slidesResult = generatePromptMatchedSlideDeck(rawPrompt, numSlides, imageStyle);
            }

            currentSlidesData = slidesResult;
            currentSlideIndex = 0;
            renderCurrentSlide();

            const slideCanvas = document.getElementById('presentation-screen') || document.getElementById('slide-viewport-canvas');
            if (slideCanvas) {
                slideCanvas.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            if (generateBtn) {
                generateBtn.disabled = false;
                generateBtn.innerHTML = '✨ Generate Slides Deck';
            }

            showToast(`Presentation deck created for "${displayTopic}"! 📽️`, "✨");
        }

        // Convert the currently active/loaded worksheet into matching presentation slides
        function convertActiveWorksheetToSlides() {
            const previewArea = document.getElementById('a4-preview-area');
            const titleInput = document.getElementById('acc-save-title');
            const topicInput = document.getElementById('ai-prompt');
            const slidesPromptInput = document.getElementById('slides-prompt');
            
            let worksheetTitle = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : "";
            if (!worksheetTitle && previewArea) {
                const h1 = previewArea.querySelector('h1, h2, .worksheet-main-title');
                if (h1) worksheetTitle = h1.innerText.trim();
            }
            if (!worksheetTitle && topicInput) {
                worksheetTitle = topicInput.value.trim();
            }
            if (!worksheetTitle) {
                worksheetTitle = "English Classroom Worksheet";
            }

            // Sync prompt input
            if (slidesPromptInput) {
                slidesPromptInput.value = `Interactive presentation deck based on worksheet: "${worksheetTitle}"`;
            }

            const accents = ["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0284c7", "#9333ea"];
            const slides = [];

            // Extract real sections from previewArea
            let readingTexts = [];
            let vocabWords = [];
            let questions = [];

            if (previewArea) {
                // Find reading paragraphs
                previewArea.querySelectorAll('p, .reading-text, .story-text').forEach(p => {
                    const text = p.innerText.trim();
                    if (text.length > 25 && !text.toLowerCase().includes('name:') && !text.toLowerCase().includes('date:')) {
                        readingTexts.push(text);
                    }
                });

                // Find vocabulary boxes or highlighted spans
                previewArea.querySelectorAll('.vocab-word, .word-bank, [style*="dashed"], table td').forEach(el => {
                    const text = el.innerText.trim();
                    if (text.length > 2 && text.length < 60) {
                        vocabWords.push(text);
                    }
                });

                // Find question items
                previewArea.querySelectorAll('li, .question-item, ol li').forEach(el => {
                    const text = el.innerText.trim();
                    if (text.length > 8 && !text.includes('•')) {
                        questions.push(text);
                    }
                });
            }

            // Slide 1: Introduction & Topic
            slides.push({
                title: worksheetTitle,
                subtitle: "Classroom Presentation & Worksheet Companion",
                bullets: [
                    `🎯 Lesson Theme: Comprehensive walkthrough of "${worksheetTitle}"`,
                    `📝 Objective: Understand key language points, vocabulary bank, and exercise items`,
                    `🤝 Instructions: Follow along on the screen and on your printed worksheet`
                ],
                accent: accents[0],
                icon: "🎯",
                focusLabel: "Lesson Kickoff",
                focusNote: "Have students look at the matching worksheet in front of them."
            });

            // Slide 2: Reading / Context Dialogue
            if (readingTexts.length > 0) {
                slides.push({
                    title: "2. Reading Passage & Context",
                    subtitle: "Authentic text analysis and pronunciation",
                    bullets: readingTexts.slice(0, 3).map((t, idx) => `• Paragraph ${idx + 1}: "${t.slice(0, 110)}${t.length > 110 ? '...' : ''}"`),
                    accent: accents[1],
                    icon: "📖",
                    focusLabel: "Reading & Listening",
                    focusNote: "Listen to the pronunciation and follow along sentence by sentence."
                });
            }

            // Slide 3: Vocabulary & Word Bank
            if (vocabWords.length > 0) {
                slides.push({
                    title: "3. Target Vocabulary & Word Bank",
                    subtitle: "Key definitions and words from the worksheet",
                    bullets: vocabWords.slice(0, 4).map(w => `• ${w}`),
                    accent: accents[2],
                    icon: "🔤",
                    focusLabel: "Vocabulary Drill",
                    focusNote: "Practice repeating each vocabulary word clearly as a class."
                });
            } else {
                slides.push({
                    title: "3. Core Rules & Language Blueprint",
                    subtitle: "Essential patterns from today's worksheet",
                    bullets: [
                        `📐 Key Pattern: Master the primary grammatical structure of "${worksheetTitle}"`,
                        `🌟 Positive Model: Notice how correct collocations provide natural flow`,
                        `⚠️ Common Trap: Beware of false friends and inconsistent time markers`
                    ],
                    accent: accents[2],
                    icon: "📐",
                    focusLabel: "Grammar Blueprint",
                    focusNote: "Highlight the key pattern directly on your worksheet."
                });
            }

            // Slide 4: Exercise Walkthrough & Questions
            if (questions.length > 0) {
                slides.push({
                    title: "4. Worksheet Exercises & Practice",
                    subtitle: "Interactive class problem-solving",
                    bullets: questions.slice(0, 4).map((q, idx) => `❓ Item ${idx + 1}: ${q}`),
                    accent: accents[3],
                    icon: "✏️",
                    focusLabel: "Active Practice",
                    focusNote: "Work individually or in pairs to write down your answers."
                });
            } else {
                slides.push({
                    title: "4. Interactive Pair Challenge",
                    subtitle: "Apply the worksheet concepts with your partner",
                    bullets: [
                        `👥 Pair Task: Formulate 2 original sentences applying today's worksheet topics`,
                        `⏱️ Speed Check: Complete Section B on your worksheet within 3 minutes`,
                        `🎤 Class Feedback: Share your answers with the teacher for group review`
                    ],
                    accent: accents[3],
                    icon: "👥",
                    focusLabel: "Pair Activity",
                    focusNote: "Collaborate with your partner to double-check spelling and grammar."
                });
            }

            // Slide 5: Wrap-up & Solutions
            slides.push({
                title: "5. Wrap-up, Answer Key & Homework",
                subtitle: `Reviewing answers for "${worksheetTitle}"`,
                bullets: [
                    `✅ Answer Check: Confirm your written worksheet answers against the class key`,
                    `🌟 Self-Evaluation: Rate your confidence with today's topic from 1 to 5`,
                    `✍️ Next Steps: Complete the homework reflection box on page 2 for tomorrow`
                ],
                accent: accents[4],
                icon: "🎓",
                focusLabel: "Review & Reflect",
                focusNote: "Congratulate students on completing today's masterclass worksheet!"
            });

            currentSlidesData = slides;
            currentSlideIndex = 0;
            switchAppMode('slides');
            renderCurrentSlide();

            showToast("Worksheet successfully converted to matching presentation slides! 📊", "✨");
        }

        // Web Speech API Voice synthesis for Presentation Slides
        let isSpeakingSlide = false;
        let slideSpeechUtterance = null;

        function speakCurrentSlide() {
            if (!('speechSynthesis' in window)) {
                showToast("Web Speech API is not supported in this browser.", "⚠️");
                return;
            }

            const speakBtn = document.getElementById('slide-read-aloud-btn');

            // If currently speaking, toggle pause/cancel
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
                isSpeakingSlide = false;
                if (speakBtn) {
                    speakBtn.innerHTML = '🔊 Read Slide Aloud';
                    speakBtn.classList.remove('speaking-pulse');
                }
                showToast("Speech stopped", "⏹️");
                return;
            }

            if (!currentSlidesData || currentSlidesData.length === 0) return;
            const slide = currentSlidesData[currentSlideIndex];
            if (!slide) return;

            // Prepare text to read aloud
            let cleanBullets = (slide.bullets || []).map(b => {
                return b.replace(/^[•\-\*0-9\.\s\?❓✅✍️🤝📌⏰💡✈️🗣️🔑💼📊📐🌟⚠️❌✔️🔍👥⏱️🎤🚀🌍📖🎯📝\(\)\[\]]+/u, '').trim();
            }).filter(b => b.length > 0);

            let textToRead = `${slide.title}. ${slide.subtitle ? slide.subtitle + '.' : ''} `;
            if (cleanBullets.length > 0) {
                textToRead += cleanBullets.join('. ');
            }

            slideSpeechUtterance = new SpeechSynthesisUtterance(textToRead);
            slideSpeechUtterance.lang = 'en-US';
            slideSpeechUtterance.rate = 0.92; // Slightly slower, clear pace ideal for ESL learners
            slideSpeechUtterance.pitch = 1.0;

            // Pick an English voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('English')));
            if (preferredVoice) {
                slideSpeechUtterance.voice = preferredVoice;
            }

            slideSpeechUtterance.onstart = function() {
                isSpeakingSlide = true;
                if (speakBtn) {
                    speakBtn.innerHTML = '⏹️ Stop Reading';
                    speakBtn.classList.add('speaking-pulse');
                }
                showToast("Reading slide aloud for pronunciation practice... 🗣️", "🔊");
            };

            slideSpeechUtterance.onend = function() {
                isSpeakingSlide = false;
                if (speakBtn) {
                    speakBtn.innerHTML = '🔊 Read Slide Aloud';
                    speakBtn.classList.remove('speaking-pulse');
                }
            };

            slideSpeechUtterance.onerror = function() {
                isSpeakingSlide = false;
                if (speakBtn) {
                    speakBtn.innerHTML = '🔊 Read Slide Aloud';
                    speakBtn.classList.remove('speaking-pulse');
                }
            };

            window.speechSynthesis.speak(slideSpeechUtterance);
        }

        let currentSlideTransition = localStorage.getItem('slide_transition_style') || 'slide';

        function setSlideTransition(val) {
            currentSlideTransition = val || 'slide';
            localStorage.setItem('slide_transition_style', currentSlideTransition);
            
            // Update active state in gallery buttons
            document.querySelectorAll('.transition-gallery-btn').forEach(btn => {
                if (btn.dataset.transition === val) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            renderCurrentSlide('forward');
            showToast(`Transition set to ${getSlideTransitionLabel(currentSlideTransition)}! ✨`, "✨");
        }

        function getSlideTransitionLabel(val) {
            switch (val) {
                case 'slide': return 'Slide Horizontal ↔️';
                case 'fade': return 'Fade & Soft Glow 🌫️';
                case 'zoom': return 'Dynamic Zoom 🔍';
                case 'vertical': return 'Slide Vertical ↕️';
                case 'flip': return '3D Flip 🎴';
                default: return 'Slide Horizontal ↔️';
            }
        }

        function getSlideAnimationClass(transitionType, direction) {
            const isBack = direction === 'backward';
            switch (transitionType) {
                case 'slide':
                    return isBack ? 'anim-slide-backward' : 'anim-slide-forward';
                case 'fade':
                    return 'anim-fade';
                case 'zoom':
                    return isBack ? 'anim-zoom-backward' : 'anim-zoom-forward';
                case 'vertical':
                    return isBack ? 'anim-vertical-backward' : 'anim-vertical-forward';
                case 'flip':
                    return isBack ? 'anim-flip-backward' : 'anim-flip-forward';
                default:
                    return isBack ? 'anim-slide-backward' : 'anim-slide-forward';
            }
        }

        function getSlideHTML(slide, index, total, layout, animClass = 'anim-slide-forward') {
            const isHorizontal = layout === 'horizontal';
            const bulletItems = (slide.bullets || []).map(b => `
                <li style="margin-bottom: 12px; font-size: 17px; line-height: 1.6; color: #1e293b; display: flex; align-items: flex-start; gap: 10px;">
                    <span style="display: inline-block; min-width: 8px; height: 8px; border-radius: 50%; background: ${slide.accent}; margin-top: 8px;"></span>
                    <span style="flex: 1;">${escapeHtml(b)}</span>
                </li>
            `).join('');

            const slideIcon = slide.icon || (index === 0 ? '🎯' : index === total - 1 ? '🎓' : (index % 3 === 0 ? '💡' : index % 2 === 0 ? '🗣️' : '📝'));
            const focusTitle = slide.focusLabel || 'Pronunciation & Practice Focus';
            const focusDesc = slide.focusNote || 'Listen to the slide pronunciation and practice repeating key sentences with a partner.';

            return `
                <div class="slide-stage-wrapper ${animClass}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%; min-height: 380px;">
                    <!-- Top Slide Header -->
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                            <div style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: ${slide.accent};">
                                Lesson Presentation • Slide ${index + 1} of ${total}
                            </div>
                            <button type="button" onclick="speakCurrentSlide()" id="slide-read-aloud-btn" class="slide-voice-btn" style="background: rgba(37,99,235,0.08); border: 1.5px solid ${slide.accent}; color: ${slide.accent}; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                                🔊 Pronounce & Read
                            </button>
                        </div>
                        <h1 style="font-size: 30px; font-weight: 800; color: #0f172a; margin: 0 0 6px 0; line-height: 1.25; letter-spacing: -0.5px;">
                            ${escapeHtml(slide.title)}
                        </h1>
                        <div style="font-size: 16px; font-weight: 500; color: #64748b; margin-bottom: 24px;">
                            ${escapeHtml(slide.subtitle || "")}
                        </div>
                    </div>

                    <!-- Slide Body with Bullets and Optional Visual Panel -->
                    <div class="slide-body-grid ${isHorizontal ? 'layout-split' : 'layout-stacked'}" style="flex: 1;">
                        <!-- Bullets Column -->
                        <div class="slide-bullets-panel" style="background: rgba(255, 255, 255, 0.85); padding: 22px; border-radius: 14px; border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                ${bulletItems}
                            </ul>
                        </div>

                        <!-- Graphic Visual Concept Box -->
                        <div class="slide-visual-panel" style="background: linear-gradient(135deg, white 0%, #f8fafc 100%); border: 1.5px solid ${slide.accent}33; border-radius: 14px; padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; box-shadow: 0 6px 20px rgba(0,0,0,0.04);">
                            <div style="font-size: 42px; margin-bottom: 8px;">
                                ${slideIcon}
                            </div>
                            <div style="font-weight: 700; font-size: 14px; color: ${slide.accent}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                                ${escapeHtml(focusTitle)}
                            </div>
                            <div style="font-size: 12.5px; color: #64748b; line-height: 1.4; max-width: 240px;">
                                ${escapeHtml(focusDesc)}
                            </div>
                        </div>
                    </div>

                    <!-- Slide Bottom Footer -->
                    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; flex-wrap: wrap; gap: 8px;">
                        <span>ESL Interactive Masterclass</span>
                        <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;" onclick="openDigitalShareModal(event)" title="Click to share digital link">
                            <span style="background: rgba(37,99,235,0.08); color: #2563eb; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(37,99,235,0.2);">📱 Digital Version Link</span>
                        </div>
                        <span>Target: Speaking & Fluency</span>
                    </div>
                </div>
            `;
        }

        function renderCurrentSlide(direction = 'forward') {
            const viewport = document.getElementById('slide-viewport-canvas');
            const titleEl = document.getElementById('slide-deck-title');
            const counterEl = document.getElementById('slide-counter-badge');
            const dotsContainer = document.getElementById('slide-dots-container');
            
            if (!viewport || !currentSlidesData || currentSlidesData.length === 0) return;

            // Sync gallery visual state
            document.querySelectorAll('.transition-gallery-btn').forEach(btn => {
                if (btn.dataset.transition === currentSlideTransition) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            const slide = currentSlidesData[currentSlideIndex];
            if (titleEl) titleEl.innerText = slide.title;
            if (counterEl) counterEl.innerText = `Slide ${currentSlideIndex + 1} of ${currentSlidesData.length}`;

            viewport.style.borderLeft = `8px solid ${slide.accent}`;
            const animClass = getSlideAnimationClass(currentSlideTransition, direction);
            viewport.innerHTML = getSlideHTML(slide, currentSlideIndex, currentSlidesData.length, currentSlideLayout, animClass);
            
            if (dotsContainer) {
                dotsContainer.innerHTML = currentSlidesData.map((_, idx) => `
                    <div class="slide-dot ${idx === currentSlideIndex ? 'active' : ''}" onclick="goToSlide(${idx})" title="Jump to slide ${idx + 1}"></div>
                `).join('');
            }
        }

        function nextSlide() {
            if (currentSlideIndex < currentSlidesData.length - 1) {
                currentSlideIndex++;
                renderCurrentSlide('forward');
            }
        }

        function prevSlide() {
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
                renderCurrentSlide('backward');
            }
        }

        function goToSlide(idx) {
            if (idx >= 0 && idx < currentSlidesData.length && idx !== currentSlideIndex) {
                const direction = idx > currentSlideIndex ? 'forward' : 'backward';
                currentSlideIndex = idx;
                renderCurrentSlide(direction);
            }
        }

        function initSlideTouchAndKeyboardControls() {
            const viewport = document.getElementById('slide-viewport-canvas');
            if (viewport) {
                let touchStartX = 0;
                let touchStartY = 0;

                viewport.addEventListener('touchstart', (e) => {
                    if (e.touches && e.touches.length > 0) {
                        touchStartX = e.touches[0].clientX;
                        touchStartY = e.touches[0].clientY;
                    }
                }, { passive: true });

                viewport.addEventListener('touchend', (e) => {
                    if (e.changedTouches && e.changedTouches.length > 0) {
                        const touchEndX = e.changedTouches[0].clientX;
                        const touchEndY = e.changedTouches[0].clientY;
                        const diffX = touchStartX - touchEndX;
                        const diffY = touchStartY - touchEndY;
                        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                            if (diffX > 0) {
                                nextSlide();
                            } else {
                                prevSlide();
                            }
                        }
                    }
                }, { passive: true });
            }

            // Keyboard Arrow navigation when presentation studio is active
            document.addEventListener('keydown', (e) => {
                const slidesContainer = document.getElementById('slides-app-container');
                if (!slidesContainer || slidesContainer.style.display === 'none') return;
                if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable)) return;

                if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'Space') {
                    e.preventDefault();
                    nextSlide();
                } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                    e.preventDefault();
                    prevSlide();
                }
            });
        }

        
        
        // Offline Teaching Export Functions: Microsoft Word (.doc) & PNG Images
        function exportWorksheetWordDoc() {
            try {
                const previewArea = document.getElementById('a4-preview-area');
                if (!previewArea) {
                    showToast("No worksheet content found to export!", "⚠️");
                    return;
                }
                
                const wasEditing = isEditMode;
                if (wasEditing) setWorksheetEditMode(false);

                const titleInput = document.getElementById('acc-save-title');
                const defaultDocTitle = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : "Classroom_Worksheet";
                const filename = defaultDocTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '.doc';

                const cleanClone = previewArea.cloneNode(true);
                cleanClone.querySelectorAll('.no-print, .action-btn, .delete-btn, .drag-handle, .add-section-btn').forEach(el => el.remove());

                const docContent = cleanClone.innerHTML;

                const wordHtml = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset='utf-8'>
                        <title>${escapeHtml(defaultDocTitle)}</title>
                        <!--[if gte mso 9]>
                        <xml>
                            <w:WordDocument>
                                <w:View>Print</w:View>
                                <w:Zoom>100</w:Zoom>
                                <w:DoNotOptimizeForBrowser/>
                            </w:WordDocument>
                        </xml>
                        <![endif]-->
                        <style>
                            @page Section1 {
                                size: 595.3pt 841.9pt;
                                margin: 0.8in 0.8in 0.8in 0.8in;
                                mso-header-margin: 36pt;
                                mso-footer-margin: 36pt;
                                mso-paper-source: 0;
                            }
                            div.Section1 { page: Section1; }
                            body {
                                font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
                                font-size: 12pt;
                                line-height: 1.5;
                                color: #1e293b;
                                background-color: #ffffff;
                            }
                            h1, h2, h3, h4 {
                                color: #0f172a;
                                font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
                                margin-top: 14pt;
                                margin-bottom: 6pt;
                            }
                            h1 { font-size: 20pt; font-weight: bold; }
                            h2 { font-size: 14pt; font-weight: bold; border-bottom: 1.5pt solid #cbd5e1; padding-bottom: 4pt; }
                            p, li { font-size: 11.5pt; margin-bottom: 6pt; }
                            .ws-block { page-break-inside: avoid; margin-bottom: 15pt; }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 10pt 0;
                            }
                            th, td {
                                border: 1pt solid #cbd5e1;
                                padding: 8pt;
                                text-align: left;
                                font-size: 11pt;
                            }
                            th {
                                background-color: #f1f5f9;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="Section1">
                            ${docContent}
                        </div>
                    </body>
                    </html>
                `;

                if (window.AndroidAI && (window.AndroidAI.saveDoc || window.AndroidAI.saveFile)) {
                    const base64Data = 'data:application/msword;base64,' + utf8ToBase64('\ufeff' + wordHtml);
                    if (window.AndroidAI.saveDoc) {
                        window.AndroidAI.saveDoc(base64Data, filename);
                    } else {
                        window.AndroidAI.saveFile(base64Data, filename, 'application/msword');
                    }
                    if (typeof onAndroidFileSaved === 'function') {
                        onAndroidFileSaved(filename, 'application/msword');
                    } else {
                        showToast("Worksheet exported as editable Microsoft Word document (.doc)! 📄", "✨");
                    }
                } else {
                    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.href = url;
                    downloadAnchor.download = filename;
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    setTimeout(() => {
                        if (downloadAnchor.parentNode) downloadAnchor.parentNode.removeChild(downloadAnchor);
                    }, 1000);
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 600000);
                    showToast(`Worksheet Word document downloaded! <a href="${url}" target="_blank" download="${escapeHtml(filename)}" style="margin-left: 8px; color: #60a5fa; font-weight: 700; text-decoration: underline;">📄 Open Doc</a>`, "✨", 10000);
                }

                if (wasEditing) setWorksheetEditMode(true);
            } catch (err) {
                console.error("Export Word doc error:", err);
                showToast("Export error: " + (err.message || err), "⚠️");
            }
        }

        function exportWorksheetImage() {
            const previewArea = document.getElementById('a4-preview-area');
            if (!previewArea) {
                showToast("No worksheet content found to export!", "⚠️");
                return;
            }

            const wasEditing = isEditMode;
            if (wasEditing) setWorksheetEditMode(false);

            showToast("Generating high-resolution PNG image of worksheet...", "⏳");

            const titleInput = document.getElementById('acc-save-title');
            const defaultTitle = (titleInput && titleInput.value.trim()) ? titleInput.value.trim() : "Classroom_Worksheet";
            const filename = defaultTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '.png';

            const captureCanvas = (typeof html2canvas === 'function') ? html2canvas : (window.html2canvas || null);

            if (!captureCanvas) {
                showToast("Image renderer is loading, please try again in a moment...", "⚠️");
                if (wasEditing) setWorksheetEditMode(true);
                return;
            }

            previewArea.classList.add('rendering-image');

            captureCanvas(previewArea, {
                scale: 3,
                windowWidth: 794,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            }).then(canvas => {
                previewArea.classList.remove('rendering-image');
                if (wasEditing) setWorksheetEditMode(true);

                const dataUrl = canvas.toDataURL('image/png');
                if (window.AndroidAI && (window.AndroidAI.saveImage || window.AndroidAI.saveFile)) {
                    if (window.AndroidAI.saveImage) {
                        window.AndroidAI.saveImage(dataUrl, filename);
                    } else {
                        window.AndroidAI.saveFile(dataUrl, filename, 'image/png');
                    }
                    if (typeof onAndroidFileSaved === 'function') {
                        onAndroidFileSaved(filename, 'image/png');
                    } else {
                        showToast(`Worksheet saved to Pictures as PNG image! 🖼️`, "✨");
                    }
                } else {
                    canvas.toBlob(blob => {
                        if (!blob) {
                            showToast("Failed to generate image file", "⚠️");
                            return;
                        }
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(() => {
                            if (a.parentNode) a.parentNode.removeChild(a);
                        }, 1000);
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                        }, 600000);
                        showToast(`Worksheet PNG image downloaded! <a href="${url}" target="_blank" download="${escapeHtml(filename)}" style="margin-left: 8px; color: #60a5fa; font-weight: 700; text-decoration: underline;">🖼️ Open Image</a>`, "✨", 10000);
                    }, 'image/png');
                }
            }).catch(err => {
                previewArea.classList.remove('rendering-image');
                previewArea.classList.remove('rendering-image'); // Fallback safety
                if (wasEditing) setWorksheetEditMode(true);
                console.error("Image export error:", err);
                showToast("Error generating image. You can use Print / PDF export.", "⚠️");
            });
        }

        function exportSlidesWordDoc() {
            try {
                if (!currentSlidesData || currentSlidesData.length === 0) {
                    showToast("Please generate presentation slides first!", "⚠️");
                    return;
                }

                const titleEl = document.getElementById('slide-deck-title');
                const deckTitle = (titleEl && titleEl.innerText) ? titleEl.innerText : "Lesson_Presentation_Deck";
                const filename = deckTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '.doc';

                let slidesHtmlContent = `
                    <div style="text-align: center; border-bottom: 2pt solid #2563eb; padding-bottom: 12pt; margin-bottom: 18pt;">
                        <h1 style="color: #1e3a8a; font-size: 22pt; margin: 0 0 6pt 0;">${escapeHtml(deckTitle)}</h1>
                        <p style="color: #64748b; font-size: 12pt; margin: 0;">ESL Classroom Presentation Deck & Lesson Plan • Total Slides: ${currentSlidesData.length}</p>
                    </div>
                `;

                currentSlidesData.forEach((slide, idx) => {
                    const bulletItems = (slide.bullets || []).map(b => `<li style="font-size: 11.5pt; margin-bottom: 6pt; color: #1e293b;">${escapeHtml(b)}</li>`).join('');
                    slidesHtmlContent += `
                        <div style="page-break-inside: avoid; border: 1pt solid #cbd5e1; border-left: 6pt solid ${slide.accent}; border-radius: 6pt; padding: 14pt; margin-bottom: 16pt; background-color: #f8fafc;">
                            <div style="font-size: 10pt; font-weight: bold; color: ${slide.accent}; text-transform: uppercase;">Slide ${idx + 1} of ${currentSlidesData.length}</div>
                            <h2 style="color: #0f172a; font-size: 16pt; margin: 4pt 0 4pt 0;">${escapeHtml(slide.title)}</h2>
                            <div style="color: #64748b; font-size: 11pt; font-style: italic; margin-bottom: 10pt;">${escapeHtml(slide.subtitle || '')}</div>
                            <ul style="padding-left: 18pt; margin: 0 0 10pt 0;">
                                ${bulletItems}
                            </ul>
                            <div style="background-color: #ffffff; border: 1pt dashed #cbd5e1; padding: 8pt; border-radius: 4pt; font-size: 10pt; color: #475569;">
                                <strong>👨‍🏫 Teaching & Pronunciation Focus:</strong> Practice active repetition and sentence construction with a partner.
                            </div>
                        </div>
                    `;
                });

                const wordHtml = `
                    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head>
                        <meta charset='utf-8'>
                        <title>${escapeHtml(deckTitle)}</title>
                        <style>
                            @page Section1 {
                                size: 595.3pt 841.9pt;
                                margin: 0.8in 0.8in 0.8in 0.8in;
                            }
                            div.Section1 { page: Section1; }
                            body {
                                font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
                                font-size: 11.5pt;
                                line-height: 1.5;
                                color: #1e293b;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="Section1">
                            ${slidesHtmlContent}
                        </div>
                    </body>
                    </html>
                `;

                if (window.AndroidAI && (window.AndroidAI.saveDoc || window.AndroidAI.saveFile)) {
                    const base64Data = 'data:application/msword;base64,' + utf8ToBase64('\ufeff' + wordHtml);
                    if (window.AndroidAI.saveDoc) {
                        window.AndroidAI.saveDoc(base64Data, filename);
                    } else {
                        window.AndroidAI.saveFile(base64Data, filename, 'application/msword');
                    }
                    if (typeof onAndroidFileSaved === 'function') {
                        onAndroidFileSaved(filename, 'application/msword');
                    } else {
                        showToast(`Slide deck exported as editable Microsoft Word document (.doc)! 📄`, "✨");
                    }
                } else {
                    const blob = new Blob(['\ufeff' + wordHtml], { type: 'application/msword;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        if (a.parentNode) a.parentNode.removeChild(a);
                    }, 1000);
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 600000);
                    showToast(`Slide deck exported! <a href="${url}" target="_blank" download="${escapeHtml(filename)}" style="margin-left:8px;color:#60a5fa;font-weight:700;text-decoration:underline;">📄 Open File</a>`, "✨", 10000);
                }
            } catch (err) {
                console.error("Export slide Word doc error:", err);
                showToast("Export error: " + (err.message || err), "⚠️");
            }
        }

        function exportSlideImage() {
            const viewport = document.getElementById('slide-viewport-canvas');
            if (!viewport) {
                showToast("No slide canvas found!", "⚠️");
                return;
            }

            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("Please generate presentation slides first!", "⚠️");
                return;
            }

            const slide = currentSlidesData[currentSlideIndex];
            const slideTitle = (slide && slide.title) ? slide.title.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 25) : `Slide_${currentSlideIndex + 1}`;
            const filename = `Slide_${currentSlideIndex + 1}_${slideTitle}.png`;

            showToast(`Capturing Slide ${currentSlideIndex + 1} as printable PNG image... 🖼️`, "⏳");

            const savePngDataUrl = (dataUrl) => {
                if (window.AndroidAI && (window.AndroidAI.saveImage || window.AndroidAI.saveFile)) {
                    if (window.AndroidAI.saveImage) {
                        window.AndroidAI.saveImage(dataUrl, filename);
                    } else {
                        window.AndroidAI.saveFile(dataUrl, filename, 'image/png');
                    }
                    if (typeof onAndroidFileSaved === 'function') {
                        onAndroidFileSaved(filename, 'image/png');
                    } else {
                        showToast(`Slide ${currentSlideIndex + 1} saved to Pictures as PNG image! 🖼️`, "✨");
                    }
                } else {
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        if (a.parentNode) a.parentNode.removeChild(a);
                    }, 1000);
                    showToast(`Slide ${currentSlideIndex + 1} PNG image downloaded! <a href="${dataUrl}" target="_blank" download="${escapeHtml(filename)}" style="margin-left:8px;color:#60a5fa;font-weight:700;text-decoration:underline;">🖼️ Open Image</a>`, "✨", 10000);
                }
            };

            const captureCanvas = (typeof html2canvas === 'function') ? html2canvas : (window.html2canvas || null);

            if (captureCanvas) {
                captureCanvas(viewport, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#f8fafc',
                    logging: false
                }).then(canvas => {
                    const dataUrl = canvas.toDataURL('image/png');
                    savePngDataUrl(dataUrl);
                }).catch(err => {
                    console.warn("html2canvas capture warning, falling back to direct 2D canvas:", err);
                    const fallbackCanvas = document.createElement('canvas');
                    fallbackCanvas.width = 1920;
                    fallbackCanvas.height = 1080;
                    const ctx = fallbackCanvas.getContext('2d');
                    drawSlideToCanvasDirectly(ctx, slide, currentSlideIndex, currentSlidesData.length, 1920, 1080);
                    const dataUrl = fallbackCanvas.toDataURL('image/png');
                    savePngDataUrl(dataUrl);
                });
            } else {
                // Direct high-res 1920x1080 canvas export fallback
                const fallbackCanvas = document.createElement('canvas');
                fallbackCanvas.width = 1920;
                fallbackCanvas.height = 1080;
                const ctx = fallbackCanvas.getContext('2d');
                drawSlideToCanvasDirectly(ctx, slide, currentSlideIndex, currentSlidesData.length, 1920, 1080);
                const dataUrl = fallbackCanvas.toDataURL('image/png');
                savePngDataUrl(dataUrl);
            }
        }

        function downloadSlidesPDF() {
            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("Please generate slides first!", "⚠️");
                return;
            }
            showToast("Generating crisp, high-resolution PDF of slides... 📥", "⏳");

            const filename = (document.getElementById('slides-prompt') ? document.getElementById('slides-prompt').value.trim() : '') || 'Presentation_Deck';
            const cleanFilename = filename.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 40) + '.pdf';

            // Check if jsPDF is available
            const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (typeof jsPDF === 'function' ? jsPDF : null);

            if (jsPDFClass) {
                try {
                    // Create landscape A4 PDF: 297mm x 210mm
                    const pdf = new jsPDFClass({
                        orientation: 'landscape',
                        unit: 'mm',
                        format: 'a4'
                    });

                    const canvas = document.createElement('canvas');
                    canvas.width = 1920;
                    canvas.height = 1080;
                    const ctx = canvas.getContext('2d');

                    const total = currentSlidesData.length;
                    for (let i = 0; i < total; i++) {
                        if (i > 0) {
                            pdf.addPage('a4', 'landscape');
                        }
                        ctx.clearRect(0, 0, 1920, 1080);
                        drawSlideToCanvasDirectly(ctx, currentSlidesData[i], i, total, 1920, 1080);
                        const imgData = canvas.toDataURL('image/jpeg', 0.96);
                        pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
                    }

                    if (window.AndroidAI && window.AndroidAI.savePdf) {
                        const pdfDataUri = pdf.output('datauristring');
                        window.AndroidAI.savePdf(pdfDataUri, cleanFilename);
                        if (typeof onAndroidFileSaved === 'function') {
                            onAndroidFileSaved(cleanFilename, 'application/pdf');
                        } else {
                            showToast(`PDF saved to Downloads! 📥`, "✨");
                        }
                    } else {
                        const blob = pdf.output('blob');
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = cleanFilename;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(() => {
                            if (a.parentNode) a.parentNode.removeChild(a);
                        }, 1000);
                        setTimeout(() => {
                            URL.revokeObjectURL(url);
                        }, 600000);
                        showToast(`Crisp slides PDF downloaded! <a href="${url}" target="_blank" download="${escapeHtml(cleanFilename)}" style="margin-left:8px;color:#60a5fa;font-weight:700;text-decoration:underline;">📂 Open PDF</a>`, "✨", 10000);
                    }
                    return;
                } catch (pdfErr) {
                    console.warn("jsPDF direct rendering error, falling back to print dialog:", pdfErr);
                }
            }

            // Fallback to high-contrast print layout
            let printContainer = document.getElementById('temp-print-slides-container');
            if (!printContainer) {
                printContainer = document.createElement('div');
                printContainer.id = 'temp-print-slides-container';
                document.body.appendChild(printContainer);
            }
            printContainer.innerHTML = '';
            
            currentSlidesData.forEach((slide, idx) => {
                const slideWrapper = document.createElement('div');
                slideWrapper.className = 'slide-print-page';
                slideWrapper.style.borderLeft = `8px solid ${slide.accent}`;
                slideWrapper.innerHTML = getSlideHTML(slide, idx, currentSlidesData.length, currentSlideLayout);
                printContainer.appendChild(slideWrapper);
            });
            
            document.body.classList.add('printing-slides');
            
            setTimeout(() => {
                if (window.AndroidAI && window.AndroidAI.printWorksheet) {
                    window.AndroidAI.printWorksheet("Presentation_Deck");
                } else {
                    window.print();
                }
                setTimeout(() => {
                    document.body.classList.remove('printing-slides');
                }, 500);
            }, 400);
        }

        // --- Slide Deck Video Export & Audio-Enhanced PDF Export ---
        function openSlideVideoModal() {
            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("Please generate presentation slides first!", "⚠️");
                return;
            }
            const modal = document.getElementById('slide-video-export-modal');
            if (modal) {
                modal.style.display = 'flex';
                const progressBox = document.getElementById('video-export-progress-box');
                if (progressBox) progressBox.style.display = 'none';
                const startBtn = document.getElementById('video-export-start-btn');
                if (startBtn) {
                    startBtn.disabled = false;
                    startBtn.innerText = '🎬 Start Video Generation';
                }
            }
        }

        function closeSlideVideoModal() {
            const modal = document.getElementById('slide-video-export-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }

        function playAudioChime(audioCtx, destination) {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                osc.connect(gain);
                gain.connect(destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.35);
            } catch(e) {
                console.error("Audio chime error:", e);
            }
        }

        // --- Helper to draw a slide directly to Canvas (instant, robust, zero-dependency, ultra-crisp) ---
        function drawSlideToCanvasDirectly(ctx, slide, index, totalSlides, width, height) {
            ctx.save();
            // Background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);

            // Subtle header band
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, width, 140);
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, 140);
            ctx.lineTo(width, 140);
            ctx.stroke();

            // Left accent border bar
            const accentColor = slide.accent || '#2563eb';
            ctx.fillStyle = accentColor;
            ctx.fillRect(0, 0, 24, height);

            const pad = 64;
            let curY = 48;

            // Header category tag
            ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = accentColor;
            ctx.fillText(`LESSON PRESENTATION • SLIDE ${index + 1} OF ${totalSlides}`, pad + 10, curY);

            curY += 46;
            // Title
            ctx.font = '800 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#0f172a';
            const titleText = (slide.title || 'Slide Title').slice(0, 60);
            ctx.fillText(titleText, pad + 10, curY);

            curY = 175;
            // Subtitle
            if (slide.subtitle) {
                ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
                ctx.fillStyle = '#475569';
                ctx.fillText(slide.subtitle.slice(0, 90), pad + 10, curY);
                curY += 38;
            } else {
                curY += 10;
            }

            // Split layout: bullets on left, graphic box on right
            const totalContentW = width - (pad * 2) - 30;
            const panelW = totalContentW * 0.64;
            const rightW = totalContentW * 0.36;
            const panelH = height - curY - 90;

            // Bullets background card
            ctx.fillStyle = '#f8fafc';
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(pad + 10, curY, panelW, panelH, 16);
            ctx.fill();
            ctx.stroke();

            // Render bullets
            const bullets = slide.bullets || [];
            let bulletY = curY + 48;
            bullets.slice(0, 6).forEach((b) => {
                const clean = b.replace(/<[^>]+>/g, '').trim();
                if (!clean) return;

                // Bullet circle
                ctx.fillStyle = accentColor;
                ctx.beginPath();
                ctx.arc(pad + 40, bulletY - 8, 7, 0, Math.PI * 2);
                ctx.fill();

                // Bullet text with larger readable font
                ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
                ctx.fillStyle = '#0f172a';
                
                // Wrap text if needed
                const maxLineW = panelW - 75;
                const words = clean.split(' ');
                let line = '';
                for (let n = 0; n < words.length; n++) {
                    const testLine = line + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxLineW && n > 0) {
                        ctx.fillText(line, pad + 60, bulletY);
                        line = words[n] + ' ';
                        bulletY += 36;
                    } else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, pad + 60, bulletY);
                bulletY += 46;
            });

            // Right visual panel
            const rightX = pad + 10 + panelW + 24;
            ctx.fillStyle = '#f1f5f9';
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(rightX, curY, rightW, panelH, 16);
            ctx.fill();
            ctx.stroke();

            // Right panel icon
            ctx.font = '68px system-ui, -apple-system, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(slide.icon || '💡', rightX + (rightW / 2), curY + 95);

            // Right panel label
            ctx.font = 'bold 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = accentColor;
            ctx.fillText((slide.focusLabel || 'Focus & Practice').toUpperCase(), rightX + (rightW / 2), curY + 155);

            // Right panel desc with text wrapping
            ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#334155';
            const focusText = slide.focusNote || 'Listen & repeat key vocabulary with full pronunciation and fluency.';
            const fWords = focusText.split(' ');
            let fLine = '';
            let fY = curY + 195;
            const maxFW = rightW - 40;
            for (let m = 0; m < fWords.length; m++) {
                const test = fLine + fWords[m] + ' ';
                if (ctx.measureText(test).width > maxFW && m > 0) {
                    ctx.fillText(fLine, rightX + (rightW / 2), fY);
                    fLine = fWords[m] + ' ';
                    fY += 26;
                } else {
                    fLine = test;
                }
            }
            ctx.fillText(fLine, rightX + (rightW / 2), fY);

            ctx.textAlign = 'left';

            // Bottom Footer
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(pad + 10, height - 45);
            ctx.lineTo(width - pad, height - 45);
            ctx.stroke();

            ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillStyle = '#64748b';
            ctx.fillText('ESL Interactive Masterclass Presentation', pad + 10, height - 20);

            // Digital link center stamp
            ctx.textAlign = 'center';
            ctx.fillStyle = accentColor;
            ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillText('📱 Digital Interactive Version Available', width / 2, height - 20);

            ctx.textAlign = 'right';
            ctx.fillStyle = '#64748b';
            ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            ctx.fillText('Target Focus: Speaking & Fluency', width - pad, height - 20);

            ctx.restore();
        }

        async function startSlideVideoExportProcess() {
            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("No slides available to export!", "⚠️");
                return;
            }

            const startBtn = document.getElementById('video-export-start-btn');
            const cancelBtn = document.getElementById('video-export-cancel-btn');
            const progressBox = document.getElementById('video-export-progress-box');
            const statusLabel = document.getElementById('video-export-status-label');
            const percentLabel = document.getElementById('video-export-percent-label');
            const progressBar = document.getElementById('video-export-progress-bar');
            const framePreview = document.getElementById('video-export-frame-preview');

            if (startBtn) {
                startBtn.disabled = true;
                startBtn.innerText = '⏳ Generating Video...';
            }
            if (cancelBtn) cancelBtn.disabled = true;
            if (progressBox) progressBox.style.display = 'block';

            const voiceRate = parseFloat(document.getElementById('video-voice-rate')?.value || '0.95');
            const pauseSec = parseInt(document.getElementById('video-slide-pause')?.value || '2');
            const res = document.getElementById('video-resolution-select')?.value || '1080p';
            const width = res === '1080p' ? 1920 : 1280;
            const height = res === '1080p' ? 1080 : 720;

            const totalSlides = currentSlidesData.length;

            function updateProgress(percent, statusMsg) {
                if (statusLabel) statusLabel.innerText = statusMsg;
                if (percentLabel) percentLabel.innerText = `${percent}%`;
                if (progressBar) progressBar.style.width = `${percent}%`;
            }

            updateProgress(5, "Setting up 16:9 canvas and video recording stream...");

            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = width;
            exportCanvas.height = height;
            const ctx = exportCanvas.getContext('2d');

            let audioCtx = null;
            let dest = null;
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                    audioCtx = new AudioContextClass();
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume().catch(() => {});
                    }
                    dest = audioCtx.createMediaStreamDestination();
                }
            } catch(e) {
                console.warn("AudioContext setup failed:", e);
            }

            let combinedStream = null;
            try {
                const canvasStream = exportCanvas.captureStream ? exportCanvas.captureStream(30) : null;
                if (canvasStream) {
                    const tracks = [...canvasStream.getVideoTracks()];
                    if (dest && dest.stream && dest.stream.getAudioTracks().length > 0) {
                        tracks.push(...dest.stream.getAudioTracks());
                    }
                    combinedStream = new MediaStream(tracks);
                }
            } catch(e) {
                console.warn("Stream creation issue:", e);
            }

            let mimeType = 'video/webm;codecs=vp9,opus';
            if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported) {
                const candidates = [
                    'video/webm;codecs=vp9,opus',
                    'video/webm;codecs=vp8,opus',
                    'video/webm;codecs=h264,opus',
                    'video/webm',
                    'video/mp4'
                ];
                mimeType = candidates.find(t => MediaRecorder.isTypeSupported(t)) || 'video/webm';
            }

            const recordedChunks = [];
            let mediaRecorder = null;
            let canRecordVideo = false;

            if (typeof MediaRecorder !== 'undefined' && combinedStream) {
                try {
                    mediaRecorder = new MediaRecorder(combinedStream, { mimeType });
                    mediaRecorder.ondataavailable = (e) => {
                        if (e.data && e.data.size > 0) {
                            recordedChunks.push(e.data);
                        }
                    };
                    mediaRecorder.start(100);
                    canRecordVideo = true;
                } catch(e) {
                    console.warn("MediaRecorder creation fallback:", e);
                    try {
                        mediaRecorder = new MediaRecorder(combinedStream);
                        mediaRecorder.ondataavailable = (e) => {
                            if (e.data && e.data.size > 0) {
                                recordedChunks.push(e.data);
                            }
                        };
                        mediaRecorder.start(100);
                        canRecordVideo = true;
                    } catch(e2) {
                        console.warn("MediaRecorder fallback failed:", e2);
                        canRecordVideo = false;
                    }
                }
            }

            for (let i = 0; i < totalSlides; i++) {
                const slide = currentSlidesData[i];
                const currentPercent = Math.round(((i) / totalSlides) * 85) + 5;
                updateProgress(currentPercent, `Rendering Slide ${i + 1} of ${totalSlides}: "${slide.title}"`);

                try {
                    // Direct high-performance Canvas drawing
                    drawSlideToCanvasDirectly(ctx, slide, i, totalSlides, width, height);

                    if (framePreview) {
                        framePreview.src = exportCanvas.toDataURL('image/jpeg', 0.8);
                        framePreview.style.display = 'inline-block';
                    }

                    if (audioCtx && dest) {
                        playAudioChime(audioCtx, dest);
                    }

                    let textToRead = `${slide.title}. ${slide.subtitle || ''}. `;
                    const cleanBullets = (slide.bullets || []).map(b => b.replace(/<[^>]+>/g, ' ').trim());
                    if (cleanBullets.length > 0) {
                        textToRead += cleanBullets.join('. ');
                    }

                    if ('speechSynthesis' in window) {
                        try {
                            window.speechSynthesis.cancel();
                            const utterance = new SpeechSynthesisUtterance(textToRead);
                            utterance.lang = 'en-US';
                            utterance.rate = voiceRate;
                            const voices = window.speechSynthesis.getVoices();
                            const preferredVoice = voices.find(v => v.lang && v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('English')));
                            if (preferredVoice) utterance.voice = preferredVoice;
                            window.speechSynthesis.speak(utterance);
                        } catch(e) {
                            console.warn("SpeechSynthesis error:", e);
                        }
                    }

                    const wordCount = textToRead.split(/\s+/).filter(Boolean).length;
                    const estimatedSpeechDurationMs = Math.max((wordCount / (140 * voiceRate / 60)) * 1000, 3000);
                    const totalSlideHoldMs = estimatedSpeechDurationMs + (pauseSec * 1000);

                    const startTime = Date.now();
                    while (Date.now() - startTime < totalSlideHoldMs) {
                        drawSlideToCanvasDirectly(ctx, slide, i, totalSlides, width, height);
                        await new Promise(r => setTimeout(r, 60));
                    }

                } catch(err) {
                    console.error("Error processing slide for video:", err);
                }
            }

            updateProgress(95, "Finalizing video container and preparing download...");

            const titleEl = document.getElementById('slide-deck-title');
            const deckTitle = (titleEl && titleEl.innerText) ? titleEl.innerText : "Lesson_Presentation_Video";
            const filename = deckTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '_Narrated.webm';

            const finishExport = (downloadUrl, finalFilename) => {
                if (audioCtx && audioCtx.state !== 'closed') {
                    audioCtx.close().catch(() => {});
                }

                updateProgress(100, "Export Complete! Video saved.");
                if (downloadUrl) {
                    showToast(`Slide deck exported! <a href="${downloadUrl}" target="_blank" download="${escapeHtml(finalFilename || filename)}" style="margin-left:8px;color:#60a5fa;font-weight:700;text-decoration:underline;">🎬 Open Video</a>`, "✨", 10000);
                } else {
                    showToast("Narrated Slide Deck Video exported successfully! 🎬", "✨");
                }

                if (startBtn) {
                    startBtn.disabled = false;
                    startBtn.innerText = '🎬 Start Video Generation';
                }
                if (cancelBtn) cancelBtn.disabled = false;

                setTimeout(() => {
                    closeSlideVideoModal();
                }, 2000);
            };

            if (canRecordVideo && mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: mimeType || 'video/webm' });
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Data = reader.result;
                        if (window.AndroidAI && typeof window.AndroidAI.saveFile === 'function') {
                            window.AndroidAI.saveFile(base64Data, filename, 'video/webm');
                        }
                    };
                    reader.readAsDataURL(blob);

                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(() => {
                        if (a.parentNode) a.parentNode.removeChild(a);
                    }, 1000);
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 600000);

                    finishExport(url, filename);
                };
                try {
                    mediaRecorder.stop();
                } catch(stopErr) {
                    console.error("MediaRecorder stop error:", stopErr);
                    finishExport();
                }
            } else {
                // High-resolution fallback for browsers/environments where MediaRecorder is unavailable
                const pngDataUrl = exportCanvas.toDataURL('image/png');
                const imageFilename = deckTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '_SlideDeck.png';
                if (window.AndroidAI && typeof window.AndroidAI.saveFile === 'function') {
                    window.AndroidAI.saveFile(pngDataUrl, imageFilename, 'image/png');
                }
                const a = document.createElement('a');
                a.href = pngDataUrl;
                a.download = imageFilename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    if (a.parentNode) a.parentNode.removeChild(a);
                }, 1000);
                finishExport(pngDataUrl, imageFilename);
            }
        }

        function exportSlidesAudioPDF() {
            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("Please generate presentation slides first!", "⚠️");
                return;
            }

            const titleEl = document.getElementById('slide-deck-title');
            const deckTitle = (titleEl && titleEl.innerText) ? titleEl.innerText : "Lesson_Presentation_Deck";
            const filename = deckTitle.replace(/[^a-zA-Z0-9_-]/g, '_') + '_Audio_Enhanced.html';

            let slidesContentHtml = '';
            currentSlidesData.forEach((slide, idx) => {
                const bulletItems = (slide.bullets || []).map(b => `<li style="margin-bottom:12px; font-size:18px; line-height:1.6; display:flex; gap:10px; align-items:flex-start;"><span style="width:8px; height:8px; border-radius:50%; background:${slide.accent}; margin-top:9px; flex-shrink:0;"></span><span>${escapeHtml(b)}</span></li>`).join('');
                const textToRead = `${slide.title}. ${slide.subtitle || ''}. ${(slide.bullets || []).join('. ')}`;

                slidesContentHtml += `
                    <div class="slide-card-page" id="slide-page-${idx}">
                        <div class="slide-card-header">
                            <div>
                                <div class="slide-meta-label" style="color: ${slide.accent};">SLIDE ${idx + 1} OF ${currentSlidesData.length}</div>
                                <h1 class="slide-title">${escapeHtml(slide.title)}</h1>
                                ${slide.subtitle ? `<div class="slide-sub">${escapeHtml(slide.subtitle)}</div>` : ''}
                            </div>
                            <button type="button" class="voice-narration-btn" onclick="speakSlideText(\`${escapeHtml(textToRead).replace(/`/g, '\\`')}\`)" style="border-color: ${slide.accent}; color: ${slide.accent};">
                                🔊 Play Voice Narration
                            </button>
                        </div>

                        <div class="slide-body-grid">
                            <div class="slide-bullets-box">
                                <ul style="list-style:none; padding:0; margin:0;">${bulletItems}</ul>
                            </div>
                            <div class="slide-visual-box" style="border-color:${slide.accent}33;">
                                <div style="font-size:48px; margin-bottom:8px;">${slide.icon || '💡'}</div>
                                <div style="font-weight:700; color:${slide.accent}; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px; font-size:14px;">${escapeHtml(slide.focusLabel || 'Focus & Practice')}</div>
                                <div style="font-size:13px; color:#64748b; text-align:center;">${escapeHtml(slide.focusNote || 'Listen and repeat key vocabulary.')}</div>
                            </div>
                        </div>
                    </div>
                `;
            });

            const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(deckTitle)} — Audio-Enhanced Interactive Presentation</title>
    <style>
        :root {
            --primary: #2563eb;
            --bg: #f8fafc;
        }
        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0f172a;
            color: #1e293b;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
        }
        .header-bar {
            background: #1e293b;
            color: white;
            padding: 16px 24px;
            border-radius: 16px;
            margin-bottom: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        .header-title {
            font-size: 20px;
            font-weight: 800;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .btn-action {
            background: #2563eb;
            color: white;
            border: none;
            padding: 10px 18px;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            font-size: 13px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        .btn-action:hover {
            background: #1d4ed8;
        }
        .slide-card-page {
            background: white;
            border-radius: 20px;
            padding: 36px;
            margin-bottom: 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            page-break-after: always;
            aspect-ratio: 16 / 9;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
        }
        .slide-card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .slide-meta-label {
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 1.5px;
        }
        .slide-title {
            font-size: 28px;
            font-weight: 800;
            color: #0f172a;
            margin: 4px 0;
        }
        .slide-sub {
            font-size: 15px;
            color: #64748b;
        }
        .voice-narration-btn {
            background: #f1f5f9;
            border: 1.5px solid #cbd5e1;
            padding: 8px 16px;
            border-radius: 10px;
            font-weight: 700;
            font-size: 13px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        .voice-narration-btn:hover {
            transform: scale(1.03);
            background: #e2e8f0;
        }
        .slide-body-grid {
            display: grid;
            grid-template-columns: 1fr 280px;
            gap: 20px;
            flex: 1;
        }
        .slide-bullets-box {
            background: #f8fafc;
            padding: 20px;
            border-radius: 14px;
            border: 1px solid #e2e8f0;
        }
        .slide-visual-box {
            background: #f8fafc;
            border: 1.5px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        @media print {
            body { background: white; padding: 0; }
            .header-bar { display: none; }
            .voice-narration-btn { display: none; }
            .slide-card-page { box-shadow: none; margin: 0; border-radius: 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-bar">
            <div class="header-title">
                <span>🎧 \${escapeHtml(deckTitle)}</span>
                <span style="font-size:12px; background:#2563eb; padding:2px 8px; border-radius:8px;">Audio-Enhanced PDF Presentation</span>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="btn-action" onclick="playAllNarrationsSequentially()">▶ Auto-Play All Narrations</button>
                <button class="btn-action" style="background:#475569;" onclick="window.print()">🖨️ Print / Save PDF</button>
            </div>
        </div>

        \${slidesContentHtml}
    </div>

    \x3Cscript\x3E
        function speakSlideText(text) {
            if (!('speechSynthesis' in window)) {
                if (typeof showToast === 'function') showToast("Speech synthesis is not supported in this browser.", "⚠️");
                else alert("Speech synthesis is not supported in this browser.");
                return;
            }
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.92;
            window.speechSynthesis.speak(utterance);
        }

        function playAllNarrationsSequentially() {
            const cards = document.querySelectorAll('.slide-card-page');
            let idx = 0;
            function playNext() {
                if (idx >= cards.length) return;
                const btn = cards[idx].querySelector('.voice-narration-btn');
                cards[idx].scrollIntoView({ behavior: 'smooth' });
                if (btn) btn.click();
                idx++;
                setTimeout(playNext, 8000);
            }
            playNext();
        }
    \x3C/script\x3E
</body>
</html>`;

            if (window.AndroidAI && (window.AndroidAI.saveDoc || window.AndroidAI.saveFile)) {
                const base64Data = 'data:text/html;base64,' + utf8ToBase64(fullDoc);
                if (window.AndroidAI.saveDoc) {
                    window.AndroidAI.saveDoc(base64Data, filename);
                } else {
                    window.AndroidAI.saveFile(base64Data, filename, 'text/html');
                }
                if (typeof onAndroidFileSaved === 'function') {
                    onAndroidFileSaved(filename, 'text/html');
                } else {
                    showToast(`Audio-Enhanced Presentation saved! Open file to listen to voice narration 🎧`, "✨");
                }
            } else {
                const blob = new Blob([fullDoc], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    if (a.parentNode) a.parentNode.removeChild(a);
                }, 1000);
                setTimeout(() => {
                    URL.revokeObjectURL(url);
                }, 600000);
                showToast(`Audio-Enhanced Presentation exported! <a href="${url}" target="_blank" download="${escapeHtml(filename)}" style="margin-left:8px;color:#60a5fa;font-weight:700;text-decoration:underline;">🎧 Open File</a>`, "✨", 10000);
            }
        }


        // Also run immediately in case DOM is already loaded
        initSampleFeatures();
        updateSavedCountBadges();
        loadSavedTheme();
        checkAndLoadSharedWorksheetHash();
        updateQRCodePreview();
        restoreAutoSavedWorksheet();
