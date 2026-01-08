import * as PIXI from "pixi.js";

let extrudeContainer = null;
const layerSprites = [];

function ensureContainer() {
  if (!extrudeContainer) {
    extrudeContainer = new PIXI.Container();
  }
  return extrudeContainer;
}

function syncLayers(count, texture) {
  const container = ensureContainer();

  while (layerSprites.length > count) {
    const sprite = layerSprites.pop();
    container.removeChild(sprite);
    sprite.destroy({ children: true, texture: false, baseTexture: false });
  }

  while (layerSprites.length < count) {
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0, 0);
    container.addChild(sprite);
    layerSprites.push(sprite);
  }

  for (const sprite of layerSprites) {
    if (sprite.texture !== texture) {
      sprite.texture = texture;
    }
  }

  return container;
}

export function renderExtrusion(app, sourceTex, targetTex, settings = {}) {
  const config = {
    layers: 18,
    baseX: 0,
    baseY: 0,
    offsetX: -3,
    offsetY: -6,
    skewX: -0.25,
    skewY: 0,
    alpha: 1,
    alphaFalloff: 0.9,
    tint: 0xffffff,
    ...settings
  };

  const layerCount = Math.max(1, Math.floor(config.layers));
  const container = syncLayers(layerCount, sourceTex);
  const maxDepth = layerCount - 1;

  const drawForward = config.offsetY < 0;

  for (let i = 0; i < layerCount; i += 1) {
    const depth = drawForward ? i : maxDepth - i;
    const sprite = layerSprites[i];
    const alpha = config.alpha * Math.pow(config.alphaFalloff, depth);

    sprite.position.set(
      config.baseX + depth * config.offsetX,
      config.baseY + depth * config.offsetY
    );
    sprite.skew.set(config.skewX, config.skewY);
    sprite.alpha = Math.min(1, Math.max(0, alpha));
    sprite.tint = config.tint;
    sprite.width = sourceTex.width;
    sprite.height = sourceTex.height;
  }

  app.renderer.render(container, { renderTexture: targetTex, clear: true });
}
