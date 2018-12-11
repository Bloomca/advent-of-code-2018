const fs = require("fs");

const data = fs
  .readFileSync("input.txt", { encoding: "utf-8" })
  .trim()
  .split(" ")
  .map(Number);

function parseNodes(nodes) {
  const [childrenNumber, metadataNumber, ...rest] = nodes;

  let dataWithoutChildren = rest;
  const results = [];
  for (let i = 0; i < childrenNumber; i++) {
    const [childSum, restNodes] = parseNodes(dataWithoutChildren);
    results.push(childSum);
    dataWithoutChildren = restNodes;
  }

  const restNodes = dataWithoutChildren.slice(metadataNumber);
  if (childrenNumber === 0) {
    const sum = dataWithoutChildren
      .slice(0, metadataNumber)
      .reduce((acc, x) => acc + x, 0);

    return [sum, restNodes];
  }

  const sum = dataWithoutChildren
    .slice(0, metadataNumber)
    .map(index => results[index])
    .map(Boolean)
    .reduce((acc, x) => acc + x, 0);

  return [sum, restNodes];
}

const result = parseNodes(data);

console.log(result);
