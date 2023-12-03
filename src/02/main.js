const fs = require("fs");

function main() {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const code = input.trim().split(",").map(Number);

  console.log(run(init(code, 12, 2)));
  console.log(findTarget(code, 19690720));
}

function findTarget(code, target) {
  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
      if (run(init(code, n, v)) === target) {
        return 100 * n + v;
      }
    }
  }
}

function init(code, noun, verb) {
  return [code[0], noun, verb, ...code.slice(3)];
}

function run(code, pos = 0) {
  if (code[pos] === 99) {
    return code[0];
  }

  const a = code[code[pos + 1]];
  const b = code[code[pos + 2]];

  code[code[pos + 3]] = code[pos] === 1 ? a + b : a * b;

  return run(code, pos + 4);
}

main();
