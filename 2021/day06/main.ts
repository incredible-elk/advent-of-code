import { convertToNumbers } from "../utils.ts";

// --- EXAMPLE PART 1 --- //

const exampleLanternfishInput = "3,4,3,1,2";
const exampleLanternfishString = exampleLanternfishInput.split(",");
const exampleLanternfish = convertToNumbers(exampleLanternfishString);

console.log(exampleLanternfish);

const lanternfishPopulationGrowth = (array: Array<number>, days: number) => {
  let counter0 = array.filter((number) => number === 0).length;
  let counter1 = array.filter((number) => number === 1).length;
  let counter2 = array.filter((number) => number === 2).length;
  let counter3 = array.filter((number) => number === 3).length;
  let counter4 = array.filter((number) => number === 4).length;
  let counter5 = array.filter((number) => number === 5).length;
  let counter6 = array.filter((number) => number === 6).length;
  let counter7 = array.filter((number) => number === 7).length;
  let counter8 = array.filter((number) => number === 8).length;

  for (let i = 0; i < days; i++) {
    const numberOfFertileFish = counter0;

    counter0 = counter1;
    counter1 = counter2;
    counter2 = counter3;
    counter3 = counter4;
    counter4 = counter5;
    counter5 = counter6;
    counter6 = counter7 + numberOfFertileFish;
    counter7 = counter8;
    counter8 = numberOfFertileFish;
  }

  return (
    counter0 +
    counter1 +
    counter2 +
    counter3 +
    counter4 +
    counter5 +
    counter6 +
    counter7 +
    counter8
  );
};

console.log(lanternfishPopulationGrowth(exampleLanternfish, 80));

// --- PART 1 --- //

const lanternfishInput = await Deno.readTextFile("input.txt");
const lanternfishString = lanternfishInput.split(",");
const lanternfish = convertToNumbers(lanternfishString);

console.log(lanternfishPopulationGrowth(lanternfish, 80));

// --- EXAMPLE PART 2 --- //

console.log(lanternfishPopulationGrowth(exampleLanternfish, 256));

// --- PART 2 --- //

console.log(lanternfishPopulationGrowth(lanternfish, 256));
