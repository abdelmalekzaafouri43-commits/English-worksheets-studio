import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_css = """            .slide-print-page {
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
            }"""

new_css = """            .slide-print-page {
                page-break-after: always !important;
                break-after: page !important;
                page-break-inside: avoid !important;
                break-inside: avoid !important;
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
                margin: 0 auto;
                width: 100%;
                max-width: 1080px;
            }
            .slide-print-page:last-child {
                page-break-after: auto !important;
                break-after: auto !important;
            }"""

if old_css in content:
    content = content.replace(old_css, new_css)
else:
    print("Could not find print css")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Patched print css.")
