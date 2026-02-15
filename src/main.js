import * as PIXI from "pixi.js";
import FontPicker from "fontpicker/dist/fontpicker.min.js";
import "./fontpicker.css";
import { generateNoise, noiseParams } from "./patterns/noise.js";
import { generateVoronoi, voronoiParams } from "./patterns/voronoi.js";
import { generatePerlin, perlinParams } from "./patterns/perlin.js";
import { generateSimplex, simplexParams } from "./patterns/simplex.js";
import { generateFlowfield, flowfieldParams } from "./patterns/flowfield.js";
import { generateDLA, dlaParams } from "./patterns/dla.js";
import { initWebcam, renderWebcamToTexture, stopWebcam, isWebcamActive } from "./patterns/webcam.js";
import {
  ensureTextFontLoaded,
  generateText,
  initTextFontCatalog,
  textParams
} from "./patterns/text.js";
import { applyBoolean } from "./booleanOps.js";

// FastNoise-based patterns
import {
  generateRidged, ridgedParams,
  generateValueNoise, valueNoiseParams,
  generateDomainWarp, domainWarpParams,
  generatePingPong, pingPongParams
} from "./patterns/fastnoise.js";

// Three.js integration
import { initThreeScene, resizeThreeScene } from "./threeScene.js";
import {
  createLayerStack,
  animateLayers,
  setAnimationSettings,
  pushNewTexture
} from "./threeExtrude.js";

// Create PIXI app (hidden - used only for texture generation)
const app = new PIXI.Application({
  width: 1024,
  height: 1024,
  backgroundColor: 0x000000
});
app.view.style.display = 'none';
document.body.appendChild(app.view);

// Render textures
let texA = PIXI.RenderTexture.create({ width: 1024, height: 1024 });
let texB = PIXI.RenderTexture.create({ width: 1024, height: 1024 });
let boolTex = PIXI.RenderTexture.create({ width: 1024, height: 1024 });

// Initialize Three.js scene
const { scene, camera, renderer, controls } = initThreeScene(document.body);

// Handle window resize
window.addEventListener('resize', () => {
  resizeThreeScene();
});

// Prevent OrbitControls from interfering with UI
const controlsEl = document.getElementById('controls');
if (controlsEl) {
  controlsEl.addEventListener('mousedown', (e) => e.stopPropagation());
  controlsEl.addEventListener('touchstart', (e) => e.stopPropagation());
  controlsEl.addEventListener('wheel', (e) => e.stopPropagation());
}

// UI elements
const patternAEl = document.getElementById("patternA");
const patternBEl = document.getElementById("patternB");
const operatorEl = document.getElementById("operator");
const thresholdEl = document.getElementById("threshold");
const thresholdValueEl = document.getElementById("thresholdValue");
const operatorHintEl = document.getElementById("operatorHint");
const webcamModeEl = document.getElementById("webcamMode");
const webcamModeWrap = document.getElementById("webcamModeWrap");
const exportBtn = document.getElementById("export");
const regenerateBtn = document.getElementById("regenerate");
const captureWebcamBtn = document.getElementById("captureWebcam");
const loadingEl = document.getElementById("loading");
const paramsAContent = document.getElementById("paramsAContent");
const paramsBContent = document.getElementById("paramsBContent");
const paramsExtrudeContent = document.getElementById("paramsExtrudeContent");
const params3DContent = document.getElementById("params3DContent");

// Pattern generators registry with their parameter definitions
const PATTERN_CONFIG = {
  // Basic patterns
  noise: { generator: generateNoise, params: noiseParams, mode: "shader" },

  // Standard noise types (FastNoiseLite-powered)
  perlin: { generator: generatePerlin, params: perlinParams, mode: "shader" },
  simplex: { generator: generateSimplex, params: simplexParams, mode: "shader" },
  voronoi: { generator: generateVoronoi, params: voronoiParams, mode: "shader" },

  // Advanced noise types (FastNoiseLite-powered)
  ridged: { generator: generateRidged, params: ridgedParams, mode: "shader" },
  value: { generator: generateValueNoise, params: valueNoiseParams, mode: "shader" },
  domainwarp: { generator: generateDomainWarp, params: domainWarpParams, mode: "shader" },
  pingpong: { generator: generatePingPong, params: pingPongParams, mode: "shader" },

  // Procedural patterns
  flowfield: { generator: generateFlowfield, params: flowfieldParams },
  dla: { generator: generateDLA, params: dlaParams },

  // Dynamic input
  text: { generator: generateText, params: textParams, mode: "direct" },
  webcam: { generator: null, params: null }
};

