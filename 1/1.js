const fs = require("fs");

const input = fs.readFileSync("1/input.txt", { encoding: "utf-8" });

const nums = input
  .trim()
  .split("\n")
  .map(Number);

const result = nums.reduce((acc, num) => acc + num, 0);

console.log(result);
