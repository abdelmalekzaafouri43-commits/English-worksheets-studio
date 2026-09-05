const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `<div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
                            <label for="slide-transition-select" style="font-size: 12px; font-weight: 700; color: var(--text-muted);">✨ Animation:</label>
                            <select id="slide-transition-select" onchange="setSlideTransition(this.value)" class="editor-btn" style="padding: 5px 8px; font-size: 12px; font-weight: 700; cursor: pointer; border-radius: 8px;" title="Select CSS slide transition animation effect">
                                <option value="slide">Slide Horizontal ↔️</option>
                                <option value="fade">Fade & Soft Blur 🌫️</option>
                                <option value="zoom">Dynamic Zoom 🔍</option>
                                <option value="vertical">Slide Vertical ↕️</option>
                                <option value="flip">3D Flip 🎴</option>
                            </select>
                            <button type="button" class="editor-btn" onclick="toggleSlideLayout()" id="slide-layout-toggle-btn" style="padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;" title="Toggle between Horizontal Split and Vertical Stacked layout">Layout: Horizontal ↔️</button>
                        </div>`;

const replaceStr = `<div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
                            <div class="transition-gallery" style="display: inline-flex; background: var(--bg-body); padding: 3px; border-radius: 10px; border: 1px solid var(--tag-border); gap: 2px; align-items: center;">
                                <span style="font-size: 11px; font-weight: 800; color: var(--text-muted); padding: 0 8px 0 6px; text-transform: uppercase;">✨ FX</span>
                                <button type="button" class="transition-gallery-btn active" data-transition="slide" onclick="setSlideTransition('slide')" title="Slide Horizontal">↔️</button>
                                <button type="button" class="transition-gallery-btn" data-transition="fade" onclick="setSlideTransition('fade')" title="Fade & Soft Blur">🌫️</button>
                                <button type="button" class="transition-gallery-btn" data-transition="zoom" onclick="setSlideTransition('zoom')" title="Dynamic Zoom">🔍</button>
                                <button type="button" class="transition-gallery-btn" data-transition="vertical" onclick="setSlideTransition('vertical')" title="Slide Vertical">↕️</button>
                                <button type="button" class="transition-gallery-btn" data-transition="flip" onclick="setSlideTransition('flip')" title="3D Flip">🎴</button>
                            </div>
                            <button type="button" class="editor-btn" onclick="toggleSlideLayout()" id="slide-layout-toggle-btn" style="padding: 6px 12px; font-size: 12px; font-weight: 700; cursor: pointer;" title="Toggle between Horizontal Split and Vertical Stacked layout">Layout: Horizontal ↔️</button>
                        </div>`;

html = html.replace(targetStr, replaceStr);

// We need to add the CSS for .transition-gallery-btn
const cssStr = `
        .transition-gallery-btn {
            background: transparent;
            border: none;
            border-radius: 6px;
            padding: 4px 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--text-muted);
            opacity: 0.6;
            filter: grayscale(1);
        }
        .transition-gallery-btn:hover {
            background: rgba(0,0,0,0.05);
            opacity: 0.9;
        }
        .transition-gallery-btn.active {
            background: var(--bg-card);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            color: var(--text-main);
            opacity: 1;
            filter: none;
            border: 1px solid var(--input-border);
        }
        body.dark-mode .transition-gallery-btn.active {
            background: var(--primary-box-bg);
            border-color: var(--tag-border);
        }
`;

html = html.replace('/* Specialized PDF Generation Clean Rules */', cssStr + '\n        /* Specialized PDF Generation Clean Rules */');

fs.writeFileSync('index.html', html);
console.log("Done patching HTML");
