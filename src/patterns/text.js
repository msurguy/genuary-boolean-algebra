import * as PIXI from "pixi.js";
import { GOOGLE_FONT_FAMILIES } from "../data/googleFontFamilies.js";

const CANVAS_SIZE = 1024;
const SYSTEM_FONT_NAME = "System Sans";
const SYSTEM_FONT_STACK = "system-ui, -apple-system, sans-serif";

const textCanvas = document.createElement("canvas");
textCanvas.width = CANVAS_SIZE;
textCanvas.height = CANVAS_SIZE;
const textContext = textCanvas.getContext("2d");
const textTexture = PIXI.Texture.from(textCanvas);
const textSprite = new PIXI.Sprite(textTexture);

let fontCatalog = normalizedCatalog(GOOGLE_FONT_FAMILIES);
const googleFontLoadPromises = new Map();
const loadedGoogleFonts = new Set();

function normalizeSingleLine(value) {
  return String(value ?? "").replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizedCatalog(names) {
  const deduped = new Set([SYSTEM_FONT_NAME]);
  names.forEach((name) => {
    const normalized = normalizeSingleLine(name);
    if (normalized && normalized !== SYSTEM_FONT_NAME) {
      deduped.add(normalized);
    }
  });

  const all = Array.from(deduped);
  const head = all.filter((name) => name === SYSTEM_FONT_NAME);
  const tail = all
    .filter((name) => name !== SYSTEM_FONT_NAME)
    .sort((a, b) => a.localeCompare(b));
  return [...head, ...tail];
}

export const textParams = {
  text: { label: "Text", type: "text", default: "BOOLEAN", maxLength: 120 },
  font: {
    label: "Font",
    type: "font",
    default: SYSTEM_FONT_NAME,
    maxLength: 120,
    placeholder: "Search Google Fonts"
  },
  height: { label: "Height", min: 0.25, max: 2, step: 0.01, default: 1 }
};

function sanitizeSingleLine(text) {
  const normalized = normalizeSingleLine(text);
  return normalized || textParams.text.default;
}

function sanitizeFontName(fontName) {
  const normalized = normalizeSingleLine(fontName);
  return normalized || textParams.font.default;
}

function isCatalogFont(fontName) {
  const target = sanitizeFontName(fontName).toLowerCase();
  return fontCatalog.some((item) => item.toLowerCase() === target);
}

function resolveFontFamily(fontName) {
  if (fontName === SYSTEM_FONT_NAME) {
    return SYSTEM_FONT_STACK;
  }
  const escaped = fontName.replace(/["\\]/g, "");
  return `'${escaped}', sans-serif`;
}

function toGoogleFamilyParam(fontName) {
  return encodeURIComponent(fontName).replace(/%20/g, "+");
}

export function getTextFontSuggestions() {
  return fontCatalog;
}

export function initTextFontCatalog(onUpdate) {
  fontCatalog = normalizedCatalog(GOOGLE_FONT_FAMILIES);
  if (typeof onUpdate === "function") {
    onUpdate();
  }
}

export function ensureTextFontLoaded(fontName) {
  const resolvedName = sanitizeFontName(fontName);
  if (resolvedName === SYSTEM_FONT_NAME || !document?.head) {
    return Promise.resolve();
  }

  if (!isCatalogFont(resolvedName)) {
    return Promise.resolve();
  }

  if (loadedGoogleFonts.has(resolvedName)) {
    return Promise.resolve();
  }

  if (googleFontLoadPromises.has(resolvedName)) {
    return googleFontLoadPromises.get(resolvedName);
  }

  const loadPromise = new Promise((resolve) => {
    let settled = false;
    const settle = (loaded) => {
      if (settled) {
        return;
      }
      settled = true;
      resolve(Boolean(loaded));
    };

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${toGoogleFamilyParam(
      resolvedName
    )}&display=swap`;

    const finish = () => {
      if (document.fonts) {
        document.fonts
          .load(`700 64px "${resolvedName}"`)
          .then(() => settle(true))
          .catch(() => settle(false));
      } else {
        settle(true);
      }
    };

    link.addEventListener("load", finish, { once: true });
    link.addEventListener("error", () => settle(false), { once: true });

    document.head.appendChild(link);

    // Safety timeout to avoid hanging render if stylesheet doesn't finish.
    setTimeout(() => settle(false), 2000);
  }).then((loaded) => {
    if (loaded) {
      loadedGoogleFonts.add(resolvedName);
    }
  }).finally(() => {
    googleFontLoadPromises.delete(resolvedName);
  });

  googleFontLoadPromises.set(resolvedName, loadPromise);
  return loadPromise;
}

export function generateText(app, renderTexture, params = {}) {
  if (!textContext) {
    return;
  }

  const text = sanitizeSingleLine(params.text ?? textParams.text.default);
  const fontName = sanitizeFontName(params.font ?? textParams.font.default);
  const fontFamily = resolveFontFamily(fontName);
  const heightScale = Math.min(
    textParams.height.max,
    Math.max(textParams.height.min, Number(params.height ?? textParams.height.default))
  );
  const padding = CANVAS_SIZE * 0.08;
  const maxWidth = CANVAS_SIZE - padding * 2;
  const maxHeight = CANVAS_SIZE - padding * 2;

  textContext.fillStyle = "#000";
  textContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  textContext.textAlign = "center";
  textContext.textBaseline = "middle";
  textContext.fillStyle = "#fff";

  // Find the largest single-line font size that fits the texture bounds.
  let fontSize = Math.floor(CANVAS_SIZE * 0.78);

  while (fontSize > 12) {
    textContext.font = `700 ${fontSize}px ${fontFamily}`;
    const metrics = textContext.measureText(text);
    const textWidth = metrics.width;
    const measuredHeight =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || fontSize;

    if (textWidth <= maxWidth && measuredHeight <= maxHeight) {
      break;
    }

    fontSize -= 4;
  }

  const finalFontSize = Math.max(12, Math.floor(fontSize * heightScale));
  textContext.font = `700 ${finalFontSize}px ${fontFamily}`;
  textContext.fillText(text, CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.5);

  textTexture.baseTexture.update();
  app.renderer.render(textSprite, { renderTexture, clear: true });
}
