import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert CSS
css_to_insert = """
        @media print {
            body.printing-slides { 
                background: white !important;
            }
            body.printing-slides > *:not(#temp-print-slides-container) {
                display: none !important;
            }
            body.printing-slides #temp-print-slides-container {
                display: block !important;
                width: 100%;
            }
            .slide-print-page {
                page-break-after: always !important;
                break-after: page !important;
                aspect-ratio: 16/9;
                padding: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
                color: #0f172a;
                box-sizing: border-box;
                border: 2px solid #e2e8f0;
                margin-bottom: 20px;
                width: 100%;
                max-width: 1080px;
                margin-left: auto;
                margin-right: auto;
            }
"""
content = content.replace("        @media print {", css_to_insert)

# 2. Extract getSlideHTML
get_slide_html_func = """
        function getSlideHTML(slide, idx, total, layout) {
            let bulletsHtml = slide.bullets.map(b => `<li style="margin-bottom: 14px; font-size: 17px; line-height: 1.6; color: var(--text-main); display: flex; align-items: flex-start; gap: 10px;"><span style="color: ${slide.accent}; font-weight: bold; font-size: 20px;">▪</span><span>${escapeHtml(b)}</span></li>`).join('');

            const imgStyle = slide.imageStyle || 'concept';
            let rightCardHtml = '';
            let bottomBannerHtml = '';
            
            if (imgStyle === 'concept') {
                rightCardHtml = `
                    <div style="flex: 0.9; background: linear-gradient(135deg, ${slide.accent}15 0%, ${slide.accent}05 100%); border: 2px dashed ${slide.accent}50; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.03);">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: ${slide.accent}; color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 16px; box-shadow: 0 6px 16px ${slide.accent}40;">💡</div>
                        <div style="font-weight: 700; font-size: 16px; color: var(--title-color); margin-bottom: 6px;">Visual Concept Illustration</div>
                        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">Structured lesson graphic for ${escapeHtml(slide.title)}</div>
                    </div>
                `;
                bottomBannerHtml = `
                    <div style="background: linear-gradient(135deg, ${slide.accent}15 0%, ${slide.accent}05 100%); border: 1.5px dashed ${slide.accent}40; border-radius: 14px; padding: 14px 20px; display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 24px;">💡</div>
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--title-color);">Visual Concept Illustration</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Structured lesson graphic asset for classroom display and interactive student discussion</div>
                        </div>
                    </div>
                `;
            } else if (imgStyle === 'diagram') {
                rightCardHtml = `
                    <div style="flex: 0.9; background: linear-gradient(135deg, #0284c715 0%, #0284c705 100%); border: 2px dashed #0284c750; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.03);">
                        <div style="width: 64px; height: 64px; border-radius: 14px; background: #0284c7; color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 16px; box-shadow: 0 6px 16px #0284c740;">📊</div>
                        <div style="font-weight: 700; font-size: 16px; color: var(--title-color); margin-bottom: 6px;">Structured Flowchart & Diagram</div>
                        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">Step-by-step structural logic map</div>
                    </div>
                `;
                bottomBannerHtml = `
                    <div style="background: linear-gradient(135deg, #0284c715 0%, #0284c705 100%); border: 1.5px dashed #0284c740; border-radius: 14px; padding: 14px 20px; display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 24px;">📊</div>
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--title-color);">Structured Flowchart & Diagram</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Step-by-step structural logic map for classroom explanation</div>
                        </div>
                    </div>
                `;
            } else if (imgStyle === 'photo') {
                rightCardHtml = `
                    <div style="flex: 0.9; background: linear-gradient(135deg, #16a34a15 0%, #16a34a05 100%); border: 2px dashed #16a34a50; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.03);">
                        <div style="width: 64px; height: 64px; border-radius: 50%; background: #16a34a; color: white; display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 16px; box-shadow: 0 6px 16px #16a34a40;">📷</div>
                        <div style="font-weight: 700; font-size: 16px; color: var(--title-color); margin-bottom: 6px;">Photographic Context Asset</div>
                        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">Real-world situational photo frame</div>
                    </div>
                `;
                bottomBannerHtml = `
                    <div style="background: linear-gradient(135deg, #16a34a15 0%, #16a34a05 100%); border: 1.5px dashed #16a34a40; border-radius: 14px; padding: 14px 20px; display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 24px;">📷</div>
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--title-color);">Photographic Context Asset</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Real-world situational context for immersive vocabulary and dialogue practice</div>
                        </div>
                    </div>
                `;
            } else {
                rightCardHtml = `
                    <div style="flex: 0.9; background: var(--bg-card); border: 2px solid var(--tag-border); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.02);">
                        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--primary-box-bg); color: var(--title-color); display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 14px; border: 1px solid var(--tag-border);">✨</div>
                        <div style="font-weight: 700; font-size: 16px; color: var(--title-color); margin-bottom: 4px;">Clean Minimalist Layout</div>
                        <div style="font-size: 13px; color: var(--text-muted); line-height: 1.4;">Focused high-contrast typography</div>
                    </div>
                `;
                bottomBannerHtml = `
                    <div style="background: var(--bg-card); border: 1.5px solid var(--tag-border); border-radius: 14px; padding: 14px 20px; display: flex; align-items: center; gap: 16px;">
                        <div style="font-size: 24px;">✨</div>
                        <div>
                            <div style="font-weight: 700; font-size: 14px; color: var(--title-color);">Clean Minimalist Layout</div>
                            <div style="font-size: 12px; color: var(--text-muted);">Focused high-contrast typography and polished presentation spacing</div>
                        </div>
                    </div>
                `;
            }

            if (layout === 'horizontal') {
                return `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
                        <div>
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: ${slide.accent}; letter-spacing: 1px; margin-bottom: 4px;">Slide ${idx + 1} of ${total} • Horizontal Split</div>
                            <h2 style="font-size: 28px; font-weight: 800; color: var(--title-color); margin: 0 0 4px 0; line-height: 1.2;">${escapeHtml(slide.title)}</h2>
                            <div style="font-size: 15px; color: var(--text-muted); font-weight: 500;">${escapeHtml(slide.subtitle)}</div>
                        </div>
                        <div style="font-size: 28px; padding: 10px; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--tag-border); box-shadow: 0 4px 12px rgba(0,0,0,0.04);">📊</div>
                    </div>
                    <div style="display: flex; gap: 24px; flex-grow: 1; align-items: stretch; margin: 10px 0;">
                        <div style="flex: 1.2; background: var(--bg-card); border: 1.5px solid var(--tag-border); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
                            <ul style="list-style: none; padding: 0; margin: 0;">${bulletsHtml}</ul>
                        </div>
                        ${rightCardHtml}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                        <span>English Worksheet Studio & Presentation Deck</span>
                        <span style="font-weight: 700; color: ${slide.accent};">ESL / ELT Suite</span>
                    </div>
                `;
            } else {
                return `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                        <div>
                            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: ${slide.accent}; letter-spacing: 1px; margin-bottom: 4px;">Slide ${idx + 1} of ${total} • Vertical Stacked</div>
                            <h2 style="font-size: 28px; font-weight: 800; color: var(--title-color); margin: 0 0 4px 0; line-height: 1.2;">${escapeHtml(slide.title)}</h2>
                            <div style="font-size: 15px; color: var(--text-muted); font-weight: 500;">${escapeHtml(slide.subtitle)}</div>
                        </div>
                        <div style="font-size: 28px; padding: 10px; background: var(--bg-card); border-radius: 14px; border: 1px solid var(--tag-border); box-shadow: 0 4px 12px rgba(0,0,0,0.04);">📊</div>
                    </div>
                    <div style="background: var(--bg-card); border: 1.5px solid var(--tag-border); border-radius: 16px; padding: 22px 28px; margin-bottom: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.04);">
                        <ul style="list-style: none; padding: 0; margin: 0;">${bulletsHtml}</ul>
                    </div>
                    ${bottomBannerHtml}
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--text-muted); margin-top: 8px;">
                        <span>English Worksheet Studio & Presentation Deck</span>
                        <span style="font-weight: 700; color: ${slide.accent};">ESL / ELT Suite</span>
                    </div>
                `;
            }
        }
"""
content = content.replace("function renderCurrentSlide() {", get_slide_html_func + "\n        function renderCurrentSlide() {")


# 3. Replace the body of renderCurrentSlide()
import re
pattern_render = r"(function renderCurrentSlide\(\) \{)(.*?)(if \(!viewport\) return;.*?)(let bulletsHtml = .*?)(if \(dotsContainer\) \{)"
replacement_render = r"""\1\2\3
            viewport.style.borderLeft = `8px solid ${slide.accent}`;
            viewport.innerHTML = getSlideHTML(slide, currentSlideIndex, currentSlidesData.length, currentSlideLayout);
            
            \5"""
content = re.sub(pattern_render, replacement_render, content, flags=re.DOTALL)


# 4. Modify downloadSlidesPDF
new_download = """
        function downloadSlidesPDF() {
            if (!currentSlidesData || currentSlidesData.length === 0) {
                showToast("Please generate slides first!", "⚠️");
                return;
            }
            showToast("Preparing presentation slides for export...", "📥");
            
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
                window.print();
                setTimeout(() => {
                    document.body.classList.remove('printing-slides');
                }, 500);
            }, 400);
        }
"""
content = re.sub(r"function downloadSlidesPDF\(\) \{.*?setTimeout\(\(\) => \{.*?window\.print\(\);.*?\}, 400\);.*?}", new_download, content, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done writing modifications to index.html")