const extrudeParams = {
  layers: { label: "Layers", min: 1, max: 200, step: 1, default: 60 },
  layerSpacing: { label: "Layer Spacing", min: 0.01, max: 0.3, step: 0.01, default: 0.05 },
  alpha: { label: "Alpha", min: 0, max: 1, step: 0.01, default: 1 },
  alphaFalloff: { label: "Alpha Falloff", min: 0.5, max: 1, step: 0.01, default: 0.95 },
  transparentBlack: { label: "Transparent Black", type: "boolean", default: true },
  blackThreshold: { label: "Black Threshold", min: 0, max: 0.5, step: 0.01, default: 0.1 },
  transparentWhite: { label: "Transparent White", type: "boolean", default: false },
  whiteThreshold: { label: "White Threshold", min: 0.5, max: 1, step: 0.01, default: 0.9 },
  tintStartR: { label: "Tint Start R", min: 0, max: 255, step: 1, default: 219 },
  tintStartG: { label: "Tint Start G", min: 0, max: 255, step: 1, default: 169 },
  tintStartB: { label: "Tint Start B", min: 0, max: 255, step: 1, default: 255 },
  tintEndR: { label: "Tint End R", min: 0, max: 255, step: 1, default: 130 },
  tintEndG: { label: "Tint End G", min: 0, max: 255, step: 1, default: 193 },
  tintEndB: { label: "Tint End B", min: 0, max: 255, step: 1, default: 94 }
};

const animation3DParams = {
  animSpeed: { label: "Animation Speed", min: 0.1, max: 3, step: 0.1, default: 1 },
  animAmplitude: { label: "Animation Amplitude", min: 0.01, max: 0.3, step: 0.01, default: 0.1 }
};

// Current parameter values for each pattern slot
const currentParamsA = {};
const currentParamsB = {};
const currentExtrudeParams = {};
const current3DParams = { animSpeed: 1, animAmplitude: 0.1 };
let currentAnimMode = 'wave';
let currentWebcamMode = webcamModeEl ? webcamModeEl.value : 'snapshot';
let webcamCapturePending = false;
const fontPickersByContainer = new WeakMap();
const FONT_PICKER_DEFAULT_FAMILY = "Arial";
const LEGACY_FONT_NAME_MAP = {
  "System Sans": FONT_PICKER_DEFAULT_FAMILY
};

// Operator hints
const OPERATOR_HINTS = {
  AND: "Intersection - precise, sparse",
  OR: "Union - bold, maximal",
  XOR: "Difference - edges, lace patterns",
  NOT_A: "Invert pattern A"
};

// Show/hide loading indicator
function showLoading(show) {
  loadingEl.style.display = show ? "block" : "none";
}

function isWebcamUsed() {
  return patternAEl.value === "webcam" || patternBEl.value === "webcam";
}

// Update webcam button visibility
function updateWebcamButtonVisibility() {
  const webcamUsed = isWebcamUsed();

  if (webcamModeWrap) {
    webcamModeWrap.style.display = webcamUsed ? "flex" : "none";
  }

  captureWebcamBtn.style.display =
    webcamUsed && currentWebcamMode === "snapshot" ? "block" : "none";

  // Stop webcam if not used
  if (!webcamUsed && isWebcamActive()) {
    stopWebcam();
  }
}

// Update operator hint text
function updateOperatorHint() {
  operatorHintEl.textContent = OPERATOR_HINTS[operatorEl.value] || "";
}

function normalizeFontForPicker(fontName) {
  const normalized = String(fontName ?? "").trim();
  if (!normalized) {
    return FONT_PICKER_DEFAULT_FAMILY;
  }

  return LEGACY_FONT_NAME_MAP[normalized] || normalized;
}

// Build parameter UI for a pattern
function buildParamsUI(patternType, container, currentParams, onChange) {
  const existingPickers = fontPickersByContainer.get(container);
  if (existingPickers) {
    existingPickers.forEach((picker) => {
      try {
        picker.destroy();
      } catch {
        // Ignore cleanup errors from detached instances.
      }
    });
    fontPickersByContainer.delete(container);
  }

  container.innerHTML = "";
  const config = PATTERN_CONFIG[patternType];

  if (!config || !config.params) {
    return;
  }

  buildParamSliders(config.params, container, currentParams, onChange);
}

