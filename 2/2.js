const fs = require("fs");
const { analyzeString } = require("./1");

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const strings = input.trim().split("\n");

const correctStrings = strings.filter(str => {
  const { double, triple } = analyzeString(str);

  return double || triple;
});

for (let i = 0; i < correctStrings.length - 1; i++) {
  const str = correctStrings[i];

  for (let y = i + 1; y < correctStrings.length; y++) {
    const newStr = correctStrings[y];

    const differences = calculateDifferences(str, newStr);

    if (differences === 1) {
      const match = findSimilarSubstrings(str, newStr);
      console.log(match);
    }
  }
}

function findSimilarSubstrings(str1, str2) {
  let result = "";
  let mistakes = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] === str2[i]) {
      result += str1[i];
    } else if (mistakes === 1) {
      if (result.length > 4) {
        return result;
      }

      result = "";
      mistakes = 0;
    } else if (mistakes === 0) {
      mistakes = 1;
    } else {
      console.error("we should not be here");
    }
  }

  return result;
}

function calculateDifferences(str1, str2) {
  if (str1.length !== str2.length) {
    return 10000000;
  }

  let differences = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) differences++;
  }

  return differences;
}
