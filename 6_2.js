const fs = require("fs");

const dots = fs
  .readFileSync("6_input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n")
  .map(coords => {
    const [x, y] = coords.split(", ");

    return { x: Number(x), y: Number(y) };
  });

const boundaries = dots.reduce(
  (acc, dot) => {
    if (dot.x > acc.x) {
      acc.x = dot.x;
    }

    if (dot.y > acc.y) {
      acc.y = dot.y;
    }

    return acc;
  },
  { x: 0, y: 0 }
);

boundaries.x += 10;
boundaries.y += 10;

const dotsDistances = dots.reduce((acc, dot) => {
  acc[makeDotKey(dot)] = { points: [] };
  return acc;
}, {});

let size = 0;

for (let x = 0; x <= boundaries.x; x++) {
  for (let y = 0; y <= boundaries.y; y++) {
    // count distance from all points.
    // write the shortest dot.
    // iterate over points and see all dots
    // where all closes points are not on the border
    const currentPosition = { x, y };

    const totalDistance = dots.reduce((sum, dot) => {
      const distance = calculateDistance(currentPosition, dot);

      return sum + distance;
    }, 0);

    if (totalDistance < 10000) {
      size++;
    }
  }
}

console.log(size);

function calculateDistance(position, dot) {
  return Math.abs(position.x - dot.x) + Math.abs(position.y - dot.y);
}

function makeDotKey(dot) {
  return `${dot.x}:${dot.y}`;
}
