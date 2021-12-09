import { sumArray, convertToNumbers } from "../utils.ts";

// --- EXAMPLE PART 1 --- //

const exampleInputDrawingNumbers =
  "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1";
const exampleDrawingNumbers = convertToNumbers(
  exampleInputDrawingNumbers.split(",")
);

const exampleInputBoardsString = `
22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const convertStringToBingoBoardArrays = (input: string) => {
  const inputBoards = input.split("\n\n");
  const inputBoardRows = inputBoards.map((string) => string.trim().split("\n"));
  const convertedInputBoardRows = inputBoardRows.map((boardStrings) =>
    boardStrings.map((string) => convertToNumbers(string.trim().split(/ +/)))
  );
  return convertedInputBoardRows;
};

const playBingo = (boards: number[][][], drawingNumbers: Array<number>) => {
  let playedBoards: (number | "x")[][][] = boards;

  for (let i = 0; i < drawingNumbers.length; i++) {
    playedBoards = playedBoards.map((board) =>
      board.map((boardRow) =>
        boardRow.map((number) => (number === drawingNumbers[i] ? "x" : number))
      )
    );

    const winningBoard = playedBoards.find(
      (board) =>
        board.some((boardRow) => boardRow.every((number) => number === "x")) ||
        board[0].some((_, columnIndex) =>
          board.every((boardRow) => boardRow[columnIndex] === "x")
        )
    );

    if (winningBoard !== undefined) {
      const winningBoardLeftoverNumbers = winningBoard.map((boardRow) =>
        boardRow.map((number) => (number !== "x" ? number : 0))
      );

      const winningBoardRowSums = winningBoardLeftoverNumbers.map((boardRow) =>
        sumArray(boardRow)
      );
      const winningBoardSum = sumArray(winningBoardRowSums);
      return winningBoardSum * drawingNumbers[i];
    }
  }
  throw new Error("no winner found");
};

console.log(
  playBingo(
    convertStringToBingoBoardArrays(exampleInputBoardsString),
    exampleDrawingNumbers
  )
);

// --- PART 1 --- //

const inputBingoSystem = await Deno.readTextFile("./input.txt");

const seperatorIndex = inputBingoSystem.indexOf("\n");

const inputDrawingNumbers = inputBingoSystem.substring(0, seperatorIndex);
const squidGameDrawingNumbers = convertToNumbers(
  inputDrawingNumbers.split(",")
);

const inputBoardsString = inputBingoSystem.substring(seperatorIndex + 2);
const squidGameBoards = convertStringToBingoBoardArrays(inputBoardsString);

console.log(playBingo(squidGameBoards, squidGameDrawingNumbers));

// --- EXAMPLE PART 2 --- //

const looseBingo = (boards: number[][][], drawingNumbers: Array<number>) => {
  let playedBoards: (number | "x")[][][] = boards;

  for (let i = 0; i < drawingNumbers.length; i++) {
    playedBoards = playedBoards.map((board) =>
      board.map((boardRow) =>
        boardRow.map((number) => (number === drawingNumbers[i] ? "x" : number))
      )
    );

    let lastBoard = undefined;

    if (playedBoards.length === 1) {
      lastBoard = playedBoards[0];
    }

    playedBoards = playedBoards.filter(
      (board) =>
        !(
          board.some((boardRow) =>
            boardRow.every((number) => number === "x")
          ) ||
          board[0].some((_, columnIndex) =>
            board.every((boardRow) => boardRow[columnIndex] === "x")
          )
        )
    );

    if (playedBoards.length === 0) {
      if (!lastBoard) throw new Error("no last board found!");
      const winningBoardLeftoverNumbers = lastBoard.map((boardRow) =>
        boardRow.map((number) => (number !== "x" ? number : 0))
      );

      const winningBoardRowSums = winningBoardLeftoverNumbers.map((boardRow) =>
        sumArray(boardRow)
      );
      const winningBoardSum = sumArray(winningBoardRowSums);
      return winningBoardSum * drawingNumbers[i];
    }
  }
  throw new Error("no winner found");
};

console.log(
  looseBingo(
    convertStringToBingoBoardArrays(exampleInputBoardsString),
    exampleDrawingNumbers
  )
);

// --- PART 2 --- //

console.log(looseBingo(squidGameBoards, squidGameDrawingNumbers));
