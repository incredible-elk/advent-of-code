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
