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

for (let x = 0; x <= boundaries.x; x++) {
  for (let y = 0; y <= boundaries.y; y++) {
    // count distance from all points.
    // write the shortest dot.
    // iterate over points and see all dots
    // where all closes points are not on the border
    const currentPosition = { x, y };

    const distances = dots.map(dot => {
      const distance = calculateDistance(currentPosition, dot);

      return { dot, distance, position: currentPosition };
    });

    distances.sort((a, b) => a.distance - b.distance);

    const [first, second] = distances;

    if (first.distance !== second.distance) {
      const key = makeDotKey(first.dot);
      dotsDistances[key].points.push(first);
    }
  }
}

const number = Object.keys(dotsDistances).reduce((acc, key) => {
  const dotDistances = dotsDistances[key];

  const bordersBoundaries = dotDistances.points.some(({ position: point }) => {
    const borderX = point.x === 0 || point.x === boundaries.x;
    const borderY = point.y === 0 || point.y === boundaries.y;

    return borderX || borderY;
  });

  if (bordersBoundaries) {
    return acc;
  }

  const newArea = dotDistances.points.length;

  return newArea > acc ? newArea : acc;
}, 0);

console.log(number);

function calculateDistance(position, dot) {
  return Math.abs(position.x - dot.x) + Math.abs(position.y - dot.y);
}

function makeDotKey(dot) {
  return `${dot.x}:${dot.y}`;
}
