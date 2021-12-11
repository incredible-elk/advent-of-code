import { sumArray } from "../utils.ts";

// --- UTILS --- //

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

const matchingOpeningCharacters = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
} as const;

type ClosingCharacter = keyof typeof matchingOpeningCharacters;
type OpeningCharacter = typeof matchingOpeningCharacters[ClosingCharacter];

const corruptedCharacterPoints = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const incompleteCharacterPoints = { ")": 1, "]": 2, "}": 3, ">": 4 };

const isOpening = (character: string): character is OpeningCharacter =>
  Object.values(matchingOpeningCharacters).includes(
    character as OpeningCharacter
  );

const isClosing = (character: string): character is ClosingCharacter =>
  Object.keys(matchingOpeningCharacters).includes(
    character as ClosingCharacter
  );

// --- EXAMPLE PART 1 --- //

const exampleNavigationInputString = `
  [({(<(())[]>[[{[]{<()<>>
  [(()[<>])]({[<{<<[]>>(
  {([(<{}[<>[]}>{[]{[(<()>
  (((({<>}<{<{<>}{[]{[]{}
  [[<[([]))<([[{}[[()]]]
  [{[{({}]{}}([{[{{{}}([]
  {<[[]]>}<{[{[{[]{()[[[]
  [<(<(<(<{}))><([]([]()
  <{([([[(<>()){}]>(<<{{
  <{([{{}}[<[[[<>{}]]]>[]]`;

const exampleNavigationInput = parseInput(exampleNavigationInputString);

const syntaxErrorScore = (navigationSubsystem: string[][]) => {
  const counters = { ")": 0, "]": 0, "}": 0, ">": 0 };
  const totalScoreArray = [];

  for (const line of navigationSubsystem) {
    const openingCharacters: OpeningCharacter[] = [];
    let isCorrupted = false;

    for (let i = 0; i < line.length; i++) {
      const character = line[i];
      if (isOpening(character)) {
        openingCharacters.push(character);
      } else if (isClosing(character)) {
        const lastOpeningCharacter = openingCharacters.pop();

        if (lastOpeningCharacter !== matchingOpeningCharacters[character]) {
          counters[character]++;
          isCorrupted = true;
          break;
        }
      }
    }
    if (!isCorrupted) {
      const missingClosingCharacters = openingCharacters
        .map((character) => {
          const entry = Object.entries(matchingOpeningCharacters).find(
            (pair) => pair[1] === character
          );
          if (entry === undefined) throw new Error("Error!");
          return entry[0] as ClosingCharacter;
        })
        .reverse();

      let totalScore = 0;

      for (const character of missingClosingCharacters) {
        totalScore = totalScore * 5;
        totalScore += incompleteCharacterPoints[character];
      }
      totalScoreArray.push(totalScore);
    }
  }

  const keys = Object.keys(counters) as ClosingCharacter[];
  const values = keys.map(
    (key) => counters[key] * corruptedCharacterPoints[key]
  );
  totalScoreArray.sort((a, b) => a - b);
  const middleIndex = Math.floor(totalScoreArray.length / 2);

  return {
    totalScore: sumArray(values),
    middleScore: totalScoreArray[middleIndex],
  };
};

console.log(syntaxErrorScore(exampleNavigationInput).totalScore);

// --- PART 1 --- //

const navigationInputString = await Deno.readTextFile("input.txt");
const navigationInput = parseInput(navigationInputString);

console.log(syntaxErrorScore(navigationInput).totalScore);

// --- EXAMPLE PART 2 --- //

console.log(syntaxErrorScore(exampleNavigationInput).middleScore);

// --- PART 2 --- //

console.log(syntaxErrorScore(navigationInput).middleScore);
