const fs = require("fs");

const rawClaims = fs.readFileSync("3_input.txt", { encoding: "utf-8" });

const claims = rawClaims
  .trim()
  .split("\n")
  .map(parseClaim);

const fabricMap = {};

for (let i = 0; i < claims.length; i++) {
  const claim = claims[i];

  for (let x = claim.left; x < claim.left + claim.width; x++) {
    for (let y = claim.top; y < claim.top + claim.height; y++) {
      const key = `${x}x${y}`;

      if (!fabricMap[key]) {
        fabricMap[key] = 0;
      }

      fabricMap[key]++;
    }
  }
}

for (let i = 0; i < claims.length; i++) {
  const claim = claims[i];

  let perfect = true;

  for (let x = claim.left; x < claim.left + claim.width; x++) {
    for (let y = claim.top; y < claim.top + claim.height; y++) {
      const key = `${x}x${y}`;

      if (fabricMap[key] !== 1) {
        perfect = false;
      }
    }
  }

  if (perfect) {
    console.log(claim);
    process.exit(0);
  }
}

function parseClaim(str) {
  const matchedData = str.match(/^#(\d+) @ (\d+)\,(\d+)\: (\d+)x(\d+)/);

  const [_full, id, left, top, width, height] = matchedData.map(Number);

  return { id, left, top, width, height };
}
