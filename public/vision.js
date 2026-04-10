// vision.js - Simulates Real-Time Semantic Segmentation

document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');
    const latencyEl = document.getElementById('vision-latency');

    // Simulate bounding boxes for a meal
    const foods = [
        { name: "Avocado", x: 20, y: 30, width: 25, height: 35, color: "#10b981" },
        { name: "Poached Egg", x: 50, y: 40, width: 20, height: 25, color: "#f59e0b" },
        { name: "Sourdough Toast", x: 35, y: 50, width: 40, height: 40, color: "#d97706" }
    ];

    // Wait a brief moment, then draw the boxes to simulate processing delay
    setTimeout(() => {
        foods.forEach((food, index) => {
            setTimeout(() => {
                const box = document.createElement('div');
                box.className = 'bounding-box';
                box.style.left = food.x + '%';
                box.style.top = food.y + '%';
                box.style.width = food.width + '%';
                box.style.height = food.height + '%';
                box.style.borderColor = food.color;

                const label = document.createElement('div');
                label.className = 'bounding-label';
                label.style.backgroundColor = food.color;
                label.innerText = food.name;

                box.appendChild(label);
                cameraFeed.appendChild(box);
            }, index * 400); // Draw boxes sequentially
        });
    }, 1000);

    // Simulate fluctuating NPU latency between 35ms and 45ms
    setInterval(() => {
        const jitter = Math.floor(Math.random() * 10);
        latencyEl.innerText = 35 + jitter;
    }, 1500);
});
