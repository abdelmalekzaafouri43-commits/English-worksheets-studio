const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetJsStr = `        function setSlideTransition(val) {
            currentSlideTransition = val || 'slide';
            localStorage.setItem('slide_transition_style', currentSlideTransition);
            renderCurrentSlide('forward');
            showToast(\`Transition set to \${getSlideTransitionLabel(currentSlideTransition)}! ✨\`, "✨");
        }`;

const replaceJsStr = `        function setSlideTransition(val) {
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
            showToast(\`Transition set to \${getSlideTransitionLabel(currentSlideTransition)}! ✨\`, "✨");
        }`;

html = html.replace(targetJsStr, replaceJsStr);

const targetRenderStr = `            const transitionSelect = document.getElementById('slide-transition-select');
            
            if (!viewport || !currentSlidesData || currentSlidesData.length === 0) return;

            if (transitionSelect && transitionSelect.value !== currentSlideTransition) {
                transitionSelect.value = currentSlideTransition;
            }`;

const replaceRenderStr = `            
            if (!viewport || !currentSlidesData || currentSlidesData.length === 0) return;

            // Sync gallery visual state
            document.querySelectorAll('.transition-gallery-btn').forEach(btn => {
                if (btn.dataset.transition === currentSlideTransition) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });`;

html = html.replace(targetRenderStr, replaceRenderStr);

fs.writeFileSync('index.html', html);
console.log("Done patching JS");