function buildParamSliders(paramDefs, container, currentParams, onChange) {
  for (const [key, def] of Object.entries(paramDefs)) {
    if (currentParams[key] === undefined) {
      currentParams[key] = def.default;
    }

    const label = document.createElement("label");

    const labelText = document.createTextNode(def.label + ":");
    label.appendChild(labelText);

    if (def.type === "boolean") {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = Boolean(currentParams[key]);
      input.dataset.paramKey = key;

      const valueSpan = document.createElement("span");
      valueSpan.className = "param-value";
      valueSpan.textContent = input.checked ? "On" : "Off";

      input.addEventListener("change", () => {
        const val = input.checked;
        currentParams[key] = val;
        valueSpan.textContent = val ? "On" : "Off";
        onChange();
      });

      label.appendChild(input);
      label.appendChild(valueSpan);
      container.appendChild(label);
      continue;
    }

    if (def.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = String(currentParams[key] ?? "");
      input.dataset.paramKey = key;
      input.maxLength = def.maxLength ?? 120;

      input.addEventListener("input", () => {
        const sanitized = input.value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ");
        if (sanitized !== input.value) {
          input.value = sanitized;
        }
        currentParams[key] = sanitized;
        onChange();
      });

      label.appendChild(input);
      container.appendChild(label);
      continue;
    }

    if (def.type === "select") {
      const input = document.createElement("select");
      const options = Array.isArray(def.options) ? def.options : [];

      options.forEach((optionDef) => {
        const option = document.createElement("option");
        option.value = String(optionDef.value);
        option.textContent = optionDef.label;
        input.appendChild(option);
      });

      input.value = String(currentParams[key] ?? def.default ?? "");

      input.addEventListener("change", () => {
        currentParams[key] = input.value;
        onChange();
      });

      label.appendChild(input);
      container.appendChild(label);
      continue;
    }

    if (def.type === "font") {
      const defaultFont = String(def.default ?? "");
      const currentFont = normalizeFontForPicker(currentParams[key] ?? defaultFont);
      currentParams[key] = currentFont;

      const input = document.createElement("input");
      input.type = "text";
      input.value = currentFont;
      input.maxLength = def.maxLength ?? 120;
      input.placeholder = def.placeholder ?? "Search fonts";
      input.style.marginLeft = "12px";
      input.style.maxWidth = "180px";
      input.style.width = "180px";
      input.readOnly = true;

      label.style.alignItems = "flex-start";

      const commitFont = (candidate) => {
        const normalized = String(candidate ?? "").trim();
        if (!normalized) {
          return false;
        }

        if (currentParams[key] !== normalized) {
          currentParams[key] = normalized;
          onChange();
        }

        input.value = currentParams[key];
        return true;
      };

      label.appendChild(input);
      container.appendChild(label);

      const picker = new FontPicker(input, {
        variants: false,
        verbose: false,
        showClearButton: false,
        showCancelButton: true,
        defaultSearch: "",
        defaultSubset: "all",
        defaultCategories: ["display", "handwriting", "monospace", "sans-serif", "serif"],
        sortBy: "popularity",
        sortReverse: false
      });

      picker.on("pick", (font) => {
        const fontName = font?.family?.name ?? "";
        if (!fontName) {
          return;
        }
        commitFont(normalizeFontForPicker(fontName));
      });

      input.addEventListener("focus", () => {
        picker.open();
      });

      try {
        picker.setFont(currentFont);
      } catch {
        picker.setFont(FONT_PICKER_DEFAULT_FAMILY);
        commitFont(FONT_PICKER_DEFAULT_FAMILY);
      }

      const pickers = fontPickersByContainer.get(container) ?? [];
      pickers.push(picker);
      fontPickersByContainer.set(container, pickers);

      continue;
    }

    const input = document.createElement("input");
    input.type = "range";
    input.min = def.min;
    input.max = def.max;
    input.step = def.step;
    input.value = currentParams[key];
    input.dataset.paramKey = key;

    const valueSpan = document.createElement("span");
    valueSpan.className = "param-value";
    valueSpan.textContent = formatParamValue(currentParams[key], def);

    input.addEventListener("input", () => {
      const val = parseFloat(input.value);
      currentParams[key] = val;
      valueSpan.textContent = formatParamValue(val, def);
      onChange();
    });

    label.appendChild(input);
    label.appendChild(valueSpan);
    container.appendChild(label);
  }
}

// Format parameter value for display
function formatParamValue(value, def) {
  if (def.step >= 1) {
    return Math.round(value).toString();
  } else if (def.step >= 0.1) {
    return value.toFixed(1);
  } else {
    return value.toFixed(3);
  }
}

