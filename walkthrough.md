# AuraHealth Edge - AMD Slingshot Walkthrough

Welcome to the **AuraHealth Edge** execution guide. This document explains how the Proof-of-Concept demonstrates the raw potential of AMD's Ryzen™ AI hardware within a local inference, privacy-first Health/Nutrition platform.

## 1. Zero-Knowledge Architecture

The core tenet of AuraHealth Edge is **privacy**. By leveraging on-device model execution via `onnxruntime-web` combined with the Vitis™ AI Execution Provider, no PII (Personally Identifiable Information), biometric signals, or dietary camera feeds ever reach the cloud.

The simulation proves this architecture by utilizing a Web Worker (`public/npu_worker.js`), mapping dietary vision segmentation and PPG signal fusion directly through a simulated XDNA™ 2 Spatial Array.

## 2. Hardware Compatibility and Performance

Using the new UI dashboard, users can actively interact with our edge capabilities:
- **Toggling Power Efficiency Mode**: Activating this drops the NPU's power consumption dynamically, optimizing the active Compute Tiles and reducing thermal output. This perfectly mirrors the benefits of executing AI workloads on the NPU rather than the GPU/CPU.
- **Monitoring TOPS**: The telemetry dashboard displays real-time simulated TOPS (up to 50 TOPS per AMD Ryzen 400 series specifications).

## 3. The SLM Contextual "Nudge"

Rather than hardcoding notifications, the prototype simulates a localized Small Language Model (SLM), like a quantized Phi-3. When the biometric simulation catches a "Cortisol Spike" immediately alongside high-carbohydrate detection in the vision feed (e.g. Sourdough Toast), this simulated SLM generates custom physiological advice directly on the edge. You will see this output stating "Phi-3 Local Inference Generated".

## 4. Judging Criteria Addressed

1. **Innovation**: Fusing wearble PPG with visual inputs via an SLM (Small Language Model).
2. **Technical Feasibility**: Utilizing ONNX pipelines mapped to the AMD software stack.
3. **Business Viability**: A privacy-first edge app demands less cloud infrastructure, reducing scaling costs and guaranteeing HIPAA/GDPR compliance out-of-the-box.
