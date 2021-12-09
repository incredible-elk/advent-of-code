import { convertToNumbers, sumArray } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) => convertToNumbers(input.split(","));

// --- EXAMPLE PART 1 --- //

const exampleLanternfishInput = "3,4,3,1,2";
const exampleLanternfish = parseInput(exampleLanternfishInput);

const lanternfishPopulationGrowth = (array: Array<number>, days: number) => {
  const numberFilter = (x: number) =>
    array.filter((number) => number === x).length;

  const counter: number[] = [];

  for (let i = 0; i < 9; i++) {
    counter[i] = numberFilter(i);
  }

  for (let i = 0; i < days; i++) {
    const numberOfFertileFish = counter.shift();

    if (numberOfFertileFish === undefined) {
      throw new Error("numberOfFertileFish is undefined!");
    }
    counter[6] += numberOfFertileFish;
    counter[8] = numberOfFertileFish;
  }

  return sumArray(counter);
};

console.log(lanternfishPopulationGrowth(exampleLanternfish, 80));

// --- PART 1 --- //

const lanternfishInput = await Deno.readTextFile("input.txt");
const lanternfish = parseInput(lanternfishInput);

console.log(lanternfishPopulationGrowth(lanternfish, 80));

// --- EXAMPLE PART 2 --- //

console.log(lanternfishPopulationGrowth(exampleLanternfish, 256));

// --- PART 2 --- //

console.log(lanternfishPopulationGrowth(lanternfish, 256));
