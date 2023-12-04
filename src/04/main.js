const fs = require("fs");

function main() {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const [start, end] = input.trim().split("-").map(Number);

  let validNumsWithGroups = 0;
  let validNumsWithPairs = 0;

  for (let i = start; i <= end; i++) {
    const { hasPair, hasGroup } = validate(i);

    if (hasGroup) validNumsWithGroups++;
    if (hasPair) validNumsWithPairs++;
  }

  console.log(validNumsWithGroups);
  console.log(validNumsWithPairs);
}

function validate(num) {
  const strNum = String(num);
  let prev = -1;
  let hasPair = false;
  let hasGroup = false;
  let streak = 0;

  for (let i = 0; i < strNum.length; i++) {
    const curr = Number(strNum[i]);

    if (curr < prev) {
      return {};
    } else if (curr === prev) {
      streak++;
      hasGroup = true;
      if (i === strNum.length - 1 && streak === 1) {
        hasPair = true;
      }
    } else {
      hasPair = hasPair || streak === 1;
      streak = 0;
    }

    prev = curr;
  }

  return { hasPair, hasGroup };
}

main();
