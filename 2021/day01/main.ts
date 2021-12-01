// --- EXAMPLE PART 1 --- //
const exampleMeasures = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

let exampleCounter = 0;

for (let i = 0; i < exampleMeasures.length; i++) {
  if (exampleMeasures[i] > exampleMeasures[i - 1]) {
    exampleCounter++;
  }
}
console.log(exampleCounter);

// --- PART 1 --- //

const depthMeasures = await Deno.readTextFile("./input.txt");

const listDepthMeasuresStrings = depthMeasures.split("\n");

const listDepthMeasuresNumbers = listDepthMeasuresStrings.map((depthMeasure) =>
  parseInt(depthMeasure, 10)
);

let counter = 0;

for (let i = 0; i < listDepthMeasuresNumbers.length; i++) {
  if (listDepthMeasuresNumbers[i] > listDepthMeasuresNumbers[i - 1]) {
    counter++;
  }
}

console.log(counter);

// --- EXAMPLE PART 2 --- //

const exampleMeasures2: Array<number> = [
  199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
];

const countNumberOfIncreasedMeasureTriplets = (measures: Array<number>) => {
  let previousSum = +Infinity;
  let counter2 = 0;

  for (let i = 0; i <= measures.length - 3; i++) {
    let currSum = 0;

    for (let j = i; j < i + 3; j++) {
      currSum += measures[j];
    }

    if (currSum > previousSum) {
      counter2++;
    }
    previousSum = currSum;
  }
  return counter2;
};

console.log(countNumberOfIncreasedMeasureTriplets(exampleMeasures2));

// --- PART 2 --- //

console.log(countNumberOfIncreasedMeasureTriplets(listDepthMeasuresNumbers));
