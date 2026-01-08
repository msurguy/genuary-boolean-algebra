import { renderFastNoise, FRACTAL_TYPES, NOISE_TYPES } from "../lib/fastnoiseShader.js";

// Parameter definitions for UI
export const perlinParams = {
  frequency: { label: "Frequency", min: 0.001, max: 0.05, step: 0.001, default: 0.008 },
  octaves: { label: "Octaves", min: 1, max: 8, step: 1, default: 4 },
  lacunarity: { label: "Lacunarity", min: 1, max: 4, step: 0.1, default: 2 },
  gain: { label: "Gain", min: 0.1, max: 1, step: 0.05, default: 0.5 },
  seed: { label: "Seed", min: 1, max: 9999, step: 1, default: 1337 }
};

export function generatePerlin(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? perlinParams.frequency.default;
  const octaves = params.octaves ?? perlinParams.octaves.default;
  const lacunarity = params.lacunarity ?? perlinParams.lacunarity.default;
  const gain = params.gain ?? perlinParams.gain.default;
  const seed = params.seed ?? perlinParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.PERLIN,
    fractalType: FRACTAL_TYPES.FBM,
    octaves,
    lacunarity,
    gain,
    blockSize: 4,
    contrast: 1
  });
}
