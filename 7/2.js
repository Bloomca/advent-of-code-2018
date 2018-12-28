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

const allNodes = {};

let steps = [];
const nextSteps = {};

graphData.forEach(({ currentStep, nextStep }) => {
  if (!allNodes[currentStep]) {
    allNodes[currentStep] = true;
  }

  if (!allNodes[nextStep]) {
    allNodes[nextStep] = true;
  }

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

let path = "";
const firstChar = steps.shift();
let options = Object.keys(allNodes);
options.sort();
const covered = {};
let duration = 0;

const plannedByTime = {
  [firstChar.charCodeAt(0) - 64 + 60]: {
    step: firstChar
  }
};
const plannedSteps = {
  [path]: true
};

const WORKERS = 5;

let otherOptions = [];

main: while (true) {
  console.log(path, duration, options.toString());

  // if something is planned at this exact second
  if (plannedByTime[duration]) {
    const step = plannedByTime[duration].step;
    path += step;
    covered[step] = true;

    otherOptions = makeUnique(otherOptions.concat(nodes[step] || []));

    options = options.concat(otherOptions).filter(x => !covered[x]);
    options.sort();
    delete plannedByTime[duration];

    // we iterated over all possible nodes
    // so the answer is ready
    if (path.length === Object.keys(allNodes).length) {
      break;
    }
  }

  // we don't need to guess next step right now, we have to wait for
  // the next available worker first
  if (Object.keys(plannedByTime).length === WORKERS) {
    duration++;
    continue;
  }

  let nextStep;
  const numberOfOptions = options.length;
  let times = 0;
  while (true) {
    times++;

    if (times > numberOfOptions) {
      duration++;
      continue main;
    }

    const step = options.shift();

    const unlocked = (locks[step] || []).every(x => covered[x]);

    if (unlocked) {
      nextStep = step;
      break;
    } else {
      options.push(step);
    }
  }

  if (!nextStep) {
    console.error("NO NEXT STEP");
    process.exit(1);
  }

  if (!plannedSteps[nextStep]) {
    const code = nextStep.charCodeAt(0) - 64 + 60 + duration;
    plannedByTime[code] = {
      step: nextStep
    };
    plannedSteps[nextStep] = true;
  }
}

console.log(`final path is ${path}`);
console.log(`it took us ${duration} second to complete it.`);

// take an array and return another one, but only
// with unique values
function makeUnique(arr) {
  const res = [];
  const elems = {};
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];

    if (!elems[elem]) {
      elems[elem] = true;
      res.push(elem);
    }
  }

  return res;
}
