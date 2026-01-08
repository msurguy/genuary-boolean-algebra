import * as PIXI from "pixi.js";
import fastnoiseGLSL from "./fastnoise.glsl?raw";

export const NOISE_TYPES = Object.freeze({
  OPENSIMPLEX2: 0,
  OPENSIMPLEX2S: 1,
  CELLULAR: 2,
  PERLIN: 3,
  VALUE_CUBIC: 4,
  VALUE: 5
});

export const FRACTAL_TYPES = Object.freeze({
  NONE: 0,
  FBM: 1,
  RIDGED: 2,
  PINGPONG: 3,
  DOMAIN_WARP_PROGRESSIVE: 4,
  DOMAIN_WARP_INDEPENDENT: 5
});

export const CELLULAR_DISTANCE_FUNCTIONS = Object.freeze({
  EUCLIDEAN: 0,
  EUCLIDEANSQ: 1,
  MANHATTAN: 2,
  HYBRID: 3
});

export const CELLULAR_RETURN_TYPES = Object.freeze({
  CELLVALUE: 0,
  DISTANCE: 1,
  DISTANCE2: 2,
  DISTANCE2ADD: 3,
  DISTANCE2SUB: 4,
  DISTANCE2MUL: 5,
  DISTANCE2DIV: 6
});

export const DOMAIN_WARP_TYPES = Object.freeze({
  OPENSIMPLEX2: 0,
  OPENSIMPLEX2_REDUCED: 1,
  BASICGRID: 2
});

const FILTER_VERTEX = `#version 300 es
precision highp float;

in vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform vec4 inputSize;
uniform vec4 outputFrame;

out vec2 vTextureCoord;

vec4 filterVertexPosition() {
  vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.0)) + outputFrame.xy;
  return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord() {
  return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void) {
  gl_Position = filterVertexPosition();
  vTextureCoord = filterTextureCoord();
}
`;

const BASE_FRAGMENT = `#version 300 es
precision mediump float;
precision mediump int;

in vec2 vTextureCoord;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uBlockSize;
uniform float uContrast;
uniform int uSeed;
uniform int uNoiseType;
uniform int uFractalType;
uniform int uOctaves;
uniform float uFrequency;
uniform float uLacunarity;
uniform float uGain;
uniform float uWeightedStrength;
uniform float uPingPongStrength;
uniform int uCellularDistanceFunc;
uniform int uCellularReturnType;
uniform float uCellularJitter;

${fastnoiseGLSL}

void main() {
  vec2 pixel = vTextureCoord * uResolution;
  float blockSize = max(1.0, uBlockSize);
  vec2 samplePos = floor(pixel / blockSize) * blockSize;

  fnl_state state = fnlCreateState(uSeed);
  state.frequency = uFrequency;
  state.noise_type = uNoiseType;
  state.fractal_type = uFractalType;
  state.octaves = uOctaves;
  state.lacunarity = uLacunarity;
  state.gain = uGain;
  state.weighted_strength = uWeightedStrength;
  state.ping_pong_strength = uPingPongStrength;
  state.cellular_distance_func = uCellularDistanceFunc;
  state.cellular_return_type = uCellularReturnType;
  state.cellular_jitter_mod = uCellularJitter;

  float n = fnlGetNoise2D(state, samplePos.x, samplePos.y);
  float v = (n + 1.0) * 0.5;
  v = (v - 0.5) * uContrast + 0.5;
  v = clamp(v, 0.0, 1.0);
  fragColor = vec4(vec3(v), 1.0);
}
`;

const DOMAIN_WARP_FRAGMENT = `#version 300 es
precision mediump float;
precision mediump int;

in vec2 vTextureCoord;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uBlockSize;
uniform float uContrast;
uniform int uSeed;
uniform float uFrequency;
uniform float uWarpAmp;
uniform int uWarpFractalType;
uniform int uWarpOctaves;
uniform float uWarpLacunarity;
uniform float uWarpGain;
uniform int uDomainWarpType;
uniform int uNoiseType;
uniform float uBaseFrequencyMult;

${fastnoiseGLSL}

void main() {
  vec2 pixel = vTextureCoord * uResolution;
  float blockSize = max(1.0, uBlockSize);
  vec2 samplePos = floor(pixel / blockSize) * blockSize;

  fnl_state warp = fnlCreateState(uSeed);
  warp.frequency = uFrequency;
  warp.domain_warp_type = uDomainWarpType;
  warp.domain_warp_amp = uWarpAmp;
  warp.fractal_type = uWarpFractalType;
  warp.octaves = uWarpOctaves;
  warp.lacunarity = uWarpLacunarity;
  warp.gain = uWarpGain;

  FNLfloat wx = samplePos.x;
  FNLfloat wy = samplePos.y;
  fnlDomainWarp2D(warp, wx, wy);

  fnl_state base = fnlCreateState(uSeed + 1);
  base.frequency = uFrequency * uBaseFrequencyMult;
  base.noise_type = uNoiseType;

  float n = fnlGetNoise2D(base, wx, wy);
  float v = (n + 1.0) * 0.5;
  v = (v - 0.5) * uContrast + 0.5;
  v = clamp(v, 0.0, 1.0);
  fragColor = vec4(vec3(v), 1.0);
}
`;

let baseFilter = null;
let domainWarpFilter = null;
let filterVersion = null;