// Update parameter UIs for both patterns
function updateParamsUI() {
  buildParamsUI(patternAEl.value, paramsAContent, currentParamsA, renderPatterns);
  buildParamsUI(patternBEl.value, paramsBContent, currentParamsB, renderPatterns);

  // Show/hide param sections based on whether they have content
  document.getElementById("paramsA").style.display = paramsAContent.children.length > 0 ? "block" : "none";
  document.getElementById("paramsB").style.display = paramsBContent.children.length > 0 ? "block" : "none";
}

function updateExtrudeUI() {
  if (!paramsExtrudeContent) {
    return;
  }

  paramsExtrudeContent.innerHTML = "";
  buildParamSliders(extrudeParams, paramsExtrudeContent, currentExtrudeParams, renderPatterns);
  document.getElementById("paramsExtrude").style.display =
    paramsExtrudeContent.children.length > 0 ? "block" : "none";
}

function update3DUI() {
  if (!params3DContent) {
    return;
  }

  params3DContent.innerHTML = "";

  // Animation mode select
  const modeLabel = document.createElement("label");
  modeLabel.textContent = "Animation Mode:";

  const modeSelect = document.createElement("select");
  modeSelect.id = "animationMode";
  const modes = [
    { value: 'none', label: 'None' },
    { value: 'wave', label: 'Wave' },
    { value: 'pulse', label: 'Pulse' },
    { value: 'cascade', label: 'Cascade' },
    { value: 'breathe', label: 'Breathe' }
  ];

  modes.forEach(mode => {
    const option = document.createElement("option");
    option.value = mode.value;
    option.textContent = mode.label;
    if (mode.value === currentAnimMode) option.selected = true;
    modeSelect.appendChild(option);
  });

  modeSelect.addEventListener("change", () => {
    currentAnimMode = modeSelect.value;
    setAnimationSettings({ mode: currentAnimMode });
  });

  modeLabel.appendChild(modeSelect);
  params3DContent.appendChild(modeLabel);

  // Animation sliders
  buildParamSliders(animation3DParams, params3DContent, current3DParams, () => {
    setAnimationSettings({
      speed: current3DParams.animSpeed,
      amplitude: current3DParams.animAmplitude
    });
  });

  document.getElementById("params3D").style.display = "block";
}

function getExtrudeSettings() {
  const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
  const getParam = (key) => currentExtrudeParams[key] ?? extrudeParams[key].default;
  const tintStartR = clamp(Math.round(getParam("tintStartR")), 0, 255);
  const tintStartG = clamp(Math.round(getParam("tintStartG")), 0, 255);
  const tintStartB = clamp(Math.round(getParam("tintStartB")), 0, 255);
  const tintEndR = clamp(Math.round(getParam("tintEndR")), 0, 255);
  const tintEndG = clamp(Math.round(getParam("tintEndG")), 0, 255);
  const tintEndB = clamp(Math.round(getParam("tintEndB")), 0, 255);

  return {
    layers: getParam("layers"),
    layerSpacing: getParam("layerSpacing"),
    alpha: clamp(getParam("alpha"), 0, 1),
    alphaFalloff: clamp(getParam("alphaFalloff"), 0, 1),
    transparentBlack: Boolean(getParam("transparentBlack")),
    transparentWhite: Boolean(getParam("transparentWhite")),
    blackThreshold: clamp(getParam("blackThreshold"), 0, 1),
    whiteThreshold: clamp(getParam("whiteThreshold"), 0, 1),
    tintStart: (tintStartR << 16) | (tintStartG << 8) | tintStartB,
    tintEnd: (tintEndR << 16) | (tintEndG << 8) | tintEndB
  };
}

// Render a single pattern to a texture
async function renderPattern(patternType, renderTexture, params, options = {}) {
  const { updateWebcam = true } = options;
  if (patternType === "webcam") {
    if (!updateWebcam && !isWebcamActive()) {
      return;
    }

    const texture = await initWebcam();
    if (texture) {
      if (updateWebcam) {
        renderWebcamToTexture(app, renderTexture);
      }
    } else {
      // Fallback: render placeholder if webcam fails
      const g = new PIXI.Graphics();
      g.beginFill(0x333333);
      g.drawRect(0, 0, 1024, 1024);
      g.endFill();
      app.renderer.render(g, { renderTexture, clear: true });
    }
  } else {
    const config = PATTERN_CONFIG[patternType];
    if (config && config.generator) {
      if (patternType === "text") {
        await ensureTextFontLoaded(params?.font ?? textParams.font.default);
      }

      if (config.mode === "shader") {
        config.generator(app, renderTexture, params);
      } else if (config.mode === "direct") {
        config.generator(app, renderTexture, params);
      } else {
        const g = new PIXI.Graphics();
        config.generator(g, 1024, params);
        app.renderer.render(g, { renderTexture, clear: true });
      }
    }
  }
}

