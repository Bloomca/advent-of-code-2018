module.exports.analyzeString = analyzeString;

const fs = require("fs");

const input = fs.readFileSync("2_input.txt", { encoding: "utf-8" });

const strings = input.trim().split("\n");

const initialValue = {
  double: 0,
  triple: 0
};

const result = strings.reduce((acc, str) => {
  const { double, triple } = analyzeString(str);

  if (double) acc.double++;
  if (triple) acc.triple++;

  return acc;
}, initialValue);

if (require.main === module) {
  console.log(result, result.double * result.triple);
}

/**
 * @description Function to analyze whether there are double and/or triple
 * letters in the string.
 * @param {string} str – input string
 * @returns {object} – object with properties `double` and `triple`
 */
function analyzeString(str) {
  let double = false;
  let triple = false;
  const letters = new Set();

  for (let i = 0; i < str.length - 2; i++) {
    const letter = str[i];

    if (letters.has(letter)) {
      continue;
    }

    letters.add(letter);

    let occurences = 1;

    for (let y = i + 1; y < str.length; y++) {
      const nextLetter = str[y];

      if (letter === nextLetter) {
        occurences++;
      }

      if (occurences === 3) {
        break;
      }
    }

    if (occurences === 3) {
      triple = true;
    } else if (occurences === 2) {
      double = true;
    }
  }

  return { double, triple };
}
