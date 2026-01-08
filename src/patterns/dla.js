// Diffusion-Limited Aggregation pattern generator
// Creates organic, branching structures

// Parameter definitions for UI
export const dlaParams = {
  particleCount: { label: 'Particles', min: 1000, max: 10000, step: 500, default: 5000 },
  stickiness: { label: 'Stickiness', min: 1, max: 8, step: 1, default: 8 }
};

export function generateDLA(graphics, size, params = {}) {
  const particleCount = params.particleCount ?? dlaParams.particleCount.default;
  const stickiness = params.stickiness ?? dlaParams.stickiness.default;
  // Use Uint8Array for efficient grid storage
  const grid = new Uint8Array(size * size);

  // Seed the center with initial structure
  const cx = Math.floor(size / 2);
  const cy = Math.floor(size / 2);

  // Create a small seed cluster
  for (let dx = -2; dx <= 2; dx++) {
    for (let dy = -2; dy <= 2; dy++) {
      if (dx * dx + dy * dy <= 4) {
        grid[(cy + dy) * size + (cx + dx)] = 1;
      }
    }
  }

  // Track the bounding circle of the aggregate for optimized spawning
  let maxRadius = 5;
  let stuck = 13; // Initial seed size

  // Direction vectors for random walk
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [-1, 1], [1, -1], [-1, -1]
  ];

  // Helper to check if position has neighbor in aggregate
  // Stickiness controls how many directions to check (fewer = more branching)
  function hasNeighbor(x, y) {
    for (let i = 0; i < stickiness; i++) {
      const [dx, dy] = dirs[i];
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
        if (grid[ny * size + nx]) return true;
      }
    }
    return false;
  }

  // Main DLA loop
  while (stuck < particleCount) {
    // Spawn particle on circle around aggregate
    const spawnRadius = Math.min(maxRadius + 20, size * 0.45);
    const angle = Math.random() * Math.PI * 2;
    let x = Math.round(cx + Math.cos(angle) * spawnRadius);
    let y = Math.round(cy + Math.sin(angle) * spawnRadius);

    // Random walk
    let steps = 0;
    const maxSteps = size * 8;
    const killRadius = spawnRadius + 50;

    while (steps < maxSteps) {
      // Check if we hit the aggregate
      if (hasNeighbor(x, y)) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
          grid[y * size + x] = 1;
          stuck++;

          // Update max radius
          const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          if (dist > maxRadius) maxRadius = dist;
        }
        break;
      }

      // Random walk step (8 directions for more organic growth)
      const dir = dirs[Math.floor(Math.random() * 8)];
      x += dir[0];
      y += dir[1];

      // Kill if too far from center
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      if (dist > killRadius) break;

      // Bounds check
      if (x < 0 || x >= size || y < 0 || y >= size) break;

      steps++;
    }
  }

  // Render the DLA structure with distance-based shading
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (grid[y * size + x]) {
        // Calculate brightness based on distance from center
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const normalized = Math.min(dist / maxRadius, 1);
        const brightness = Math.floor(255 - normalized * 100);
        const color = (brightness << 16) | (brightness << 8) | brightness;

        graphics.beginFill(color);
        graphics.drawRect(x, y, 1, 1);
        graphics.endFill();
      }
    }
  }
}

// Faster version with reduced particle count for responsiveness
export function generateDLAFast(graphics, size) {
  return generateDLA(graphics, size, 3000);
}
