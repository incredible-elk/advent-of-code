// --- UTILS --- //

const sumArray = (array: Array<number>) => {
  let distanceSum = 0;

  for (let i = 0; i < array.length; i++) {
    distanceSum += array[i];
  }
  return distanceSum;
};

const extractNumberFromExampleCourseValue = (courseValue: string) =>
  parseInt(courseValue.slice(courseValue.indexOf(" ") + 1), 10);

// --- EXAMPLE PART 1 --- //

const exampleCourse = "forward 5, down 5, forward 8, up 3, down 8, forward 2";
const exampleCourseArray = exampleCourse.split(", ");

const sumUpCourseValues = (
  courseArray: Array<string>,
  courseValueStartsWith: string
) => {
  const filteredCourseValues = courseArray.filter((courseValue) =>
    courseValue.startsWith(courseValueStartsWith)
  );
  const numbers = filteredCourseValues.map(extractNumberFromExampleCourseValue);
  return sumArray(numbers);
};

const newSubmarinePosition = (courseArray: Array<string>) => {
  const sumDistance = sumUpCourseValues(courseArray, "forward ");
  const sumUpDepth = sumUpCourseValues(courseArray, "up ");
  const sumDownDepth = sumUpCourseValues(courseArray, "down ");
  const sumDepth = sumDownDepth - sumUpDepth;
  return sumDistance * sumDepth;
};
console.log(newSubmarinePosition(exampleCourseArray));

// --- PART 1 --- //

const course = await Deno.readTextFile("./input.txt");
const inputCourseArray = course.split("\n");

console.log(newSubmarinePosition(inputCourseArray));
