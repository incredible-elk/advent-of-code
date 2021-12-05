// --- EXAMPLE PART 1 --- //

const exampleInput = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) => line.split(" -> "))
    .map((line) =>
      line.map((point) =>
        point.split(",").map((number) => parseInt(number, 10))
      )
    );

const countVentOverlaps = (
  pointArray: number[][][],
  countDiagonals: boolean
) => {
  const pointCounter: Record<string, number> = {};

  for (let i = 0; i < pointArray.length; i++) {
    const [[x1, y1], [x2, y2]] = pointArray[i];
    const linePoints = [];

    if (x1 === x2) {
      const differenceY = y2 - y1;
      const numberOfPoints = Math.abs(differenceY) + 1;

      for (let j = 0; j < numberOfPoints; j++) {
        const y = y1 < y2 ? y1 + j : y1 - j;
        linePoints.push([x1, y]);
      }
    } else if (y1 === y2) {
      const differenceX = x2 - x1;
      const numberOfPoints = Math.abs(differenceX) + 1;

      for (let j = 0; j < numberOfPoints; j++) {
        const x = x1 < x2 ? x1 + j : x1 - j;
        linePoints.push([x, y1]);
      }
    } else {
      if (countDiagonals) {
        const differenceX = x2 - x1;
        const numberOfPoints = Math.abs(differenceX) + 1;
        // console.log("diagonal");

        for (let j = 0; j < numberOfPoints; j++) {
          const x = x1 < x2 ? x1 + j : x1 - j;
          const y = y1 < y2 ? y1 + j : y1 - j;
          linePoints.push([x, y]);
        }
      }
    }

    linePoints.forEach((point) => {
      const pointString = point.join();

      if (pointCounter[pointString] !== undefined) {
        pointCounter[pointString]++;
      } else {
        pointCounter[pointString] = 1;
      }
    });
  }

  const numberOfOverlappingPoints = Object.values(pointCounter).filter(
    (number) => number >= 2
  );
  return numberOfOverlappingPoints.length;
};

console.log(countVentOverlaps(parseInput(exampleInput), false));

// --- PART 1 --- //

const ventInput = await Deno.readTextFile("./input.txt");

console.log(countVentOverlaps(parseInput(ventInput), false));

// --- EXAMPLE PART 2 --- //

console.log(countVentOverlaps(parseInput(exampleInput), true));

// --- PART 2 --- //

console.log(countVentOverlaps(parseInput(ventInput), true));
