const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetWordExportStr = `                if (window.AndroidAI && (window.AndroidAI.saveDoc || window.AndroidAI.saveFile)) {
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
                    showToast(\`Worksheet Word document downloaded! <a href="\${url}" target="_blank" download="\${escapeHtml(filename)}" style="margin-left: 8px; color: #60a5fa; font-weight: 700; text-decoration: underline;">📄 Open Doc</a>\`, "✨", 10000);
                }`;

// Since the `click()` event might be blocked if it's not directly attached to a user interaction,
// we ensure it triggers correctly.
const replaceWordExportStr = `                if (window.AndroidAI && (window.AndroidAI.saveDoc || window.AndroidAI.saveFile)) {
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
                    downloadAnchor.style.display = 'none';
                    downloadAnchor.href = url;
                    downloadAnchor.download = filename;
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    
                    setTimeout(() => {
                        if (downloadAnchor.parentNode) downloadAnchor.parentNode.removeChild(downloadAnchor);
                    }, 500);
                    
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                    }, 600000);
                    
                    showToast(\`Worksheet Word document exported! <a href="\${url}" target="_blank" download="\${escapeHtml(filename)}" style="margin-left: 8px; color: #60a5fa; font-weight: 700; text-decoration: underline;">📄 Open Doc</a>\`, "✨", 8000);
                }`;

html = html.replace(targetWordExportStr, replaceWordExportStr);
fs.writeFileSync('index.html', html);
console.log("Done patching word doc export");
