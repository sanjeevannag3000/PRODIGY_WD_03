const cells = document.querySelectorAll('.cell');
const currentPlayerEl = document.getElementById('current-player');
const gameStatusEl = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let board = ["", "", "", "", "", "", "", "", ""]; // Game board array
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Initialize game
resetGame();

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  const cellIndex = parseInt(event.target.dataset.index);

  // If cell is already filled or game is over, do nothing
  if (board[cellIndex] !== "" || !gameActive) {
    return;
  }

  // Place the current player's mark
  board[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());
  event.target.classList.add('disabled');

  // Check for a win
  if (checkWin()) {
    gameStatusEl.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check for a draw
  if (checkDraw()) {
    gameStatusEl.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch to the other player
  switchPlayer();
}

function checkWin() {
  for (const combination of winningCombinations) {
    if (
      board[combination[0]] === currentPlayer &&
      board[combination[1]] === currentPlayer &&
      board[combination[2]] === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerEl.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  currentPlayerEl.textContent = `Player ${currentPlayer}'s turn`;
  gameStatusEl.textContent = "";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("disabled");
  });
}