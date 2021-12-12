// --- UTILS --- //

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((connection) => connection.split("-"));

const pathIncludesLowerCaseElementTwice = (path: string[]) => {
  const lowerCaseElements = path.filter(
    (element) => element === element.toLowerCase()
  );

  return lowerCaseElements.some((element, index) =>
    lowerCaseElements.slice(0, index).includes(element)
  );
};

// --- EXAMPLE PART 1 --- //

const exampleCaveMapInput = `
start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

const exampleCaveMap = parseInput(exampleCaveMapInput);

const possiblePaths = (caveMap: string[][], smallCaveTwice: boolean) => {
  let pathCounter = 0;

  const pathStack = [["start"]];

  while (pathStack.length > 0) {
    const path = pathStack.pop();
    if (path === undefined) throw new Error("Error!");

    const lastPathElement = path[path.length - 1];

    const possibleNextElements0 = caveMap
      .filter((connection) => connection[0] === lastPathElement)
      .map((connection) => connection[1]);

    const possibleNextElements1 = caveMap
      .filter((connection) => connection[1] === lastPathElement)
      .map((connection) => connection[0]);

    const possibleNextElements = possibleNextElements0.concat(
      possibleNextElements1
    );

    for (const element of possibleNextElements) {
      if (element === "end") {
        pathCounter++;
      } else if (element === "start") {
        // discard element
      } else {
        if (
          element === element.toUpperCase() ||
          !path.includes(element) ||
          (smallCaveTwice && !pathIncludesLowerCaseElementTwice(path))
        ) {
          const newPath = path.concat([element]);
          pathStack.push(newPath);
        }
      }
    }
  }

  return pathCounter;
};

console.log("exampleCaveMap:", possiblePaths(exampleCaveMap, false));

// --- LARGER EXAMPLE INPUT -- //

const exampleCaveMapInputL = await Deno.readTextFile("exInputL.txt");
const exampleCaveMapInputXL = await Deno.readTextFile("exInputXL.txt");

const exampleCaveMapL = parseInput(exampleCaveMapInputL);
const exampleCaveMapXL = parseInput(exampleCaveMapInputXL);

console.log("exampleCaveMapL:", possiblePaths(exampleCaveMapL, false));
console.log("exampleCaveMapXL:", possiblePaths(exampleCaveMapXL, false));

// --- PART 1 --- //

const caveMapInput = await Deno.readTextFile("input.txt");

const caveMap = parseInput(caveMapInput);

console.log("caveMap:", possiblePaths(caveMap, false));

// --- EXAMPLE PART 2 -- //

console.log("exampleCaveMap:", possiblePaths(exampleCaveMap, true));

console.log("exampleCaveMapL:", possiblePaths(exampleCaveMapL, true));
console.log("exampleCaveMapXL:", possiblePaths(exampleCaveMapXL, true));

// --- PART 2 -- //

console.log("caveMap:", possiblePaths(caveMap, true));
