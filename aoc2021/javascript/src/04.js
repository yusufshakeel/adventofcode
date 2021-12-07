'use strict';

const board5x5 = () => {
  let board = [];
  for (let r = 0; r < 5; r++) {
    board.push([0, 0, 0, 0, 0]);
  }
  return board;
};

const markBoard = (boardId, number, boards, boardsMap) => {
  let board = boards[boardId];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === number) {
        boardsMap[boardId][i][j] = 1;
      }
    }
  }
};

const isSolvedBoard = (boardId, boardsMap) => {
  let board = boardsMap[boardId];

  const VALID = '11111';

  // row check
  for (let r = 0; r < 5; r++) {
    const row = [...board[r]].join('');
    if (row === VALID) {
      return true;
    }
  }

  // col check
  for (let c = 0; c < 5; c++) {
    let col = '';
    for (let r = 0; r < 5; r++) {
      col += board[r][c];
    }
    if (col === VALID) {
      return true;
    }
  }
};

const sumUnMarkedCellsOfTheBoard = (boards, boardsMap, foundBoardId) => {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (boardsMap[foundBoardId][i][j] === 0) {
        sum += boards[foundBoardId][i][j];
      }
    }
  }
  return sum;
};

function part1(input) {
  const { order, boards } = input;
  const totalNumbers = order.length;
  const totalBoards = boards.length;
  const boardsMap = [];

  for (let i = 0; i < totalBoards; i++) {
    boardsMap.push(board5x5());
  }

  let foundBoardId;
  let foundNumber;

  for (let i = 0; i < totalNumbers && !foundBoardId; i++) {
    foundNumber = order[i];
    for (let j = 0; j < totalBoards; j++) {
      markBoard(j, foundNumber, boards, boardsMap);
    }
    for (let j = 0; j < totalBoards; j++) {
      if (isSolvedBoard(j, boardsMap)) {
        foundBoardId = j;
        break;
      }
    }
  }

  return sumUnMarkedCellsOfTheBoard(boards, boardsMap, foundBoardId) * foundNumber;
}

function part2(input) {
  const { order, boards } = input;
  const totalNumbers = order.length;
  const totalBoards = boards.length;
  const boardsMap = [];
  let solvedBoardIdsQueue = [];

  for (let i = 0; i < totalBoards; i++) {
    boardsMap.push(board5x5());
  }

  let foundBoardId;
  let foundNumber;

  for (let i = 0; i < totalNumbers && !foundBoardId; i++) {
    foundNumber = order[i];
    for (let j = 0; j < totalBoards; j++) {
      markBoard(j, foundNumber, boards, boardsMap);
    }
    for (let j = 0; j < totalBoards; j++) {
      if (!solvedBoardIdsQueue.includes(j) && isSolvedBoard(j, boardsMap)) {
        solvedBoardIdsQueue.push(j);
      }
      if (solvedBoardIdsQueue.length === totalBoards) {
        foundBoardId = solvedBoardIdsQueue[totalBoards - 1];
        break;
      }
    }
  }

  return sumUnMarkedCellsOfTheBoard(boards, boardsMap, foundBoardId) * foundNumber;
}

module.exports = { part1, part2 };
