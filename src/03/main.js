const fs = require("fs");

const dirs = {
  U: [0, 1],
  R: [1, 0],
  D: [0, -1],
  L: [-1, 0],
};
function main() {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const instructions = input
    .trim()
    .split("\n")
    .map((l) => l.split(","));

  const intersections = getIntersections(
    drawWire(instructions[0]),
    drawWire(instructions[1]),
  );

  console.log(Math.min(...Array.from(intersections.keys()).map(getDistance)));
  console.log(Math.min(...intersections.values()));
}

function getDistance(intersection) {
  const [x, y] = intersection.split(",");
  return Math.abs(Number(x) + Number(y));
}

function getIntersections(wireA, wireB) {
  const intersections = new Map();

  for (const [coords, steps] of wireA.entries()) {
    if (wireB.has(coords)) {
      intersections.set(coords, steps + wireB.get(coords));
    }
  }

  return intersections;
}

function drawWire(instructions) {
  const wire = new Map();
  let curr = [0, 0];
  let steps = 0;

  for (const ins of instructions) {
    const d = dirs[ins.slice(0, 1)];
    const n = Number(ins.slice(1));

    for (let i = 0; i < n; i++) {
      curr = addCoords(curr, d);
      wire.set(curr.join(","), ++steps);
    }
  }

  return wire;
}

function addCoords([xa, ya], [xb, yb]) {
  return [xa + xb, ya + yb];
}

main();
