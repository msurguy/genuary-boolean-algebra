import * as THREE from 'three';

let layerGroup = null;
let layerMeshes = [];
let sharedGeometry = null;

// Layer textures for rolling update (each layer has its own texture snapshot)
let layerTextures = [];

function isCanvas(value) {
  return value && typeof value.getContext === 'function';
}

// Settings state
let currentSettings = {
  layers: 18,
  layerSpacing: 0.05,
  scaleX: 2,
  scaleY: 2,
  alpha: 1.0,
  alphaFalloff: 0.95,
  tintStart: 0xffffff,
  tintEnd: 0xffffff,
  transparentBlack: true,
  transparentWhite: false,
  blackThreshold: 0.1,
  whiteThreshold: 0.9
};

// Animation state
let animationState = {
  enabled: true,
  mode: 'wave',
  speed: 1.0,
  amplitude: 0.1
};

// Custom shader for black/white transparency
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D map;
  uniform vec3 tintColor;
  uniform float opacity;
  uniform bool transparentBlack;
  uniform bool transparentWhite;
  uniform float blackThreshold;
  uniform float whiteThreshold;

  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(map, vUv);
    float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));

    float alpha = texColor.a * opacity;

    // Make black pixels transparent
    if (transparentBlack && luminance < blackThreshold) {
      alpha *= luminance / blackThreshold;
    }

    // Make white pixels transparent
    if (transparentWhite && luminance > whiteThreshold) {
      alpha *= (1.0 - luminance) / (1.0 - whiteThreshold);
    }

    vec3 finalColor = texColor.rgb * tintColor;
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

/**
 * Extract PixiJS RenderTexture to canvas for Three.js
 */
export function extractPixiTexture(pixiApp, renderTexture) {
  const canvas = pixiApp.renderer.extract.canvas(renderTexture);
  return canvas;
}

export function updateTextureFromPixi(pixiApp, renderTexture) {
  return extractPixiTexture(pixiApp, renderTexture);
}

/**
 * Create a new texture from a canvas (for individual layer snapshots)
 */
function createTextureFromCanvas(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Copy a source canvas into a target canvas (reusing when possible)
 */
function copyCanvas(sourceCanvas, targetCanvas = null) {
  if (!targetCanvas || !targetCanvas.getContext) {
    targetCanvas = document.createElement('canvas');
  }

  if (targetCanvas.width !== sourceCanvas.width || targetCanvas.height !== sourceCanvas.height) {
    targetCanvas.width = sourceCanvas.width;
    targetCanvas.height = sourceCanvas.height;
  }

  const ctx = targetCanvas.getContext('2d');
  ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  ctx.drawImage(sourceCanvas, 0, 0);
  return targetCanvas;
}

/**
 * Create shader material for a layer
 */
function createLayerMaterial(texture, settings, layerIndex) {
  const opacity = settings.alpha * Math.pow(settings.alphaFalloff, layerIndex);
  const tintColor = getLayerTint(settings, layerIndex, settings.layers || 1);

  return new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      tintColor: { value: tintColor },
      opacity: { value: opacity },
      transparentBlack: { value: settings.transparentBlack },
      transparentWhite: { value: settings.transparentWhite },
      blackThreshold: { value: settings.blackThreshold },
      whiteThreshold: { value: settings.whiteThreshold }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });
}

function getLayerTint(settings, layerIndex, layerCount) {
  const startColor = new THREE.Color(settings.tintStart);
  const endColor = new THREE.Color(settings.tintEnd);
  const t = layerCount <= 1 ? 0 : layerIndex / (layerCount - 1);
  return startColor.lerp(endColor, t);
}

function updateLayerTextureFromCanvas(layerIndex, canvas) {
  if (!canvas || !layerTextures[layerIndex]) return;
  const texture = layerTextures[layerIndex];
  texture.image = copyCanvas(canvas, texture.image);
  texture.needsUpdate = true;
}

/**
 * Initialize the layer stack (called once or when layer count changes)
 */
export function initLayerStack(scene, settings = {}) {
  currentSettings = { ...currentSettings, ...settings };
  const config = currentSettings;

  // Remove existing group if present
  if (layerGroup) {
    scene.remove(layerGroup);
    layerMeshes.forEach(mesh => {
      mesh.material.dispose();
    });
    layerMeshes = [];
  }

  // Dispose old textures
  layerTextures.forEach(tex => tex.dispose());
  layerTextures = [];

  if (sharedGeometry) {
    sharedGeometry.dispose();
  }

  // Create new group
  layerGroup = new THREE.Group();

  // Shared geometry for all layers (efficient)
  sharedGeometry = new THREE.PlaneGeometry(config.scaleX, config.scaleY);

  // Create placeholder textures and meshes for each layer
  for (let i = 0; i < config.layers; i++) {
    // Create a blank texture initially
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1024, 1024);

    const texture = createTextureFromCanvas(canvas);
    layerTextures.push(texture);

    const material = createLayerMaterial(texture, config, i);
    const mesh = new THREE.Mesh(sharedGeometry, material);

    // Position in Z (front to back)
    mesh.position.z = -(i * config.layerSpacing);

    // Store layer index and base values for animation
    mesh.userData.layerIndex = i;
    mesh.userData.baseZ = mesh.position.z;
    mesh.userData.baseOpacity = config.alpha * Math.pow(config.alphaFalloff, i);

    layerMeshes.push(mesh);
    layerGroup.add(mesh);
  }

  scene.add(layerGroup);

  return layerGroup;
}

/**
 * Create or update the layer stack without resetting textures
 */
