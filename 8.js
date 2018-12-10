const fs = require("fs");

const data = fs
  .readFileSync("8_input.txt", { encoding: "utf-8" })
  .trim()
  .split(" ")
  .map(Number);

let sum = 0;

function parseNodes(nodes) {
  const [childrenNumber, metadataNumber, ...rest] = nodes;

  let dataWithoutChildren = rest;
  for (let i = 0; i < childrenNumber; i++) {
    dataWithoutChildren = parseNodes(dataWithoutChildren);
  }

  dataWithoutChildren.slice(0, metadataNumber).forEach(x => {
    sum += x;
  });
  return dataWithoutChildren.slice(metadataNumber);
}

parseNodes(data);

console.log(sum);
