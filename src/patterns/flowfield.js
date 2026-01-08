import FastNoiseLite from "fastnoise-lite";

// Parameter definitions for UI
export const flowfieldParams = {
  lineCount: { label: 'Line Count', min: 500, max: 8000, step: 500, default: 3000 },
  lineLength: { label: 'Line Length', min: 20, max: 150, step: 10, default: 60 },
  frequency: { label: 'Frequency', min: 0.002, max: 0.02, step: 0.001, default: 0.006 },
  curliness: { label: 'Curliness', min: 1, max: 8, step: 0.5, default: 4 },
  seed: { label: 'Seed', min: 1, max: 9999, step: 1, default: 1337 }
};

export function generateFlowfield(graphics, size, params = {}) {
  const lineCount = params.lineCount ?? flowfieldParams.lineCount.default;
  const maxSteps = params.lineLength ?? flowfieldParams.lineLength.default;
  const frequency = params.frequency ?? flowfieldParams.frequency.default;
  const curliness = params.curliness ?? flowfieldParams.curliness.default;
  const seed = params.seed ?? flowfieldParams.seed.default;
  const resolution = 20;

  // Create noise generator
  const noise = new FastNoiseLite(seed);
  noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
  noise.SetFrequency(frequency);

  const cols = Math.ceil(size / resolution);
  const rows = Math.ceil(size / resolution);

  // Draw dark background first
  graphics.beginFill(0x0a0a0a);
  graphics.drawRect(0, 0, size, size);
  graphics.endFill();

  // Build vector field
  const field = new Array(rows);
  for (let row = 0; row < rows; row++) {
    field[row] = new Array(cols);
    for (let col = 0; col < cols; col++) {
      const n = noise.GetNoise(col * resolution, row * resolution);
      const angle = n * Math.PI * curliness;
      field[row][col] = angle;
    }
  }

  // Draw streamlines
  const stepLength = 2;

  for (let i = 0; i < lineCount; i++) {
    let x = Math.random() * size;
    let y = Math.random() * size;

    const startNoise = noise.GetNoise(x, y);
    const brightness = Math.floor(((startNoise + 1) * 0.5) * 200 + 55);
    const color = (brightness << 16) | (brightness << 8) | brightness;

    graphics.lineStyle(1, color, 0.5);
    graphics.moveTo(x, y);

    for (let step = 0; step < maxSteps; step++) {
      const col = Math.floor(x / resolution);
      const row = Math.floor(y / resolution);

      if (col < 0 || col >= cols || row < 0 || row >= rows) break;

      const angle = field[row][col];
      x += Math.cos(angle) * stepLength;
      y += Math.sin(angle) * stepLength;

      graphics.lineTo(x, y);
    }
  }
}