export function createLayerStack(scene, textureOrSettings = {}, maybeSettings = {}) {
  const texture = isCanvas(textureOrSettings) ? textureOrSettings : null;
  const settings = texture ? (maybeSettings || {}) : (textureOrSettings || {});

  currentSettings = { ...currentSettings, ...settings };
  const config = currentSettings;

  if (!layerGroup || needsReinit(config.layers)) {
    initLayerStack(scene, config);
  } else {
    updateLayerSettings(config);
  }

  if (texture) {
    updateLayerTextureFromCanvas(0, texture);
  }

  return layerGroup;
}

/**
 * Rolling update: push new texture to front, shift others back
 * Each frame, the newest pattern goes to layer 0, and all other layers shift
 */
export function pushNewTexture(pixiApp, renderTexture) {
  if (layerMeshes.length === 0) return;

  // Get current canvas from PixiJS
  const sourceCanvas = extractPixiTexture(pixiApp, renderTexture);

  // Shift all textures back by one (last one gets replaced)
  // We reuse the last texture object and update its image
  const lastTexture = layerTextures[layerTextures.length - 1];

  // Shift texture references
  for (let i = layerTextures.length - 1; i > 0; i--) {
    layerTextures[i] = layerTextures[i - 1];
    layerMeshes[i].material.uniforms.map.value = layerTextures[i];
  }

  // Reuse the old last texture, update its image
  lastTexture.image = copyCanvas(sourceCanvas, lastTexture.image);
  lastTexture.needsUpdate = true;

  // Assign to front layer
  layerTextures[0] = lastTexture;
  layerMeshes[0].material.uniforms.map.value = lastTexture;
}

/**
 * Update settings on existing layers (without recreating)
 */
export function updateLayerSettings(settings = {}) {
  currentSettings = { ...currentSettings, ...settings };
  const config = currentSettings;
  const layerCount = layerMeshes.length || config.layers || 1;

  layerMeshes.forEach((mesh, i) => {
    const opacity = config.alpha * Math.pow(config.alphaFalloff, i);
    mesh.userData.baseOpacity = opacity;

    // Update shader uniforms
    mesh.material.uniforms.tintColor.value = getLayerTint(config, i, layerCount);
    mesh.material.uniforms.opacity.value = opacity;
    mesh.material.uniforms.transparentBlack.value = config.transparentBlack;
    mesh.material.uniforms.transparentWhite.value = config.transparentWhite;
    mesh.material.uniforms.blackThreshold.value = config.blackThreshold;
    mesh.material.uniforms.whiteThreshold.value = config.whiteThreshold;

    // Update position
    mesh.position.z = -(i * config.layerSpacing);
    mesh.userData.baseZ = mesh.position.z;
  });
}

/**
 * Check if layer count changed and needs reinitialization
 */
export function needsReinit(newLayerCount) {
  return layerMeshes.length !== newLayerCount;
}

/**
 * Get current layer count
 */
export function getLayerCount() {
  return layerMeshes.length;
}

/**
 * Animate layers - called each frame
 */
export function animateLayers(time) {
  if (!animationState.enabled || layerMeshes.length === 0) return;

  const { mode, speed, amplitude } = animationState;
  const layerCount = layerMeshes.length;

  layerMeshes.forEach((mesh, i) => {
    const layerRatio = i / Math.max(1, layerCount - 1);

    switch (mode) {
      case 'wave':
        // Sinusoidal wave through layers
        const waveOffset = Math.sin(time * speed + layerRatio * Math.PI * 2) * amplitude;
        mesh.position.z = mesh.userData.baseZ + waveOffset;
        mesh.scale.set(1, 1, 1);
        break;

      case 'pulse':
        // Layered pulse with phase offsets for wave-like scaling
        const pulsePhase = time * speed * 2 + layerRatio * Math.PI * 2;
        const pulseScale = 1 + Math.sin(pulsePhase) * amplitude * 0.5;
        mesh.scale.set(pulseScale, pulseScale, 1);
        break;

      case 'cascade':
        // Layers animate in sequence
        const cascadePhase = (time * speed + layerRatio * 2) % (Math.PI * 2);
        const cascadeOffset = Math.sin(cascadePhase) * amplitude * (1 - layerRatio);
        mesh.position.z = mesh.userData.baseZ + cascadeOffset;
        mesh.scale.set(1, 1, 1);
        // Fade layers during cascade
        mesh.material.uniforms.opacity.value = mesh.userData.baseOpacity *
          (0.7 + 0.3 * Math.sin(cascadePhase));
        break;

      case 'breathe':
        // Organic breathing expansion/contraction
        const breathePhase = time * speed * 0.5;
        const expansionFactor = 1 + Math.sin(breathePhase) * amplitude;
        mesh.position.z = mesh.userData.baseZ * expansionFactor;
        mesh.scale.set(1, 1, 1);
        break;

      case 'none':
      default:
        // Reset to base position
        mesh.position.z = mesh.userData.baseZ;
        mesh.scale.set(1, 1, 1);
        mesh.material.uniforms.opacity.value = mesh.userData.baseOpacity;
        break;
    }
  });
}

/**
 * Update animation settings
 */
export function setAnimationSettings(settings) {
  animationState = { ...animationState, ...settings };
}

/**
 * Get current animation settings
 */
export function getAnimationSettings() {
  return { ...animationState };
}

/**
 * Get current layer settings
 */
export function getLayerSettings() {
  return { ...currentSettings };
}

/**
 * Clean up resources
 */
export function disposeLayerStack() {
  if (layerGroup) {
    layerMeshes.forEach(mesh => {
      mesh.material.dispose();
    });
    layerMeshes = [];
    layerGroup = null;
  }

  layerTextures.forEach(tex => tex.dispose());
  layerTextures = [];

  if (sharedGeometry) {
    sharedGeometry.dispose();
    sharedGeometry = null;
  }
}
