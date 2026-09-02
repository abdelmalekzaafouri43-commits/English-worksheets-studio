import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the boundaries of getSlideHTML
start_idx = content.find("function getSlideHTML(slide, idx, total, layout) {")
end_idx = content.find("function renderCurrentSlide() {")

if start_idx != -1 and end_idx != -1:
    slide_func = content[start_idx:end_idx]
    
    # Replace the vars with hardcoded light theme colors
    slide_func = slide_func.replace("var(--title-color)", "#0f172a")
    slide_func = slide_func.replace("var(--text-main)", "#1e293b")
    slide_func = slide_func.replace("var(--text-muted)", "#475569")
    slide_func = slide_func.replace("var(--bg-card)", "#ffffff")
    slide_func = slide_func.replace("var(--tag-border)", "#e2e8f0")
    
    content = content[:start_idx] + slide_func + content[end_idx:]
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched slide colors successfully.")
else:
    print("Could not find getSlideHTML bounds.")
