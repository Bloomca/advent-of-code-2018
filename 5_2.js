const fs = require("fs");

const originalPolymer = fs
  .readFileSync("5_input.txt", { encoding: "utf-8" })
  .trim();

const letters = {};
const results = [];
for (let i = 0; i < 1000; i++) {
  const letter = originalPolymer[i].toLowerCase();

  if (!letters[letter]) {
    letters[letter] = true;

    const reducedPolymer = originalPolymer
      .split("")
      .filter(element => element.toLowerCase() !== letter)
      .join("");
    const polymerAfterReactions = makeAllReactions(reducedPolymer);

    results.push({ letter, polymerLength: polymerAfterReactions.length });
  }
}

results.sort((a, b) => a.polymerLength - b.polymerLength);

console.log(`The best result is if we remove letter "${results[0].letter}"`);
console.log(
  `Length in case of reduction is ${results[0].polymerLength} symbols`
);

function makeAllReactions(polymer) {
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

  return polymer;
}

function makeReaction(el1, el2) {
  return el1 !== el2 && el1.toLowerCase() === el2.toLowerCase();
}
