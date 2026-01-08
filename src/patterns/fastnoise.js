import {
  CELLULAR_DISTANCE_FUNCTIONS,
  CELLULAR_RETURN_TYPES,
  DOMAIN_WARP_TYPES,
  FRACTAL_TYPES,
  NOISE_TYPES,
  renderDomainWarpNoise,
  renderFastNoise
} from "../lib/fastnoiseShader.js";

// ============================================
// OpenSimplex2 Noise (smoother than Perlin)
// ============================================
export const openSimplex2Params = {
  frequency: { label: 'Frequency', min: 0.001, max: 0.05, step: 0.001, default: 0.01 },
  octaves: { label: 'Octaves', min: 1, max: 8, step: 1, default: 4 },
  lacunarity: { label: 'Lacunarity', min: 1, max: 4, step: 0.1, default: 2 },
  gain: { label: 'Gain', min: 0.1, max: 1, step: 0.05, default: 0.5 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateOpenSimplex2(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? openSimplex2Params.frequency.default;
  const octaves = params.octaves ?? openSimplex2Params.octaves.default;
  const lacunarity = params.lacunarity ?? openSimplex2Params.lacunarity.default;
  const gain = params.gain ?? openSimplex2Params.gain.default;
  const seed = params.seed ?? openSimplex2Params.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.OPENSIMPLEX2,
    fractalType: FRACTAL_TYPES.FBM,
    octaves,
    lacunarity,
    gain,
    blockSize: 4,
    contrast: 1
  });
}

// ============================================
// Ridged Noise (mountain-like)
// ============================================
export const ridgedParams = {
  frequency: { label: 'Frequency', min: 0.001, max: 0.05, step: 0.001, default: 0.008 },
  octaves: { label: 'Octaves', min: 1, max: 8, step: 1, default: 5 },
  lacunarity: { label: 'Lacunarity', min: 1, max: 4, step: 0.1, default: 2 },
  gain: { label: 'Gain', min: 0.1, max: 1, step: 0.05, default: 0.5 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateRidged(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? ridgedParams.frequency.default;
  const octaves = params.octaves ?? ridgedParams.octaves.default;
  const lacunarity = params.lacunarity ?? ridgedParams.lacunarity.default;
  const gain = params.gain ?? ridgedParams.gain.default;
  const seed = params.seed ?? ridgedParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.OPENSIMPLEX2,
    fractalType: FRACTAL_TYPES.RIDGED,
    octaves,
    lacunarity,
    gain,
    blockSize: 4,
    contrast: 1
  });
}

// ============================================
// Cellular/Voronoi Noise (enhanced)
// ============================================
export const cellularParams = {
  frequency: { label: 'Frequency', min: 0.005, max: 0.1, step: 0.005, default: 0.02 },
  jitter: { label: 'Jitter', min: 0, max: 2, step: 0.1, default: 1 },
  returnType: { label: 'Return Type', min: 0, max: 6, step: 1, default: 1 },
  distFunc: { label: 'Distance Func', min: 0, max: 3, step: 1, default: 0 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

const CELLULAR_RETURN_TYPE_VALUES = [
  CELLULAR_RETURN_TYPES.CELLVALUE,
  CELLULAR_RETURN_TYPES.DISTANCE,
  CELLULAR_RETURN_TYPES.DISTANCE2,
  CELLULAR_RETURN_TYPES.DISTANCE2ADD,
  CELLULAR_RETURN_TYPES.DISTANCE2SUB,
  CELLULAR_RETURN_TYPES.DISTANCE2MUL,
  CELLULAR_RETURN_TYPES.DISTANCE2DIV
];

const CELLULAR_DIST_FUNC_VALUES = [
  CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEAN,
  CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEANSQ,
  CELLULAR_DISTANCE_FUNCTIONS.MANHATTAN,
  CELLULAR_DISTANCE_FUNCTIONS.HYBRID
];

export function generateCellular(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? cellularParams.frequency.default;
  const jitter = params.jitter ?? cellularParams.jitter.default;
  const returnTypeIdx = Math.floor(params.returnType ?? cellularParams.returnType.default);
  const distFuncIdx = Math.floor(params.distFunc ?? cellularParams.distFunc.default);
  const seed = params.seed ?? cellularParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.CELLULAR,
    fractalType: FRACTAL_TYPES.NONE,
    octaves: 1,
    lacunarity: 2.0,
    gain: 0.5,
    cellularJitter: jitter,
    cellularReturnType: CELLULAR_RETURN_TYPE_VALUES[returnTypeIdx] || CELLULAR_RETURN_TYPE_VALUES[1],
    cellularDistanceFunc: CELLULAR_DIST_FUNC_VALUES[distFuncIdx] || CELLULAR_DIST_FUNC_VALUES[0],
    blockSize: 4,
    contrast: 1
  });
}

