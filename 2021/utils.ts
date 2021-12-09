export const sumArray = (array: Array<number>) => {
  let distanceSum = 0;

  for (let i = 0; i < array.length; i++) {
    distanceSum += array[i];
  }
  return distanceSum;
};

export const convertToNumbers = (array: Array<string>) =>
  array.map((string) => parseInt(string, 10));
