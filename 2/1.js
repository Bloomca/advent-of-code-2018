const fs = require("fs");
const { analyzeString } = require("./util");

const input = fs.readFileSync("2/input.txt", { encoding: "utf-8" });

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

console.log(result, result.double * result.triple);
