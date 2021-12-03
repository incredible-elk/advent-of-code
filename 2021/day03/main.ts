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

// for example input see EXAMPLE PART 1 Line 8-10

const determineLifeSupportRating = (diagnostics: Array<string>) => {
  let oxygenGeneratorRatingArray = diagnostics;
  let co2ScrubberRatingArray = diagnostics;

  for (let i = 0; i < diagnostics[0].length; i++) {
    if (oxygenGeneratorRatingArray.length > 1) {
      const oxyFilter1 = oxygenGeneratorRatingArray.filter(
        (number) => number.charAt(i) === "1"
      );
      const oxyFilter0 = oxygenGeneratorRatingArray.filter(
        (number) => number.charAt(i) === "0"
      );

      if (oxyFilter1.length >= oxyFilter0.length) {
        oxygenGeneratorRatingArray = oxyFilter1;
      } else if (oxyFilter1.length <= oxyFilter0.length) {
        oxygenGeneratorRatingArray = oxyFilter0;
      }
    }

    if (co2ScrubberRatingArray.length > 1) {
      const co2Filter1 = co2ScrubberRatingArray.filter(
        (number) => number.charAt(i) === "1"
      );
      const co2Filter0 = co2ScrubberRatingArray.filter(
        (number) => number.charAt(i) === "0"
      );

      if (co2Filter1.length >= co2Filter0.length) {
        co2ScrubberRatingArray = co2Filter0;
      } else if (co2Filter1.length <= co2Filter0.length) {
        co2ScrubberRatingArray = co2Filter1;
      }
    }
  }
  const oxygenGeneratorRating = convertBinaryArrayToDecimal(
    oxygenGeneratorRatingArray
  );
  const co2ScrubberRating = convertBinaryArrayToDecimal(co2ScrubberRatingArray);

  return oxygenGeneratorRating * co2ScrubberRating;
};

console.log(determineLifeSupportRating(exampleDiagnosticReportArray));

// --- PART 2 --- //

console.log(determineLifeSupportRating(diagnosticReportArray));
