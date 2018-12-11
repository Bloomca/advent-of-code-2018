const fs = require("fs");

const input = fs.readFileSync("input.txt", { encoding: "utf-8" });

const nums = input
  .trim()
  .split("\n")
  .map(Number);

let currentFrequency = 0;
const freqs = new Map();

while (true) {
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    const newFrequency = currentFrequency + num;
    currentFrequency = newFrequency;

    if (freqs.has(newFrequency)) {
      console.log(newFrequency);
      process.exit(0);
    }

    freqs.set(newFrequency, true);
  }
}
