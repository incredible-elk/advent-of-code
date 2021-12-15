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

const polymerGrowth = (
  input: {
    polymerTemplate: string;
    pairInsertionRules: Record<string, string>;
  },
  numberOfIterations: number
) => {
  const template = input.polymerTemplate;

  let pairCounters: Record<string, number> = {};

  for (let j = 0; j < template.length - 1; j++) {
    const pair = template.charAt(j) + template.charAt(j + 1);

    pairCounters[pair] ??= 0;
    pairCounters[pair]++;
  }

  for (let i = 0; i < numberOfIterations; i++) {
    const pairsAndCounters = Object.entries(pairCounters);

    pairCounters = {};

    for (const [pair, count] of pairsAndCounters) {
      const letterToInsert = input.pairInsertionRules[pair];
      const pair1 = pair.charAt(0) + letterToInsert;
      const pair2 = letterToInsert + pair.charAt(1);

      pairCounters[pair1] ??= 0;
      pairCounters[pair1] += count;

      pairCounters[pair2] ??= 0;
      pairCounters[pair2] += count;
    }
  }
  const lastTemplateLetter = template.charAt(template.length - 1);
  const letterCounters: Record<string, number> = {};
  letterCounters[lastTemplateLetter] = 1; // last letter is never charAt(0) in pair

  for (const [pair, count] of Object.entries(pairCounters)) {
    const letterToCount = pair.charAt(0);

    letterCounters[letterToCount] ??= 0;
    letterCounters[letterToCount] += count;
  }

  const ammountArray = Object.values(letterCounters);

  const leastCommon = Math.min(...ammountArray);
  const mostCommon = Math.max(...ammountArray);

  return mostCommon - leastCommon;
};

console.log(polymerGrowth(examplePolymerization, 10));

// --- PART 1 --- //

const polymerizationInput = await Deno.readTextFile("input.txt");

const polymerization = parseInput(polymerizationInput);

console.log(polymerGrowth(polymerization, 10));

// --- EXAMPLE PART 2 --- //

console.log(polymerGrowth(examplePolymerization, 40));

// --- PART 2 --- //

console.log(polymerGrowth(polymerization, 40));
