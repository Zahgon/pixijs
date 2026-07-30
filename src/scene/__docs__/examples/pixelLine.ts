import { Application, Container, Graphics, Text } from 'pixi.js';

/**
 * Creates a grid pattern using Graphics lines
 * @param graphics - The Graphics object to draw on
 * @returns The Graphics object with the grid drawn
 */
function buildGrid(graphics: Graphics) {
  // Draw 10 vertical lines spaced 10 pixels apart
  for (let i = 0; i < 11; i++) {
    // Move to top of each line (x = i*10, y = 0)
    graphics
      .moveTo(i * 10, 0)
    // Draw down to bottom (x = i*10, y = 100)
      .lineTo(i * 10, 100);
  }

  // Draw 10 horizontal lines spaced 10 pixels apart
  for (let i = 0; i < 11; i++) {
    // Move to start of each line (x = 0, y = i*10)
    graphics
      .moveTo(0, i * 10)
    // Draw across to end (x = 100, y = i*10)
      .lineTo(100, i * 10);
  }

  return graphics;
}

(async () => {
    throw new Error("STUB");
})();
