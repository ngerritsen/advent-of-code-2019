const fs = require("fs");

function main() {
  const input = fs.readFileSync(__dirname + "/input.txt", "utf-8");
  const modules = input.split("\n").map(Number);

  console.log(sum(modules.map(calculateFuelRequired)));
  console.log(sum(modules.map((mass) => calculateFuelRequiredRecursive(mass))));
}

function calculateFuelRequiredRecursive(mass, total = 0) {
  const fuel = calculateFuelRequired(mass);

  if (fuel <= 0) {
    return total;
  }

  return calculateFuelRequiredRecursive(fuel, total + fuel);
}

function calculateFuelRequired(mass) {
  return Math.floor(mass / 3) - 2;
}

function sum(nums) {
  return nums.reduce((total, num) => total + num, 0);
}

main();
