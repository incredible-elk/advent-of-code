// --- EXAMPLE PART 1 --- //

const exampleMeasurements: Array<number> = [
  199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
];

const countNumberOfIncreasedMeasurements = (measurements: Array<number>) => {
  let counter = 0;

  for (let i = 0; i < measurements.length; i++) {
    if (measurements[i] > measurements[i - 1]) {
      counter++;
    }
  }
  return counter;
};

console.log(countNumberOfIncreasedMeasurements(exampleMeasurements));

// --- PART 1 --- //

const measurements = await Deno.readTextFile("./input.txt");

const listMeasurementsStrings = measurements.split("\n");

const listMeasurementsNumbers = listMeasurementsStrings.map((measurement) =>
  parseInt(measurement, 10)
);

console.log(countNumberOfIncreasedMeasurements(listMeasurementsNumbers));

// --- EXAMPLE PART 2 --- //

const exampleMeasurements2: Array<number> = [
  199, 200, 208, 210, 200, 207, 240, 269, 260, 263,
];

const countNumberOfIncreasedMeasureTriplets = (measurements: Array<number>) => {
  let previousSum = +Infinity;
  let counter = 0;

  for (let i = 0; i <= measurements.length - 3; i++) {
    let currentSum = 0;

    for (let j = i; j < i + 3; j++) {
      currentSum += measurements[j];
    }

    if (currentSum > previousSum) {
      counter++;
    }
    previousSum = currentSum;
  }
  return counter;
};

console.log(countNumberOfIncreasedMeasureTriplets(exampleMeasurements2));

// --- PART 2 --- //

console.log(countNumberOfIncreasedMeasureTriplets(listMeasurementsNumbers));
