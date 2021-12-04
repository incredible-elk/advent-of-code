import { sumArray } from "../utils.ts";

// --- UTILS --- //

const extractNumberFromPathSegment = (pathSegment: string) =>
  parseInt(pathSegment.slice(pathSegment.indexOf(" ") + 1), 10);

// --- EXAMPLE PART 1 --- //

const examplePath = "forward 5, down 5, forward 8, up 3, down 8, forward 2";
const examplePathArray = examplePath.split(", ");

const sumUpPathSegments = (
  pathArray: Array<string>,
  pathSegmentStartsWith: string
) => {
  const filteredPathSegments = pathArray.filter((pathSegment) =>
    pathSegment.startsWith(pathSegmentStartsWith)
  );
  const numbers = filteredPathSegments.map(extractNumberFromPathSegment);
  return sumArray(numbers);
};

const newSubmarinePosition = (pathArray: Array<string>) => {
  const sumDistance = sumUpPathSegments(pathArray, "forward ");
  const sumUpDepth = sumUpPathSegments(pathArray, "up ");
  const sumDownDepth = sumUpPathSegments(pathArray, "down ");
  const sumDepth = sumDownDepth - sumUpDepth;
  return sumDistance * sumDepth;
};
console.log(newSubmarinePosition(examplePathArray));

// --- PART 1 --- //

const path = await Deno.readTextFile("./input.txt");
const inputPathArray = path.split("\n");

console.log(newSubmarinePosition(inputPathArray));

// --- EXAMPLE PART 2 --- //

const finalSubmarinePosition = (pathArray: Array<string>) => {
  let horizontalDistance = 0;
  let aim = 0;
  let depth = 0;

  for (let i = 0; i < pathArray.length; i++) {
    const pathSegment = pathArray[i];
    const pathSegmentValue = extractNumberFromPathSegment(pathSegment);

    if (pathSegment.startsWith("forward ")) {
      horizontalDistance += pathSegmentValue;
      depth += pathSegmentValue * aim;
    } else if (pathSegment.startsWith("up ")) {
      aim -= pathSegmentValue;
    } else if (pathSegment.startsWith("down ")) {
      aim += pathSegmentValue;
    }
  }
  return horizontalDistance * depth;
};

console.log(finalSubmarinePosition(examplePathArray));

// --- PART 2 --- //

console.log(finalSubmarinePosition(inputPathArray));
