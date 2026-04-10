// nudge.js - Behavioral intervention popup simulating Local SLM (Phi-3)

let nudgeTriggered = false;
let latestVisionLatency = 0;

window.addEventListener('visionProcessed', (e) => {
    latestVisionLatency = e.detail.latency;
});

window.addEventListener('cortisolSpike', () => {
    // Only trigger once per session to avoid spamming
    if (!nudgeTriggered) {
        nudgeTriggered = true;
        
        // Wait briefly after spike detection to show overlay
        setTimeout(() => {
            const overlay = document.getElementById('nudge-overlay');
            const title = document.getElementById('nudge-title');
            const desc = document.getElementById('nudge-desc');
            const rec = document.getElementById('nudge-recommendation');
            
            if (overlay && title && desc && rec) {
                // Simulate SLM prompt generation based on combined contexts
                title.innerText = "Phi-3 Local Inference Generated";
                desc.innerText = "Context Fusion: High Simple Carbohydrates (Sourdough/Toast) + High Stress (Cortisol Spike). Risk of extreme glycemic variability.";
                rec.innerText = "SLM Nudge: Suggesting a 2-minute coherence breathing exercise to stabilize vagal tone before consumption.";
                
                overlay.classList.add('active');
            }
        }, 1500);
    }
});

// Exposed globally for the inline onclick handler in HTML
window.closeNudge = () => {
    const overlay = document.getElementById('nudge-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
};
