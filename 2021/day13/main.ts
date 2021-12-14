import { convertToNumbers } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) => {
  const [dotCoordinatesInput, foldInstructionsInput] = input
    .trim()
    .split("\n\n");

  const foldInstructions = foldInstructionsInput
    .trim()
    .split("\n")
    .map((instruction) => {
      const lengthFoldAlong = "fold along ".length;
      const letter = instruction.substring(
        lengthFoldAlong,
        lengthFoldAlong + 1
      );
      const number = parseInt(instruction.substring(lengthFoldAlong + 2), 10);
      return { letter, number };
    });

  const dotCoordinates = dotCoordinatesInput
    .trim()
    .split("\n")
    .map((dot) => convertToNumbers(dot.split(",")));
  return { foldInstructions, dotCoordinates };
};

// --- EXAMPLE PART 1 --- //

const exampleManualInput = `
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5
`;

const exampleParsed = parseInput(exampleManualInput);

const visibleDotsAfterFold = (
  dotCoordinates: number[][],
  fold: {
    letter: string;
    number: number;
  }
) => {
  const dotsAfterFold = dotCoordinates.map(([x, y]) => {
    if (fold.letter === "y") {
      if (y > fold.number) {
        const differenceY = y - fold.number;
        const newY = fold.number - differenceY;
        return [x, newY];
      } else {
        return [x, y];
      }
    } else if (fold.letter === "x") {
      if (x > fold.number) {
        const differenceX = x - fold.number;
        const newX = fold.number - differenceX;
        return [newX, y];
      } else {
        return [x, y];
      }
    } else {
      throw new Error("letter is not valid");
    }
  });
  const dotsWithoutDuplicates = dotsAfterFold.filter(
    (dot, index) =>
      !dotsAfterFold
        .slice(0, index)
        .some((dot2) => dot[0] === dot2[0] && dot[1] === dot2[1])
  );

  return dotsWithoutDuplicates;
};

const visibleDotsPart1 = (input: {
  dotCoordinates: number[][];
  foldInstructions: {
    letter: string;
    number: number;
  }[];
}) => {
  const fold = input.foldInstructions[0];

  const dotsAfterFold = visibleDotsAfterFold(input.dotCoordinates, fold);
  return dotsAfterFold.length;
};

console.log(visibleDotsPart1(exampleParsed));

// --- PART 1 --- //

const manualInput = await Deno.readTextFile("input.txt");

const parsedInput = parseInput(manualInput);

console.log(visibleDotsPart1(parsedInput));

// --- EXAMPLE PART 2 --- //

const visibleDotsPart2 = (input: {
  dotCoordinates: number[][];
  foldInstructions: {
    letter: string;
    number: number;
  }[];
}) => {
  let dots = input.dotCoordinates;

  for (let i = 0; i < input.foldInstructions.length; i++) {
    const fold = input.foldInstructions[i];

    dots = visibleDotsAfterFold(dots, fold);
  }

  const allXes = dots.map((dot) => dot[0]);
  const allYs = dots.map((dot) => dot[1]);

  const maxX = Math.max(...allXes);
  const maxY = Math.max(...allYs);

  for (let y = 0; y <= maxY; y++) {
    let string = "";
    for (let x = 0; x <= maxX; x++) {
      const isInDots = dots.some((dot) => dot[0] === x && dot[1] === y);
      string += isInDots ? "#" : ".";
    }
    console.log(string);
  }
};

console.log(visibleDotsPart2(exampleParsed));

// --- PART 2 --- //

console.log(visibleDotsPart2(parsedInput));
