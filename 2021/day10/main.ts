// --- UTILS --- //

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

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
  let parenthesisCounter = 0;
  let bracketCounter = 0;
  let bracesCounter = 0;
  let tagCounter = 0;

  for (const line of navigationSubsystem) {
    const openingCharacter = [];

    for (let i = 0; i < line.length; i++) {
      if (
        line[i] === "(" ||
        line[i] === "{" ||
        line[i] === "[" ||
        line[i] === "<"
      ) {
        openingCharacter.push(line[i]);
      } else if (line[i] === ")") {
        const lastOpeningCharacter = openingCharacter.pop();

        if (lastOpeningCharacter !== "(") {
          parenthesisCounter++;
          break;
        }
      } else if (line[i] === "]") {
        const lastOpeningCharacter = openingCharacter.pop();

        if (lastOpeningCharacter !== "[") {
          bracketCounter++;
          break;
        }
      } else if (line[i] === "}") {
        const lastOpeningCharacter = openingCharacter.pop();

        if (lastOpeningCharacter !== "{") {
          bracesCounter++;
          break;
        }
      } else if (line[i] === ">") {
        const lastOpeningCharacter = openingCharacter.pop();

        if (lastOpeningCharacter !== "<") {
          tagCounter++;
          break;
        }
      }
    }
  }

  console.log({
    parenthesisCounter,
    bracketCounter,
    bracesCounter,
    tagCounter,
  });

  return (
    parenthesisCounter * 3 +
    bracketCounter * 57 +
    bracesCounter * 1197 +
    tagCounter * 25137
  );
};

console.log(syntaxErrorScore(exampleNavigationInput));

// --- PART 1 --- //

const navigationInputString = await Deno.readTextFile("input.txt");
const navigationInput = parseInput(navigationInputString);

console.log(syntaxErrorScore(navigationInput));

// --- EXAMPLE PART 2 --- //

const syntaxErrorScore2 = (navigationSubsystem: string[][]) => {
  const totalScoreArray = [];

  for (const line of navigationSubsystem) {
    const openingCharacters = [];
    let isCorrupted = false;

    for (let i = 0; i < line.length; i++) {
      if (
        line[i] === "(" ||
        line[i] === "{" ||
        line[i] === "[" ||
        line[i] === "<"
      ) {
        openingCharacters.push(line[i]);
      } else if (line[i] === ")") {
        const lastOpeningCharacter = openingCharacters.pop();

        if (lastOpeningCharacter !== "(") {
          isCorrupted = true;
          break;
        }
      } else if (line[i] === "]") {
        const lastOpeningCharacter = openingCharacters.pop();

        if (lastOpeningCharacter !== "[") {
          isCorrupted = true;
          break;
        }
      } else if (line[i] === "}") {
        const lastOpeningCharacter = openingCharacters.pop();

        if (lastOpeningCharacter !== "{") {
          isCorrupted = true;
          break;
        }
      } else if (line[i] === ">") {
        const lastOpeningCharacter = openingCharacters.pop();

        if (lastOpeningCharacter !== "<") {
          isCorrupted = true;
          break;
        }
      }
    }
    if (!isCorrupted) {
      const missingClosingCharacters = openingCharacters
        .map((character) => {
          if (character === "(") return ")";
          if (character === "[") return "]";
          if (character === "{") return "}";
          if (character === "<") return ">";
          throw new Error("Error!");
        })
        .reverse();

      const points = { ")": 1, "]": 2, "}": 3, ">": 4 };
      let totalScore = 0;

      for (const character of missingClosingCharacters) {
        totalScore = totalScore * 5;
        totalScore += points[character];
      }
      totalScoreArray.push(totalScore);
    }
  }
  totalScoreArray.sort((a, b) => a - b);
  const middleIndex = Math.floor(totalScoreArray.length / 2);

  return totalScoreArray[middleIndex];
};

console.log(syntaxErrorScore2(exampleNavigationInput));

// --- PART 2 --- //

console.log(syntaxErrorScore2(navigationInput));