// ============================================
// Value Noise (blocky, retro feel)
// ============================================
export const valueNoiseParams = {
  frequency: { label: 'Frequency', min: 0.001, max: 0.05, step: 0.001, default: 0.01 },
  octaves: { label: 'Octaves', min: 1, max: 8, step: 1, default: 4 },
  lacunarity: { label: 'Lacunarity', min: 1, max: 4, step: 0.1, default: 2 },
  gain: { label: 'Gain', min: 0.1, max: 1, step: 0.05, default: 0.5 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateValueNoise(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? valueNoiseParams.frequency.default;
  const octaves = params.octaves ?? valueNoiseParams.octaves.default;
  const lacunarity = params.lacunarity ?? valueNoiseParams.lacunarity.default;
  const gain = params.gain ?? valueNoiseParams.gain.default;
  const seed = params.seed ?? valueNoiseParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.VALUE,
    fractalType: FRACTAL_TYPES.FBM,
    octaves,
    lacunarity,
    gain,
    blockSize: 4,
    contrast: 1
  });
}

// ============================================
// Domain Warped Noise (psychedelic/organic)
// ============================================
export const domainWarpParams = {
  frequency: { label: 'Frequency', min: 0.002, max: 0.03, step: 0.001, default: 0.008 },
  warpAmp: { label: 'Warp Amount', min: 10, max: 200, step: 10, default: 80 },
  octaves: { label: 'Octaves', min: 1, max: 6, step: 1, default: 3 },
  lacunarity: { label: 'Lacunarity', min: 1, max: 4, step: 0.1, default: 2 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateDomainWarp(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? domainWarpParams.frequency.default;
  const warpAmp = params.warpAmp ?? domainWarpParams.warpAmp.default;
  const octaves = params.octaves ?? domainWarpParams.octaves.default;
  const lacunarity = params.lacunarity ?? domainWarpParams.lacunarity.default;
  const seed = params.seed ?? domainWarpParams.seed.default;

  renderDomainWarpNoise(app, renderTexture, {
    seed,
    frequency,
    warpAmp,
    octaves,
    lacunarity,
    warpFractalType: FRACTAL_TYPES.DOMAIN_WARP_PROGRESSIVE,
    domainWarpType: DOMAIN_WARP_TYPES.OPENSIMPLEX2,
    noiseType: NOISE_TYPES.OPENSIMPLEX2,
    baseFrequencyMult: 2.0,
    blockSize: 4,
    contrast: 1
  });
}

// ============================================
// PingPong Noise (organic patterns)
// ============================================
export const pingPongParams = {
  frequency: { label: 'Frequency', min: 0.002, max: 0.03, step: 0.001, default: 0.01 },
  octaves: { label: 'Octaves', min: 1, max: 8, step: 1, default: 4 },
  pingPongStrength: { label: 'PingPong Str', min: 0.5, max: 4, step: 0.1, default: 2 },
  lacunarity: { label: 'Lacunarity', min: 1, max: 4, step: 0.1, default: 2 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generatePingPong(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? pingPongParams.frequency.default;
  const octaves = params.octaves ?? pingPongParams.octaves.default;
  const pingPongStrength = params.pingPongStrength ?? pingPongParams.pingPongStrength.default;
  const lacunarity = params.lacunarity ?? pingPongParams.lacunarity.default;
  const seed = params.seed ?? pingPongParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.OPENSIMPLEX2,
    fractalType: FRACTAL_TYPES.PINGPONG,
    octaves,
    lacunarity,
    gain: 0.5,
    pingPongStrength,
    blockSize: 4,
    contrast: 1
  });
}
