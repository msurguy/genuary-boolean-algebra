# Boolean Mask Compositor

A real-time 3D visualization tool that combines procedural patterns using boolean algebra operations, rendered as animated layered sculptures. Created for **[Genuary 2025](https://genuary.art/)** - January 7th prompt: **Boolean algebra**.

![Boolean Mask Compositor](https://img.shields.io/badge/Genuary_2025-Day_7-blue)

## Overview

This project explores boolean algebra through generative art by:
1. Generating two procedural noise patterns (Pattern A and Pattern B)
2. Combining them using boolean operations (AND, OR, XOR, NOT)
3. Rendering the result as a 3D layered sculpture with depth animation

The boolean operations treat pixel brightness as binary values (above/below threshold), creating striking geometric compositions where mathematical logic becomes visual art.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER INTERFACE                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ ┌───────────┐ ┌────────────┐ │
│  │  Pattern A  │ │  Pattern B  │ │ Operator │ │ Threshold │ │ 3D Settings│ │
│  │   Select    │ │   Select    │ │  Select  │ │  Slider   │ │   Panel    │ │
│  └──────┬──────┘ └──────┬──────┘ └────┬─────┘ └─────┬─────┘ └─────┬──────┘ │
└─────────┼───────────────┼─────────────┼─────────────┼─────────────┼────────┘
          │               │             │             │             │
          ▼               ▼             │             │             │
┌─────────────────────────────────────┐ │             │             │
│     PATTERN GENERATION (PixiJS)     │ │             │             │
│  ┌──────────────┐ ┌──────────────┐  │ │             │             │
│  │   Texture A  │ │   Texture B  │  │ │             │             │
│  │  (1024×1024) │ │  (1024×1024) │  │ │             │             │
│  └──────┬───────┘ └───────┬──────┘  │ │             │             │
│         │                 │         │ │             │             │
│         └────────┬────────┘         │ │             │             │
│                  ▼                  │ │             │             │
│  ┌────────────────────────────────┐ │ │             │             │
│  │    BOOLEAN SHADER (WebGL)      │◄┼─┼─────────────┘             │
│  │  ┌──────────────────────────┐  │ │ │                           │
│  │  │  Ab = step(threshold, A) │  │ │ │                           │
│  │  │  Bb = step(threshold, B) │  │ │ │                           │
│  │  │                          │  │◄┼─┘                           │
│  │  │  AND:   Ab * Bb          │  │ │                             │
│  │  │  OR:    max(Ab, Bb)      │  │ │                             │
│  │  │  XOR:   abs(Ab - Bb)     │  │ │                             │
│  │  │  NOT_A: 1.0 - Ab         │  │ │                             │
│  │  └──────────────────────────┘  │ │                             │
│  └──────────────┬─────────────────┘ │                             │
│                 │                   │                             │
│                 ▼                   │                             │
│  ┌────────────────────────────────┐ │                             │
│  │     Boolean Result Texture     │ │                             │
│  │         (1024×1024)            │ │                             │
│  └──────────────┬─────────────────┘ │                             │
└─────────────────┼───────────────────┘                             │
                  │                                                 │
                  ▼                                                 │
┌─────────────────────────────────────────────────────────────────┐ │
│               3D RENDERING (Three.js)                           │ │
│  ┌───────────────────────────────────────────────────────────┐  │ │
│  │                    LAYER STACK                            │  │ │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      ┌─────┐    │  │ │
│  │  │  0  │ │  1  │ │  2  │ │  3  │ │  4  │ ···  │  N  │    │  │ │
│  │  │front│ │     │ │     │ │     │ │     │      │back │    │  │ │
│  │  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘      └──┬──┘    │◄─┼─┘
│  │     │       │       │       │       │            │        │  │
│  │     ▼       ▼       ▼       ▼       ▼            ▼        │  │
│  │  Rolling texture update (each frame shifts textures back) │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │                  ANIMATION ENGINE                          │  │
│  │  Wave | Pulse | Cascade | Breathe | None                   │  │
│  │  - Per-layer Z offset animation                            │  │
│  │  - Alpha/opacity modulation                                │  │
│  │  - Scale pulsing effects                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌───────────────────────────▼───────────────────────────────┐  │
│  │               SHADER MATERIAL (per layer)                  │  │
│  │  - Tint color gradient (start → end)                       │  │
│  │  - Alpha falloff (depth fade)                              │  │
│  │  - Transparent black/white regions                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   OrbitControls                            │  │
│  │         Interactive 3D camera rotation/zoom                │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## How It Works

### 1. Pattern Generation

Two patterns are generated independently using GPU shaders via PixiJS. Available pattern types:

| Category | Patterns | Description |
|----------|----------|-------------|
| **Classic Noise** | Perlin, Simplex, Value | Traditional noise functions with FBM (fractal brownian motion) |
| **Advanced Noise** | Ridged, PingPong, Domain Warp | Complex noise variations for organic textures |
| **Cellular** | Voronoi | Cell-based patterns with multiple distance functions |
| **Procedural** | Flow Field, DLA | Algorithmic patterns (particle-based) |
| **Input** | Webcam | Live or snapshot camera input |

All noise patterns are powered by **FastNoiseLite** ported to GLSL shaders for real-time performance.

### 2. Boolean Operations

The core of this project - two grayscale patterns are combined using boolean logic:

```glsl
// Threshold converts continuous values to binary
float Ab = step(threshold, A.r);  // 1.0 if A >= threshold, else 0.0
float Bb = step(threshold, B.r);

// Boolean operations
AND:   Ab * Bb           // Intersection - only where BOTH are white
OR:    max(Ab, Bb)       // Union - where EITHER is white
XOR:   abs(Ab - Bb)      // Exclusive OR - where ONLY ONE is white
NOT_A: 1.0 - Ab          // Inversion of pattern A
```

The **threshold slider** controls the binary cutoff point, dramatically changing the visual output.

### 3. 3D Layer Extrusion

The boolean result is extruded into 3D space as a stack of textured planes:

- **Rolling Texture Update**: Each animation frame, the current pattern is pushed to the front layer, and all other layers shift backward (creating a temporal depth effect)
- **Alpha Falloff**: Layers fade in opacity as they recede
- **Tint Gradient**: Color can shift from front to back layers
- **Transparency**: Black and/or white regions can be made transparent for sculptural effects

### 4. Animation Modes

| Mode | Effect |
|------|--------|
| **Wave** | Sinusoidal Z-position oscillation through the stack |
| **Pulse** | Scale pulsing with phase offsets per layer |
| **Cascade** | Sequential wave with opacity modulation |
| **Breathe** | Organic expansion/contraction of layer spacing |
| **None** | Static layer positions |

## Project Structure

```
src/
├── main.js                 # Application entry point & UI orchestration
├── index.html              # UI layout and styling
├── booleanOps.js           # Boolean algebra shader implementation
├── threeScene.js           # Three.js scene setup (camera, lights, controls)
├── threeExtrude.js         # Layer stack creation & animation engine
├── patterns/
│   ├── noise.js            # Basic random noise
│   ├── perlin.js           # Perlin noise (FastNoiseLite)
│   ├── simplex.js          # Simplex noise (OpenSimplex2)
│   ├── voronoi.js          # Voronoi/Cellular patterns
│   ├── fastnoise.js        # Advanced noise types (Ridged, PingPong, etc.)
│   ├── flowfield.js        # Flow field particle system
│   ├── dla.js              # Diffusion-limited aggregation
│   └── webcam.js           # Webcam input handling
├── lib/
│   ├── fastnoiseShader.js  # FastNoiseLite GLSL shader wrapper
│   └── fastnoise.glsl      # FastNoiseLite port to GLSL
└── utils/
    └── noiseHelpers.js     # Noise utility functions
```

## Technology Stack

- **[PixiJS](https://pixijs.com/)** (v7) - 2D WebGL rendering for pattern generation and boolean shader
- **[Three.js](https://threejs.org/)** (v0.182) - 3D WebGL rendering for layered sculpture
- **[FastNoiseLite](https://github.com/Auburn/FastNoiseLite)** - Noise generation library (GLSL port)
- **[Vite](https://vitejs.dev/)** - Development server and build tool

## Getting Started

### Prerequisites

- Node.js 18+
- Modern browser with WebGL2 support

### Installation

```bash
# Clone the repository
git clone https://github.com/msurguy/genuary-boolean-algebra.git
cd genuary-boolean-algebra

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Building for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## Usage

1. **Select Pattern A** and **Pattern B** from the dropdowns
2. **Choose a Boolean Operator** (AND, OR, XOR, NOT A)
3. **Adjust the Threshold** to control the binary cutoff
4. **Tune Pattern Parameters** in the expandable sections
5. **Configure 3D Settings**:
   - Layer count and spacing
   - Alpha and falloff
   - Transparency for black/white regions
   - Tint colors
6. **Select Animation Mode** and adjust speed/amplitude
7. **Interact** - drag to rotate, scroll to zoom
8. **Export** - save the current view as PNG

## About Genuary

[Genuary](https://genuary.art/) is an annual event where artists create generative art every day in January based on community prompts. This project was created for:

> **January 7, 2025: Boolean algebra**

Boolean algebra - the mathematics of true/false, 1/0, on/off - forms the foundation of digital computation. This project visualizes boolean logic as art, turning abstract mathematical operations into tangible, sculptural forms.

## License

MIT License - feel free to use, modify, and share.

---

*Created with PixiJS, Three.js, and a passion for generative art.*
