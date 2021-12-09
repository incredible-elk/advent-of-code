import { convertToNumbers, sumArray } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) => convertToNumbers(input.split(","));

// --- EXAMPLE PART 1 --- //

const exampleInputCrabPositions = "16,1,2,0,4,2,7,1,2,14";
const exampleCrabPositions = parseInput(exampleInputCrabPositions);

const cheapestFuelCosts = (input: Array<number>) => {
  const furthestPosition = input.reduce((previousMax, current) =>
    current > previousMax ? current : previousMax
  );

  const nearestPosition = input.reduce((previousMin, current) =>
    current < previousMin ? current : previousMin
  );

  let minFuelTotal = Infinity;

  for (let i = nearestPosition; i < furthestPosition; i++) {
    const fuelTotal = sumArray(input.map((position) => Math.abs(i - position)));

    if (fuelTotal < minFuelTotal) {
      minFuelTotal = fuelTotal;
    }
  }
  return minFuelTotal;
};

console.log(cheapestFuelCosts(exampleCrabPositions));

// --- PART 1 --- //

const inputCrabPositions = await Deno.readTextFile("input.txt");
const crabPositions = parseInput(inputCrabPositions);

console.log(cheapestFuelCosts(crabPositions));
