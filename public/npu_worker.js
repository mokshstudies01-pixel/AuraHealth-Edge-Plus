// npu_worker.js - Simulates AMD XDNA 2 Spatial Array Architecture & Offloaded Execution

// Worker Settings
let isPowerEfficiencyMode = true; 

self.onmessage = (e) => {
    const { type, payload } = e.data;
    
    if (type === 'TOGGLE_POWER_MODE') {
        isPowerEfficiencyMode = payload.mode;
    }
};

// Simulate NPU Telemetry Cycle
setInterval(() => {
    // 1. MAC Units & Compute Tile Layout (XDNA 2 feature: dynamic tile allocation)
    // If running in efficient mode, we use fewer active tiles, lower clock.
    // If performance mode, we saturate MAC units.
    
    // Simulate up to 50 TOPS max hardware
    const maxTOPS = 50.0;
    let baselineTOPS = isPowerEfficiencyMode ? 12.5 : 42.0;
    
    // Add realistic jitter
    let currentTOPS = baselineTOPS + (Math.random() * 3.0);
    
    // Compute Tiles (Simulating 32 available tiles)
    const totalTiles = 32;
    // Power efficient uses ~40% of tiles, performance uses ~85%
    let activeTiles = Math.floor(totalTiles * (isPowerEfficiencyMode ? 0.4 : 0.85)) + Math.floor(Math.random() * 2);
    
    // MAC Unit utilization (XDNA 2 Spatial Dataflow)
    let macUtil = isPowerEfficiencyMode ? 45 + (Math.random() * 10) : 88 + (Math.random() * 8);

    // 2. Power and Thermal Modeling
    // In efficient mode, simulating 30% reduction in package power vs base CPU inference
    // Baseline CPU power is simulated at ~15W for this task. NPU brings it way down.
    
    // Power Draw (Watts)
    let packagePower = isPowerEfficiencyMode ? 1.4 + (Math.random() * 0.3) : 3.8 + (Math.random() * 0.8);
    
    // Core Temperature (Degrees C)
    let coreTemp = isPowerEfficiencyMode ? 41.2 + (Math.random() * 1.5) : 55.4 + (Math.random() * 2.5);

    // 3. Inference Latency (Food scanning)
    // Between 30ms and 80ms based on mode/complexity (simulating ViT segmentation)
    let inferenceLatency = isPowerEfficiencyMode ? 65 + Math.floor(Math.random() * 15) : 32 + Math.floor(Math.random() * 8);

    // Data payload back to main thread
    self.postMessage({
        type: 'TELEMETRY_TICK',
        payload: {
            tops: currentTOPS.toFixed(1),
            maxTOPS: maxTOPS,
            activeTiles: activeTiles,
            totalTiles: totalTiles,
            macUtil: macUtil.toFixed(1),
            packagePower: packagePower.toFixed(2),
            coreTemp: coreTemp.toFixed(1),
            latency: inferenceLatency
        }
    });

}, 800);
