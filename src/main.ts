/**
 * Creates and returns the initial cinema seat matrix.
 * The cinema has 8 rows and 10 seats per row.
 * Every seat starts as available (value 0).
 */
function initializeSeatMatrix(): number[][] {
  const ROWS = 8;
  const COLUMNS = 10;
  const matrix: number[][] = [];

  for (let row = 0; row < ROWS; row++) {
    const seatRow: number[] = [];
    for (let col = 0; col < COLUMNS; col++) {
      seatRow.push(0);
    }
    matrix.push(seatRow);
  }

  return matrix;
}

/**
 * Displays the current cinema room in the console.
 * Shows column numbers across the top and row numbers on the left.
 * 0 (available) is displayed as L.
 * 1 (occupied) is displayed as X.
 * The original matrix is not modified.
 */
function displayCinemaRoom(matrix: number[][]): void {
  const ROWS = matrix.length;
  const COLUMNS = matrix[0].length;

  // Build the column header
  let header = "   ";
  for (let col = 0; col < COLUMNS; col++) {
    header += (col + 1) + " ";
  }
  console.log(header);

  // Display each row
  for (let row = 0; row < ROWS; row++) {
    let rowDisplay = (row + 1) + "  ";
    for (let col = 0; col < COLUMNS; col++) {
      if (matrix[row][col] === 1) {
        rowDisplay += "X ";
      } else {
        rowDisplay += "L ";
      }
    }
    console.log(rowDisplay);
  }
}

// Initialize the cinema room
const cinemaRoom = initializeSeatMatrix();

// Display the cinema room
displayCinemaRoom(cinemaRoom);
