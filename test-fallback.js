async function askAI(prompt, apiKey, model = 'gemini-1.5-flash') {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    if (data.error) {
        if (data.error.message.includes('not found') && model === 'gemini-1.5-flash') {
            console.log("Retrying with gemini-pro...");
            return askAI(prompt, apiKey, 'gemini-pro');
        }
        throw new Error(data.error.message);
    }
    return data.candidates[0].content.parts[0].text;
}
