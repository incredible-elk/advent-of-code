import { convertToNumbers, sumArray } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) => convertToNumbers(input.split(","));

// --- EXAMPLE PART 1 --- //

const exampleInputCrabPositions = "16,1,2,0,4,2,7,1,2,14";
const exampleCrabPositions = parseInput(exampleInputCrabPositions);

const cheapestFuelCosts = (input: Array<number>, constantFuelRate: boolean) => {
  const furthestPosition = input.reduce((previousMax, current) =>
    current > previousMax ? current : previousMax
  );

  const nearestPosition = input.reduce((previousMin, current) =>
    current < previousMin ? current : previousMin
  );

  let minFuelTotal = Infinity;

  for (let i = nearestPosition; i < furthestPosition; i++) {
    const fuelTotal = sumArray(
      input.map((position) => {
        const difference = Math.abs(i - position);

        if (constantFuelRate) {
          return difference;
        } else {
          let growingFuelCost = 0;

          for (let i = 1; i <= difference; i++) {
            growingFuelCost += i;
          }
          return growingFuelCost;
        }
      })
    );

    if (fuelTotal < minFuelTotal) {
      minFuelTotal = fuelTotal;
    }
  }
  return minFuelTotal;
};

console.log(cheapestFuelCosts(exampleCrabPositions, true));

// --- PART 1 --- //

const inputCrabPositions = await Deno.readTextFile("input.txt");
const crabPositions = parseInput(inputCrabPositions);

console.log(cheapestFuelCosts(crabPositions, true));

// --- EXAMPLE PART 2 --- //

console.log(cheapestFuelCosts(exampleCrabPositions, false));

// --- PART 2 --- //

console.log(cheapestFuelCosts(crabPositions, false));
