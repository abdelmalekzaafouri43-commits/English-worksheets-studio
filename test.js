const { JSDOM } = require("jsdom");
const dom = new JSDOM(`<!DOCTYPE html><div id="level-body"></div>`);
const document = dom.window.document;
const Node = dom.window.Node;

let container = document.getElementById('level-body');
let html = `<h2>Title</h2><p>Here is some text.</p>`;

const parser = new dom.window.DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const sourceNodes = Array.from(doc.body.childNodes);

container.innerHTML = '<div id="ws-content-root" style="color: black; padding: 10px;"></div>';
const root = container.querySelector('#ws-content-root');

const cursor = document.createElement('span');

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
        console.log("DONE");
        console.log(container.innerHTML);
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
            let chunk = 2;
            item.textNode.textContent += item.text.substr(textIdx, chunk);
            textIdx += chunk;
            processQueue(); // simulate setTimeout
        } else {
            textIdx = 0;
            qIdx++;
            processQueue();
        }
    }
}

processQueue();
