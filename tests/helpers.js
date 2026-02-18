// This file contains helper functions for the tests.

// Function to draw a stroke on the handwriting area given an array of points.
async function drawStroke(page, points) {
  const box = await page.locator(".ms-editor.draw").boundingBox();
  const w = box.width;
  const h = box.height;

  const abs = (x, y) => ({
    x: box.x + x,
    y: box.y + y,
  });

  const start = abs(points[0].x, points[0].y);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();

  for (let i = 1; i < points.length; i++) {
    const p = abs(points[i].x, points[i].y);
    await page.mouse.move(p.x, p.y, { steps: 12 });
  }

  await page.mouse.up();
}


// Function to get the coordinates for drawing the numbers 1, 2, and 3 in the handwriting area.
async function getDrawingCoordinates(page) {
  const box = await page.locator(".ms-editor.draw").boundingBox();
  const w = box.width;
  const h = box.height;

  return {
    one: [
      { x: w * 0.20, y: h * 0.25 },
      { x: w * 0.20, y: h * 0.78 },
    ],
    two: [
      { x: w * 0.38, y: h * 0.32 },
      { x: w * 0.42, y: h * 0.25 },
      { x: w * 0.48, y: h * 0.30 },
      { x: w * 0.50, y: h * 0.40 },
      { x: w * 0.40, y: h * 0.62 },
      { x: w * 0.42, y: h * 0.78 },
      { x: w * 0.50, y: h * 0.78 },
    ],
    three: [
      { x: w * 0.72, y: h * 0.30 },
      { x: w * 0.82, y: h * 0.30 },
      { x: w * 0.78, y: h * 0.48 },
      { x: w * 0.74, y: h * 0.54 },
      { x: w * 0.84, y: h * 0.68 },
      { x: w * 0.72, y: h * 0.74 },
    ],
  };
}

module.exports = { drawStroke, getDrawingCoordinates };

//аufnction for ordered choice selection --- IGNORE ---
