import {
  CELLULAR_DISTANCE_FUNCTIONS,
  CELLULAR_RETURN_TYPES,
  FRACTAL_TYPES,
  NOISE_TYPES,
  renderFastNoise
} from "../lib/fastnoiseShader.js";

// Parameter definitions for UI
export const voronoiParams = {
  frequency: { label: "Frequency", min: 0.005, max: 0.1, step: 0.005, default: 0.02 },
  jitter: { label: "Jitter", min: 0, max: 2, step: 0.1, default: 1 },
  returnType: { label: "Return Type", min: 0, max: 6, step: 1, default: 1 },
  distFunc: { label: "Distance Func", min: 0, max: 3, step: 1, default: 0 },
  seed: { label: "Seed", min: 1, max: 9999, step: 1, default: 1337 }
};

// Return type options (shown as numbers in slider):
// 0: CellValue (flat colors per cell)
// 1: Distance (distance to nearest)
// 2: Distance2 (distance to 2nd nearest)
// 3: Distance2Add
// 4: Distance2Sub (creates interesting outlines)
// 5: Distance2Mul
// 6: Distance2Div

const RETURN_TYPES = [
  CELLULAR_RETURN_TYPES.CELLVALUE,
  CELLULAR_RETURN_TYPES.DISTANCE,
  CELLULAR_RETURN_TYPES.DISTANCE2,
  CELLULAR_RETURN_TYPES.DISTANCE2ADD,
  CELLULAR_RETURN_TYPES.DISTANCE2SUB,
  CELLULAR_RETURN_TYPES.DISTANCE2MUL,
  CELLULAR_RETURN_TYPES.DISTANCE2DIV
];

// Distance function options:
// 0: Euclidean (circles)
// 1: EuclideanSq (circles, faster)
// 2: Manhattan (diamonds)
// 3: Hybrid (mix)

const DIST_FUNCS = [
  CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEAN,
  CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEANSQ,
  CELLULAR_DISTANCE_FUNCTIONS.MANHATTAN,
  CELLULAR_DISTANCE_FUNCTIONS.HYBRID
];

export function generateVoronoi(app, renderTexture, params = {}) {
  const frequency = params.frequency ?? voronoiParams.frequency.default;
  const jitter = params.jitter ?? voronoiParams.jitter.default;
  const returnTypeIdx = Math.floor(params.returnType ?? voronoiParams.returnType.default);
  const distFuncIdx = Math.floor(params.distFunc ?? voronoiParams.distFunc.default);
  const seed = params.seed ?? voronoiParams.seed.default;

  renderFastNoise(app, renderTexture, {
    seed,
    frequency,
    noiseType: NOISE_TYPES.CELLULAR,
    fractalType: FRACTAL_TYPES.NONE,
    octaves: 1,
    lacunarity: 2.0,
    gain: 0.5,
    cellularJitter: jitter,
    cellularReturnType: RETURN_TYPES[returnTypeIdx] || RETURN_TYPES[1],
    cellularDistanceFunc: DIST_FUNCS[distFuncIdx] || DIST_FUNCS[0],
    blockSize: 4,
    contrast: 1
  });
}
