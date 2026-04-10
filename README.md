# AuraHealth Edge 

**AuraHealth Edge** is an AI-powered, privacy-first health and metabolic application designed exclusively for the edge. By utilizing continuous biometric streams alongside computer vision dietary analysis, AuraHealth delivers micro-interventions using on-device Small Language Models (SLMs).

This project was built as a Proof-of-Concept for the **AMD Slingshot Ideathon**, proving out advanced edge-inference workloads targeting the Ryzen AI hardware.

## Features

- **Semantic Dietary Capture**: Simulates processing local video streams through a quantized Vision Transformer (ViT) architecture to extrapolate macronutrients without sending images to the cloud.
- **Biometric Integration & SLM Intelligence**: Uses a Web Worker to simulate a 30-80ms real-time inferencing loop. It monitors patterns like a "Cortisol Spike" immediately proceeding high sugar intake and outputs customized mitigation strategies.
- **Micro-Intervention Nudge Engine**: A localized SLM prototype mimicking quantized Phi-3 context reasoning. 

## AMD Software Stack Integration

AuraHealth Edge is optimized to deploy directly into the AMD Ryzen AI Ecosystem.

A production build of this application utilizes the full **Ryzen™ AI Software Stack**:
1. **Model Preparation**: Weights are quantized from FP32 to INT8/INT4 using the Vitis AI Quantizer, keeping memory footprints minimal.
2. **Execution Context**: We utilize the `onnxruntime-web` to simulate the interaction. In production, this targets the **Vitis™ AI Execution Provider (EP)** to directly offload math operations to the XDNA™ 2 Spatial Array.
3. **Driver Optimization**: Leveraging Ryzen AI Software v1.2+, the compute logic partitions the MAC units dynamically, isolating AI tasks away from the CPU, drastically lowering total system TDP limit requirements.
4. **Local Hardware Security**: Eliminating the cloud transit time enables true "Zero Knowledge" health processing, vital for HIPAA compliance while still utilizing state of the art SLMs.

## Running the Project

To maintain execution speed and zero installation overhead during judging, this project currently simulates the NPU hardware logic entirely within isolated Web Workers, mimicking the exact power, clock gating, compute tile allocation, and INT8 base latency parameters of an AMD Ryzen AI NPU.

Simply launch the `public/index.html` file using your preferred local server (e.g., Live Server, or Python's `http.server`) to access the dashboard.
