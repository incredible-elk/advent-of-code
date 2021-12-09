export const sumArray = (array: Array<number>) => {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
};

export const convertToNumbers = (array: Array<string>) =>
  array.map((string) => parseInt(string, 10));
