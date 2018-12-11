const fs = require("fs");

const originalPolymer = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim();
let polymer = originalPolymer;

let position = 0;

while (true) {
  if (position === polymer.length - 1) {
    break;
  }

  const elem = polymer[position];
  const nextElem = polymer[position + 1];

  if (makeReaction(elem, nextElem)) {
    const firstPart = polymer.substring(0, position);
    const secondPart = polymer.substring(position + 2, polymer.length);
    polymer = firstPart + secondPart;

    if (position > 0) {
      position--;
    }
  } else {
    position++;
  }
}

console.log(`Final length of reaction is ${polymer.length} symbols.`);
console.log(`Original length was ${originalPolymer.length} symbols`);

function makeReaction(el1, el2) {
  return el1 !== el2 && el1.toLowerCase() === el2.toLowerCase();
}