// Update Three.js scene with current pattern
function updateThreeScene() {
  const settings = getExtrudeSettings();
  createLayerStack(scene, settings);
}

// Main render function
async function renderPatterns() {
  const patternA = patternAEl.value;
  const patternB = patternBEl.value;
  const threshold = parseFloat(thresholdEl.value);
  const shouldUpdateWebcam = currentWebcamMode === "live" || webcamCapturePending;

  // Show loading for slow patterns
  const slowPatterns = ["dla"];
  if (slowPatterns.includes(patternA) || slowPatterns.includes(patternB)) {
    showLoading(true);
    // Use setTimeout to allow UI to update before heavy computation
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  try {
    // Render both patterns with their current parameters
    await renderPattern(patternA, texA, currentParamsA, { updateWebcam: shouldUpdateWebcam });
    await renderPattern(patternB, texB, currentParamsB, { updateWebcam: shouldUpdateWebcam });

    // Apply boolean operation
    applyBoolean(app, texA, texB, operatorEl.value, boolTex, threshold);

    // Update Three.js scene
    updateThreeScene();

    if (webcamCapturePending && isWebcamUsed()) {
      webcamCapturePending = false;
    }
  } finally {
    showLoading(false);
  }
}

function updateWebcamFrame() {
  if (currentWebcamMode !== "live" || !isWebcamUsed()) {
    return;
  }

  if (!isWebcamActive()) {
    void initWebcam();
    return;
  }

  let updated = false;
  if (patternAEl.value === "webcam") {
    updated = renderWebcamToTexture(app, texA) || updated;
  }
  if (patternBEl.value === "webcam") {
    updated = renderWebcamToTexture(app, texB) || updated;
  }

  if (updated) {
    const threshold = parseFloat(thresholdEl.value);
    applyBoolean(app, texA, texB, operatorEl.value, boolTex, threshold);
  }
}

// Three.js animation loop
function animate(time) {
  requestAnimationFrame(animate);

  // Convert to seconds
  const timeSeconds = time * 0.001;

  // Update controls
  controls.update();

  // Update live webcam frame if enabled
  updateWebcamFrame();

  // Animate layers
  animateLayers(timeSeconds);
  pushNewTexture(app, boolTex);

  // Render Three.js scene
  renderer.render(scene, camera);
}

// Event listeners
patternAEl.addEventListener("change", () => {
  // Reset params for new pattern type
  Object.keys(currentParamsA).forEach(k => delete currentParamsA[k]);
  updateWebcamButtonVisibility();
  updateParamsUI();
  webcamCapturePending = isWebcamUsed();
  renderPatterns();
});

patternBEl.addEventListener("change", () => {
  // Reset params for new pattern type
  Object.keys(currentParamsB).forEach(k => delete currentParamsB[k]);
  updateWebcamButtonVisibility();
  updateParamsUI();
  webcamCapturePending = isWebcamUsed();
  renderPatterns();
});

operatorEl.addEventListener("change", () => {
  updateOperatorHint();
  renderPatterns();
});

if (webcamModeEl) {
  webcamModeEl.addEventListener("change", () => {
    currentWebcamMode = webcamModeEl.value;
    webcamCapturePending = true;
    updateWebcamButtonVisibility();
    if (isWebcamUsed()) {
      renderPatterns();
    }
  });
}

thresholdEl.addEventListener("input", () => {
  thresholdValueEl.textContent = parseFloat(thresholdEl.value).toFixed(2);
  renderPatterns();
});

regenerateBtn.addEventListener("click", () => {
  renderPatterns();
});

captureWebcamBtn.addEventListener("click", () => {
  webcamCapturePending = true;
  renderPatterns();
});

exportBtn.addEventListener("click", () => {
  // Capture from Three.js renderer
  renderer.render(scene, camera);
  const dataUrl = renderer.domElement.toDataURL('image/png');
  const a = document.createElement("a");
  a.download = "sculpture-3d.png";
  a.href = dataUrl;
  a.click();
});

// Initialize
updateOperatorHint();
updateWebcamButtonVisibility();
updateParamsUI();
updateExtrudeUI();
update3DUI();
renderPatterns();
initTextFontCatalog(() => {
  updateParamsUI();
  renderPatterns();
});

// Start animation loop
animate(0);
