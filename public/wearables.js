// wearables.js - Simulates continuous PPG/ECG sync

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('wearableChart');
    if (!ctx) return;

    // Initialize an empty chart for live data
    const maxDataPoints = 50;
    const initialData = Array(maxDataPoints).fill(0);
    const labels = Array(maxDataPoints).fill('');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Simulated PPG Pulse',
                    data: [...initialData],
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                },
                {
                    label: 'Cortisol Proxy Baseline',
                    data: Array(maxDataPoints).fill(15),
                    borderColor: '#f97316',
                    borderDash: [5, 5],
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0 // Disable animation for performance with fast updates
            },
            interaction: {
                intersect: false
            },
            scales: {
                x: {
                    display: false // Hide x-axis to look like a continuous monitor
                },
                y: {
                    min: -20,
                    max: 40,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f8fafc'
                    }
                }
            }
        }
    });

    let time = 0;
    // Simulate real-time data feeding into the chart
    setInterval(() => {
        time += 0.1;

        // Generate a pseudo-realistic heartbeat pattern (PPG)
        // Combine a sine wave with some sharp peaks
        let ppg = Math.sin(time * 5) * 5; 
        
        // Add a "beat" peak occasionally
        if (Math.sin(time) > 0.95) {
            ppg += 20; 
        }

        // Add some noise
        ppg += (Math.random() - 0.5) * 3;

        // Simulate stress spike after 10 seconds (time > 10)
        let cortisolThreshold = 15;
        if (time > 10) {
            ppg += (time - 10); // Start trending upwards
            cortisolThreshold += (time - 10) * 0.5; // Baseline rises
        }

        // Update arrays
        chart.data.datasets[0].data.push(ppg);
        chart.data.datasets[0].data.shift();

        chart.data.datasets[1].data.push(cortisolThreshold);
        chart.data.datasets[1].data.shift();

        // Let Nudge Engine know if there's a problem
        if (cortisolThreshold > 25) {
            window.dispatchEvent(new Event('cortisolSpike'));
        }

        chart.update();
    }, 100); // Update 10 times a second
});
