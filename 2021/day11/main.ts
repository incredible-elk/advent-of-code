import { convertToNumbers } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) => convertToNumbers(line.split("")));

// --- EXAMPLE PART 1 --- //

const exampleOctopusEnergyInput = `
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

const exampleOctopusEnergy = parseInput(exampleOctopusEnergyInput);

const possibleNeighbors = [
  [0, -1],
  [0, +1],
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [+1, -1],
  [+1, 0],
  [+1, +1],
];
const numberOfFlashes = (input: number[][]) => {
  let flashCounter = 0;

  let currentEnergy = input;

  for (let iteration = 0; iteration < 100; iteration++) {
    currentEnergy = currentEnergy.map((line) =>
      line.map((energyLevel) => energyLevel + 1)
    );
    while (true) {
      const neighbors = [];

      for (let lineIndex = 0; lineIndex < currentEnergy.length; lineIndex++) {
        const line = currentEnergy[lineIndex];

        for (let columnIndex = 0; columnIndex < line.length; columnIndex++) {
          const energyLevel = line[columnIndex];

          if (energyLevel > 9) {
            line[columnIndex] = 0;
            flashCounter++;

            const newNeighbors = possibleNeighbors
              .map(([l, c]) => [l + lineIndex, c + columnIndex])
              .filter(
                ([l, c]) =>
                  l >= 0 &&
                  c >= 0 &&
                  l < currentEnergy.length &&
                  c < line.length
              );

            neighbors.push(...newNeighbors);
          }
        }
      }
      neighbors.forEach(([l, c]) => {
        if (currentEnergy[l][c] !== 0) {
          currentEnergy[l][c]++;
        }
      });
      if (neighbors.length === 0) break;
    }
  }
  return { flashCounter };
};

console.log(numberOfFlashes(exampleOctopusEnergy));

// --- PART 1 --- //

const octopusEnergyInput = await Deno.readTextFile("input.txt");

const octopusEnergy = parseInput(octopusEnergyInput);

console.log(numberOfFlashes(octopusEnergy));
