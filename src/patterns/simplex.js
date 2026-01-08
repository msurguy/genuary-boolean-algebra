import { renderFastNoise, FRACTAL_TYPES, NOISE_TYPES } from "../lib/fastnoiseShader.js";

// Parameter definitions for UI (using OpenSimplex2 which is smoother)
export const simplexParams = {
  frequency: { label: "Frequency", min: 0.001, max: 0.05, step: 0.001, default: 0.008 },
  octaves: { label: "Octaves", min: 1, max: 8, step: 1, default: 4 },
  lacunarity: { label: "Lacunarity", min: 1, max: 4, step: 0.1, default: 2 },
  gain: { label: "Gain", min: 0.1, max: 1, step: 0.05, default: 0.5 },
  seed: { label: "Seed", min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateSimplex(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? simplexParams.frequency.default;
  const octaves = params.octaves ?? simplexParams.octaves.default;
  const lacunarity = params.lacunarity ?? simplexParams.lacunarity.default;
  const gain = params.gain ?? simplexParams.gain.default;
  const seed = params.seed ?? simplexParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    // OpenSimplex2 is the FastNoiseLite equivalent of Simplex noise
    noiseType: NOISE_TYPES.OPENSIMPLEX2,
    fractalType: FRACTAL_TYPES.FBM,
    octaves,
    lacunarity,
    gain,
    blockSize: 4,
    contrast: 1
  });
}
