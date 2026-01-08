import * as PIXI from "pixi.js";

let videoElement = null;
let videoTexture = null;
let isInitialized = false;
let stream = null;

export async function initWebcam() {
  if (isInitialized && videoTexture) {
    return videoTexture;
  }

  try {
    // Create video element
    videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.playsInline = true;
    videoElement.muted = true;

    // Request webcam access
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1024 },
        height: { ideal: 1024 },
        facingMode: 'user'
      }
    });

    videoElement.srcObject = stream;
    await videoElement.play();

    // Create PIXI texture from video
    videoTexture = PIXI.Texture.from(videoElement);
    isInitialized = true;

    return videoTexture;
  } catch (err) {
    console.error('Webcam access denied or unavailable:', err);
    return null;
  }
}

export function renderWebcamToTexture(app, renderTexture) {
  if (!videoTexture || !videoElement) {
    return false;
  }

  // Update texture from current video frame
  videoTexture.update();

  // Create sprite from video texture
  const sprite = new PIXI.Sprite(videoTexture);

  // Scale to fit render texture
  const scaleX = renderTexture.width / videoElement.videoWidth;
  const scaleY = renderTexture.height / videoElement.videoHeight;
  const scale = Math.max(scaleX, scaleY); // Cover the texture

  sprite.anchor.set(0.5);
  sprite.x = renderTexture.width / 2;
  sprite.y = renderTexture.height / 2;
  sprite.scale.set(scale);

  // Mirror horizontally for selfie view
  sprite.scale.x *= -1;

  // Apply grayscale filter for proper thresholding
  const colorMatrix = new PIXI.ColorMatrixFilter();
  colorMatrix.desaturate();
  sprite.filters = [colorMatrix];

  // Render to texture
  app.renderer.render(sprite, { renderTexture, clear: true });

  return true;
}

export function stopWebcam() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }

  if (videoElement) {
    videoElement.srcObject = null;
    videoElement = null;
  }

  if (videoTexture) {
    videoTexture.destroy(true);
    videoTexture = null;
  }

  isInitialized = false;
}

export function isWebcamActive() {
  return isInitialized && videoTexture !== null;
}

// For generating a static frame (used by the pattern system)
export function generateWebcam(graphics, size) {
  // This is a placeholder - webcam rendering is handled differently
  // by renderWebcamToTexture since it needs direct texture access
  graphics.beginFill(0x333333);
  graphics.drawRect(0, 0, size, size);
  graphics.endFill();

  // Draw placeholder text
  graphics.lineStyle(2, 0x666666);
  const cx = size / 2;
  const cy = size / 2;
  graphics.drawCircle(cx, cy, 100);
  graphics.moveTo(cx - 50, cy - 30);
  graphics.lineTo(cx + 50, cy - 30);
}
