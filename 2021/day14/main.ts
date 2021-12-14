export {};

// --- UTILS --- //

const parseInput = (input: string) => {
  const [polymerTemplateInput, pairInsertionRulesInput] = input
    .trim()
    .split("\n\n");
  const polymerTemplate = polymerTemplateInput;
  const pairInsertionRules: Record<string, string> = Object.fromEntries(
    pairInsertionRulesInput.split("\n").map((rule) => rule.split(" -> "))
  );

  return { polymerTemplate, pairInsertionRules };
};

// --- EXAMPLE PART 1 --- //

const examplePolymerizationInput = `
NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

const examplePolymerization = parseInput(examplePolymerizationInput);

const polymerGrowth = (input: {
  polymerTemplate: string;
  pairInsertionRules: Record<string, string>;
}) => {
  let polymer = input.polymerTemplate;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < polymer.length - 1; j += 2) {
      const pair = polymer.charAt(j) + polymer.charAt(j + 1);
      const letterToInsert = input.pairInsertionRules[pair];
      const polymerStart = polymer.substring(0, j + 1);
      const polymerEnd = polymer.substring(j + 1);
      polymer = polymerStart + letterToInsert + polymerEnd;
    }
  }

  const letterCounters: Record<string, number> = {};
  for (let k = 0; k < polymer.length; k++) {
    const letterToCount = polymer.charAt(k);

    if (letterCounters[letterToCount] === undefined) {
      letterCounters[letterToCount] = 0;
    }

    letterCounters[letterToCount]++;
  }

  const ammountArray = Object.values(letterCounters);

  const leastCommon = Math.min(...ammountArray);
  const mostCommon = Math.max(...ammountArray);

  return mostCommon - leastCommon;
};

console.log(polymerGrowth(examplePolymerization));

// --- PART 1 --- //

const polymerizationInput = await Deno.readTextFile("input.txt");

const polymerization = parseInput(polymerizationInput);

console.log(polymerGrowth(polymerization));
