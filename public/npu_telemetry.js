// npu_telemetry.js - Simulated NPU metrics via Web Worker

let npuWorker;

document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const macUtil = document.getElementById('mac-util');
    const powerDraw = document.getElementById('power-draw');
    const coreTemp = document.getElementById('core-temp');
    const activeTiles = document.getElementById('active-tiles');
    const currentTops = document.getElementById('current-tops');
    const latencyBase = document.getElementById('latency-base'); // Exists in HTML, we will overwrite or keep
    const visionLatency = document.getElementById('vision-latency'); // Found in vision module

    // Initialize Web Worker for simulated hardware bridge
    if (window.Worker) {
        npuWorker = new Worker('npu_worker.js');

        npuWorker.onmessage = function(e) {
            const data = e.data;
            if (data.type === 'TELEMETRY_TICK') {
                const payload = data.payload;

                // Update UI elements with data from the worker
                if (macUtil) macUtil.innerText = payload.macUtil + '%';
                if (powerDraw) powerDraw.innerText = payload.packagePower + ' W';
                if (coreTemp) coreTemp.innerText = payload.coreTemp + ' °C';
                
                // Show XDNA 2 Compute Tiles count
                if (activeTiles) activeTiles.innerText = `${payload.activeTiles} / ${payload.totalTiles}`;
                
                // Real-time TOPS
                if (currentTops) currentTops.innerText = `${payload.tops} TOPS`;

                // Update Vision Inference Latency if it exists
                if (visionLatency) visionLatency.innerText = payload.latency;
                if (latencyBase) latencyBase.innerText = payload.latency + ' ms';
                
                // Dispatch event so Nudge logic knows vision data was processed
                window.dispatchEvent(new CustomEvent('visionProcessed', { detail: { latency: payload.latency } }));
            }
        };

        // Export toggle function to the global scope so main.js can call it
        window.toggleNPUPowerMode = (isEfficient) => {
            npuWorker.postMessage({ type: 'TOGGLE_POWER_MODE', payload: { mode: isEfficient } });
        };
        
        // Start out in Power Efficiency mode as default
        window.toggleNPUPowerMode(true);
    } else {
        console.warn("Web Workers not supported. NPU Simulation degraded.");
    }
});
