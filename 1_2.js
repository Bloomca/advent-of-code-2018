const fs = require("fs");

// input stays the same, so we can just read 1_input.txt file
const input = fs.readFileSync("1_input.txt", { encoding: "utf-8" });

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