function getFilters(app) {
  const glVersion = app.renderer.context.webGLVersion;
  if (glVersion !== 2) {
    return null;
  }

  if (baseFilter && domainWarpFilter && filterVersion === glVersion) {
    return { baseFilter, domainWarpFilter };
  }

  baseFilter = new PIXI.Filter(FILTER_VERTEX, BASE_FRAGMENT, {
    uResolution: [1, 1],
    uBlockSize: 1,
    uContrast: 1,
    uSeed: 1337,
    uNoiseType: NOISE_TYPES.OPENSIMPLEX2,
    uFractalType: FRACTAL_TYPES.NONE,
    uOctaves: 1,
    uFrequency: 0.01,
    uLacunarity: 2.0,
    uGain: 0.5,
    uWeightedStrength: 0.0,
    uPingPongStrength: 2.0,
    uCellularDistanceFunc: CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEANSQ,
    uCellularReturnType: CELLULAR_RETURN_TYPES.DISTANCE,
    uCellularJitter: 1.0
  });

  domainWarpFilter = new PIXI.Filter(FILTER_VERTEX, DOMAIN_WARP_FRAGMENT, {
    uResolution: [1, 1],
    uBlockSize: 1,
    uContrast: 1,
    uSeed: 1337,
    uFrequency: 0.01,
    uWarpAmp: 1.0,
    uWarpFractalType: FRACTAL_TYPES.DOMAIN_WARP_PROGRESSIVE,
    uWarpOctaves: 3,
    uWarpLacunarity: 2.0,
    uWarpGain: 0.5,
    uDomainWarpType: DOMAIN_WARP_TYPES.OPENSIMPLEX2,
    uNoiseType: NOISE_TYPES.OPENSIMPLEX2,
    uBaseFrequencyMult: 2.0
  });

  filterVersion = glVersion;

  return { baseFilter, domainWarpFilter };
}

const quad = new PIXI.Sprite(PIXI.Texture.WHITE);

function renderWithFilter(app, renderTexture, filter) {
  const width = renderTexture.width;
  const height = renderTexture.height;

  filter.uniforms.uResolution = [width, height];
  quad.width = width;
  quad.height = height;
  quad.filters = [filter];

  app.renderer.render(quad, { renderTexture, clear: true });

  quad.filters = null;
}

export function renderFastNoise(app, renderTexture, settings = {}) {
  const filters = getFilters(app);
  if (!filters) {
    console.warn("FastNoise shader requires WebGL2.");
    return;
  }

  const uniforms = filters.baseFilter.uniforms;

  uniforms.uBlockSize = Math.max(1, settings.blockSize ?? 1);
  uniforms.uContrast = settings.contrast ?? 1;
  uniforms.uSeed = Math.floor(settings.seed ?? 1337);
  uniforms.uNoiseType = settings.noiseType ?? NOISE_TYPES.OPENSIMPLEX2;
  uniforms.uFractalType = settings.fractalType ?? FRACTAL_TYPES.NONE;
  uniforms.uOctaves = Math.max(1, Math.floor(settings.octaves ?? 1));
  uniforms.uFrequency = settings.frequency ?? 0.01;
  uniforms.uLacunarity = settings.lacunarity ?? 2.0;
  uniforms.uGain = settings.gain ?? 0.5;
  uniforms.uWeightedStrength = settings.weightedStrength ?? 0.0;
  uniforms.uPingPongStrength = settings.pingPongStrength ?? 2.0;
  uniforms.uCellularDistanceFunc =
    settings.cellularDistanceFunc ?? CELLULAR_DISTANCE_FUNCTIONS.EUCLIDEANSQ;
  uniforms.uCellularReturnType =
    settings.cellularReturnType ?? CELLULAR_RETURN_TYPES.DISTANCE;
  uniforms.uCellularJitter = settings.cellularJitter ?? 1.0;

  renderWithFilter(app, renderTexture, filters.baseFilter);
}

export function renderDomainWarpNoise(app, renderTexture, settings = {}) {
  const filters = getFilters(app);
  if (!filters) {
    console.warn("FastNoise shader requires WebGL2.");
    return;
  }

  const uniforms = filters.domainWarpFilter.uniforms;

  uniforms.uBlockSize = Math.max(1, settings.blockSize ?? 1);
  uniforms.uContrast = settings.contrast ?? 1;
  uniforms.uSeed = Math.floor(settings.seed ?? 1337);
  uniforms.uFrequency = settings.frequency ?? 0.01;
  uniforms.uWarpAmp = settings.warpAmp ?? 1.0;
  uniforms.uWarpFractalType =
    settings.warpFractalType ?? FRACTAL_TYPES.DOMAIN_WARP_PROGRESSIVE;
  uniforms.uWarpOctaves = Math.max(1, Math.floor(settings.octaves ?? 3));
  uniforms.uWarpLacunarity = settings.lacunarity ?? 2.0;
  uniforms.uWarpGain = settings.gain ?? 0.5;
  uniforms.uDomainWarpType = settings.domainWarpType ?? DOMAIN_WARP_TYPES.OPENSIMPLEX2;
  uniforms.uNoiseType = settings.noiseType ?? NOISE_TYPES.OPENSIMPLEX2;
  uniforms.uBaseFrequencyMult = settings.baseFrequencyMult ?? 2.0;

  renderWithFilter(app, renderTexture, filters.domainWarpFilter);
}
