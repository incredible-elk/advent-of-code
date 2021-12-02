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

const foo = (courseArray: Array<string>) => {
  const distance = courseArray.filter((courseValue) =>
    courseValue.startsWith("forward ")
  );

  const depth = courseArray.filter(
    (courseValue) =>
      courseValue.startsWith("up ") || courseValue.startsWith("down ")
  );

  const distanceInNumbers = distance.map(extractNumberFromExampleCourseValue);

  const depthInNumbers = depth.map((courseValue) => {
    const courseValueNumber = extractNumberFromExampleCourseValue(courseValue);
    if (courseValue.startsWith("up")) {
      return -courseValueNumber;
    } else {
      return courseValueNumber;
    }
  });

  const sumDistance = sumArray(distanceInNumbers);
  const sumDepth = sumArray(depthInNumbers);
  return sumDistance * sumDepth;
};

console.log(foo(exampleCourseArray));

// --- PART 1 --- //

const course = await Deno.readTextFile("./input.txt");
const inputCourseArray = course.split("\n");

console.log(foo(inputCourseArray));
