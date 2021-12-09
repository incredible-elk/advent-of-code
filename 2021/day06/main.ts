import { convertToNumbers } from "../utils.ts";

// --- EXAMPLE PART 1 --- //

const exampleLanternfishInput = "3,4,3,1,2";
const exampleLanternfishString = exampleLanternfishInput.split(",");
const exampleLanternfish = convertToNumbers(exampleLanternfishString);

console.log(exampleLanternfish);

const lanternfishPopulationGrowth = (array: Array<number>) => {
  let dailyDecrease = array;

  for (let i = 0; i < 80; i++) {
    const numberOfFertileFish = dailyDecrease.filter(
      (number) => number === 0
    ).length;

    for (let i = 0; i < numberOfFertileFish; i++) {
      dailyDecrease.push(9);
    }

    dailyDecrease = dailyDecrease.map((number) => (number === 0 ? 7 : number));
    dailyDecrease = dailyDecrease.map((number) => number - 1);
  }

  return dailyDecrease.length;
};

console.log(lanternfishPopulationGrowth(exampleLanternfish));

// --- PART 1 --- //

const lanternfishInput = await Deno.readTextFile("input.txt");
const lanternfishString = lanternfishInput.split(",");
const lanternfish = convertToNumbers(lanternfishString);

console.log(lanternfishPopulationGrowth(lanternfish));
