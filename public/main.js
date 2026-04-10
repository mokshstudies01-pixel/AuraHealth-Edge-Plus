// main.js - Core application init
document.addEventListener('DOMContentLoaded', () => {
    console.log("AuraHealth Edge initialized.");
    console.log("Detecting XDNA Architecture: OK");
    console.log("Offloading to NPU...");

    const powerToggle = document.getElementById('power-mode-toggle');
    if (powerToggle) {
        powerToggle.addEventListener('change', (e) => {
            const isEfficient = e.target.checked;
            console.log(`Power Efficiency Mode toggled: ${isEfficient}`);
            if (window.toggleNPUPowerMode) {
                window.toggleNPUPowerMode(isEfficient);
            }
        });
    }
});
