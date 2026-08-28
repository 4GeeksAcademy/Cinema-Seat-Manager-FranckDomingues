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

/**
 * Reserves a seat in the cinema matrix.
 * Converts human-readable row and column (starting at 1)
 * to zero-based array indexes before accessing the matrix.
 * Returns true if the reservation succeeded, false if the seat
 * was already occupied.
 */
function reserveSeat(seats: number[][], row: number, column: number): boolean {
  const rowIndex = row - 1;
  const columnIndex = column - 1;

  if (seats[rowIndex][columnIndex] === 0) {
    seats[rowIndex][columnIndex] = 1;
    return true;
  } else {
    return false;
  }
}

/**
 * Counts occupied and available seats in the cinema matrix.
 * Returns a tuple where index 0 is the number of occupied seats
 * and index 1 is the number of available seats.
 * The original matrix is not modified.
 */
function countSeats(matrix: number[][]): [number, number] {
  let occupiedCount = 0;
  let availableCount = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) {
        occupiedCount++;
      } else {
        availableCount++;
      }
    }
  }

  return [occupiedCount, availableCount];
}

/**
 * Searches the cinema matrix for the first pair of horizontally
 * contiguous available seats.
 * Searches row by row, left to right.
 * Returns a tuple [rowIndex, columnIndex] of the first seat in the
 * pair, or null if no contiguous pair exists.
 * The original matrix is not modified.
 */
function findContiguousSeats(matrix: number[][]): [number, number] | null {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length - 1; col++) {
      if (matrix[row][col] === 0 && matrix[row][col + 1] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}

// Initialize the cinema room
const cinemaRoom = initializeSeatMatrix();

// Display the initial cinema room (all seats available)
console.log("Initial cinema room:");
displayCinemaRoom(cinemaRoom);

// Reserve a seat at Row 3, Column 4 (should succeed)
console.log("\n--- Attempt 1: Reserve seat at Row 3, Column 4 ---");
const firstAttempt = reserveSeat(cinemaRoom, 3, 4);
console.log(firstAttempt ? "✓ Reservation confirmed." : "✗ Seat already occupied.");

// Attempt to reserve the same seat again (should fail)
console.log("\n--- Attempt 2: Reserve seat at Row 3, Column 4 again ---");
const secondAttempt = reserveSeat(cinemaRoom, 3, 4);
console.log(secondAttempt ? "✓ Reservation confirmed." : "✗ Seat already occupied.");

// Display the updated cinema room
console.log("\nFinal cinema room:");
displayCinemaRoom(cinemaRoom);

// Count and display seat statistics
console.log("\n--- Seat Count ---");
const [occupied, available] = countSeats(cinemaRoom);
console.log(`Occupied seats: ${occupied}`);
console.log(`Available seats: ${available}`);
console.log(`Total seats: ${occupied + available}`);

// Search for contiguous available seats
console.log("\n--- Contiguous Seats ---");
const contiguousPair = findContiguousSeats(cinemaRoom);
if (contiguousPair !== null) {
  const [rowIndex, colIndex] = contiguousPair;
  const humanRow = rowIndex + 1;
  const humanCol1 = colIndex + 1;
  const humanCol2 = colIndex + 2;
  console.log(`Available contiguous seats: Row ${humanRow}, Seats ${humanCol1} and ${humanCol2}`);
} else {
  console.log("No contiguous seats available.");
}
