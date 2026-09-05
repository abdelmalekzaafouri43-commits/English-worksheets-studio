const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetStr = `        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <!-- Digital Interactive QR Link -->
            <button type="button" class="dark-mode-toggle-btn" onclick="openDigitalShareModal(event)" title="Show QR code for interactive digital version">
                <span>📱 Digital Link</span>
            </button>
            
            <!-- Global Night Mode / Day Mode Toggle Button -->
            <button type="button" class="dark-mode-toggle-btn" id="global-dark-mode-toggle" onclick="toggleGlobalDarkMode()" title="Toggle Night Mode / Day Mode">
                <span id="dark-mode-label">🌙 Night Mode</span>
            </button>

            <!-- Theme Selector Trigger Button -->
            <div class="theme-selector-container">
                <button type="button" class="theme-selector-btn" id="theme-menu-trigger" onclick="toggleThemeMenu(event)" title="Choose Theme Palette">
                    <span class="theme-dot" id="header-theme-dot" style="background: #38bdf8; margin-right: 6px;"></span>
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <span style="opacity: 0.85; font-weight: 600;">Theme:</span>
                        <span id="current-theme-label" style="font-weight: 800;">Sapphire</span>
                    </span>
                </button>
            </div>

            <!-- API Key Configuration -->
            <button type="button" class="saved-manager-btn" onclick="openApiKeyModal()" title="Configure Gemini API Key" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--tag-border);">
                <span>🔑 API Key</span>
            </button>

            <!-- Saved Worksheets Quick Access -->
            <button type="button" class="saved-manager-btn" onclick="openSavedWorksheetsModal()" title="View and open saved worksheets">
                <span>Saved Worksheets</span>
                <span class="badge-count" id="header-saved-count">0</span>
            </button>
        </div>`;

const replaceStr = `        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: var(--primary-box-bg); padding: 8px 12px; border-radius: 16px; border: 1px solid var(--tag-border);">
            
            <!-- Group 1: Tools -->
            <div style="display: flex; align-items: center; gap: 8px; border-right: 1px solid var(--tag-border); padding-right: 12px;">
                <!-- Saved Worksheets Quick Access -->
                <button type="button" class="saved-manager-btn" onclick="openSavedWorksheetsModal()" title="View and open saved worksheets" style="background: linear-gradient(135deg, var(--accent-primary) 0%, #2563eb 100%); color: white; border: none; box-shadow: 0 4px 10px rgba(37,99,235,0.2);">
                    <span>📂 Saved Worksheets</span>
                    <span class="badge-count" id="header-saved-count" style="background: white; color: var(--accent-primary);">0</span>
                </button>

                <!-- Digital Interactive QR Link -->
                <button type="button" class="dark-mode-toggle-btn" onclick="openDigitalShareModal(event)" title="Show QR code for interactive digital version" style="background: var(--bg-card);">
                    <span>📱 Digital Link</span>
                </button>
            </div>

            <!-- Group 2: Appearance & System -->
            <div style="display: flex; align-items: center; gap: 8px;">
                <!-- Theme Selector Trigger Button -->
                <div class="theme-selector-container">
                    <button type="button" class="theme-selector-btn" id="theme-menu-trigger" onclick="toggleThemeMenu(event)" title="Choose Theme Palette" style="background: var(--bg-card);">
                        <span class="theme-dot" id="header-theme-dot" style="background: #38bdf8; margin-right: 6px;"></span>
                        <span style="display: flex; align-items: center; gap: 4px;">
                            <span style="opacity: 0.85; font-weight: 600;">Theme:</span>
                            <span id="current-theme-label" style="font-weight: 800;">Sapphire</span>
                        </span>
                    </button>
                </div>
                
                <!-- Global Night Mode / Day Mode Toggle Button -->
                <button type="button" class="dark-mode-toggle-btn" id="global-dark-mode-toggle" onclick="toggleGlobalDarkMode()" title="Toggle Night Mode / Day Mode" style="background: var(--bg-card);">
                    <span id="dark-mode-label">🌙 Night Mode</span>
                </button>

                <!-- API Key Configuration -->
                <button type="button" class="saved-manager-btn" onclick="openApiKeyModal()" title="Configure Gemini API Key" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--tag-border);">
                    <span>🔑 API</span>
                </button>
            </div>
        </div>`;

html = html.replace(targetStr, replaceStr);

fs.writeFileSync('index.html', html);
console.log("Done patching header buttons");
