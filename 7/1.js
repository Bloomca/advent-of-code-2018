const fs = require("fs");

const data = fs
  .readFileSync("7/input.txt", { encoding: "utf-8" })
  .trim()
  .split("\n");

const graphData = data.map(str => {
  const [_full, currentStep, nextStep] = str.match(
    /^Step ([A-Z]).+?step ([A-Z])/
  );

  return { currentStep, nextStep };
});

const nodes = {};
const locks = {};

let steps = [];
const nextSteps = {};

graphData.forEach(({ currentStep, nextStep }) => {
  nextSteps[nextStep] = true;
  if (!nodes[currentStep]) {
    nodes[currentStep] = [];
  }

  if (!steps.includes(currentStep) && !nextSteps[currentStep]) {
    steps.push(currentStep);
  }

  if (steps.includes(nextStep)) {
    steps = steps.filter(step => step !== nextStep);
  }

  nodes[currentStep].push(nextStep);

  if (!locks[nextStep]) {
    locks[nextStep] = [];
  }

  locks[nextStep].push(currentStep);
});

steps.sort();

let path = steps.shift();
let options = steps;
options.sort();
const covered = { [path]: true };

while (true) {
  if (options.length === 0) {
    break;
  }

  let nextStep;
  while (true) {
    const step = options.shift();

    const unlocked = (locks[step] || []).every(x => covered[x]);

    if (unlocked) {
      nextStep = step;
      break;
    } else {
      options.push(step);
    }
  }

  path += nextStep;

  covered[nextStep] = true;

  options = options.concat(nodes[nextStep] || []).filter(x => !covered[x]);
  options.sort();
}

console.log(path);
