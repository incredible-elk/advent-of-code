// --- UTILS --- //

const convertBinaryArrayToDecimal = (array: Array<string>) =>
  parseInt(array.join(""), 2);

// --- EXAMPLE PART 1 --- //

const exampleDiagnosticReport =
  "00100, 11110, 10110, 10111, 10101, 01111, 00111, 11100, 10000, 11001, 00010, 01010";
const exampleDiagnosticReportArray = exampleDiagnosticReport.split(", ");

const determinePowerConsumption = (diagnostics: Array<string>) => {
  const gammaRateArray = [];
  const epsilonRateArray = [];

  for (let i = 0; i < diagnostics[0].length; i++) {
    const filter1 = diagnostics.filter((number) => number.charAt(i) === "1");

    if (diagnostics.length / 2 < filter1.length) {
      gammaRateArray.push("1");
      epsilonRateArray.push("0");
    } else {
      gammaRateArray.push("0");
      epsilonRateArray.push("1");
    }
  }
  const gammaRate = convertBinaryArrayToDecimal(gammaRateArray);
  const epsilonRate = convertBinaryArrayToDecimal(epsilonRateArray);

  return gammaRate * epsilonRate;
};

console.log(determinePowerConsumption(exampleDiagnosticReportArray));

// --- PART 1 --- //

const diagnosticReport = await Deno.readTextFile("./input.txt");
const diagnosticReportArray = diagnosticReport.split("\n");

console.log(determinePowerConsumption(diagnosticReportArray));

// --- EXAMPLE PART 2 --- //

// --- PART 2 --- //
