/* eslint "no-console": 0, "global-require": 0, "import/no-dynamic-require": 0 */
const path = require("path");

const taskNumber = parseInt(process.argv[2], 10);

if (Number.isNaN(taskNumber)) {
  console.error("Sorry, you have to provide a number as an argument");
  process.exit(1);
}

if (taskNumber < 1 || taskNumber > 25) {
  console.error("Sorry, task number should be between 1 and 25");
  process.exit(1);
}

try {
  console.log(`Running task number ${taskNumber}:`);
  console.log(`https://adventofcode.com/2018/day/${taskNumber}\n`);

  console.log("Running first part of the task:");
  require(path.join(__dirname, String(taskNumber), "1.js"));

  console.log("\nRunning second part of the task:");
  require(path.join(__dirname, String(taskNumber), "2.js"));
} catch (err) {
  if (err.code === "MODULE_NOT_FOUND") {
    console.error("Seems there is no solution yet.");
  }
}
