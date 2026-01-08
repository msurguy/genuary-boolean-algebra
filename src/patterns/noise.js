import { renderFastNoise, FRACTAL_TYPES, NOISE_TYPES } from "../lib/fastnoiseShader.js";

// Parameter definitions for UI
export const noiseParams = {
  blockSize: { label: "Block Size", min: 1, max: 16, step: 1, default: 4 },
  contrast: { label: "Contrast", min: 0.5, max: 2, step: 0.1, default: 1 }
};

export function generateNoise(app, renderTexture, params = {}) {
  const blockSize = params.blockSize ?? noiseParams.blockSize.default;
  const contrast = params.contrast ?? noiseParams.contrast.default;
  const seed = Math.floor(Math.random() * 100000);
  const frequency = 1 / Math.max(1, blockSize);

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.VALUE,
    fractalType: FRACTAL_TYPES.NONE,
    octaves: 1,
    lacunarity: 2.0,
    gain: 0.5,
    blockSize,
    contrast
  });
}
