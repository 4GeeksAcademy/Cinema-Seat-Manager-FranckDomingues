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

/**
 * Runs the empty-cinema test scenario.
 * Creates a fresh 8 x 10 matrix with all seats available
 * and verifies that initialization, display, counting,
 * and contiguous-seat search all behave as expected.
 */
function testEmptyCinemaScenario(): void {
  console.log("\n=== Empty Cinema Scenario ===");

  // Initialize a fresh cinema matrix
  const emptyRoom = initializeSeatMatrix();

  // Verify matrix dimensions
  console.log(`Rows: ${emptyRoom.length} (expected: 8)`);
  console.log(`Columns per row: ${emptyRoom[0].length} (expected: 10)`);

  // Display the empty room (every seat should be L)
  console.log("Cinema room:");
  displayCinemaRoom(emptyRoom);

  // Count occupied and available seats
  const [occupied, available] = countSeats(emptyRoom);
  console.log(`Occupied seats: ${occupied} (expected: 0)`);
  console.log(`Available seats: ${available} (expected: 80)`);
  console.log(`Total seats: ${occupied + available} (expected: 80)`);

  // Search for contiguous available seats
  const pair = findContiguousSeats(emptyRoom);
  if (pair !== null) {
    const [rowIndex, colIndex] = pair;
    const humanRow = rowIndex + 1;
    const humanCol1 = colIndex + 1;
    const humanCol2 = colIndex + 2;
    console.log(`First contiguous pair: Row ${humanRow}, Seats ${humanCol1} and ${humanCol2} (expected: Row 1, Seats 1 and 2)`);
  }

  // Confirm all seats remain unchanged
  console.log(`All seats remain available: ${available === 80 ? "✓ Yes" : "✗ No"}`);
}

/**
 * Runs the partially occupied cinema test scenario.
 * Creates a fresh matrix and reserves a controlled set of seats
 * to verify reservation, duplicate validation, counting,
 * visualization, and contiguous-seat search with a mixed state.
 */
function testPartiallyOccupiedCinemaScenario(): void {
  console.log("\n=== Partially Occupied Cinema Scenario ===");

  // Initialize a fresh cinema matrix
  const partialRoom = initializeSeatMatrix();

  // Reserve 6 specific seats using the existing reservation function
  console.log("Reserving 6 seats...");
  const r1 = reserveSeat(partialRoom, 1, 1);
  const r2 = reserveSeat(partialRoom, 1, 2);
  const r3 = reserveSeat(partialRoom, 2, 4);
  const r4 = reserveSeat(partialRoom, 3, 4);
  const r5 = reserveSeat(partialRoom, 4, 6);
  const r6 = reserveSeat(partialRoom, 5, 8);
  console.log(`All reservations succeeded: ${r1 && r2 && r3 && r4 && r5 && r6 ? "✓ Yes" : "✗ No"}`);

  // Display the partial room
  console.log("Cinema room:");
  displayCinemaRoom(partialRoom);

  // Count seats
  const [occupied, available] = countSeats(partialRoom);
  console.log(`\nOccupied seats: ${occupied} (expected: 6)`);
  console.log(`Available seats: ${available} (expected: 74)`);
  console.log(`Total seats: ${occupied + available} (expected: 80)`);
  console.log(`occupied + available === 80: ${occupied + available === 80 ? "✓ Yes" : "✗ No"}`);

  // Attempt duplicate reservation at Row 3, Column 4
  console.log("\nAttempting duplicate reservation at Row 3, Column 4...");
  const duplicateResult = reserveSeat(partialRoom, 3, 4);
  console.log(`Duplicate reservation rejected: ${duplicateResult === false ? "✓ Yes" : "✗ No"}`);

  // Count again to confirm occupied count did not change
  const [occupiedAfter, availableAfter] = countSeats(partialRoom);
  console.log(`Occupied after duplicate attempt: ${occupiedAfter} (expected: ${occupied})`);
  console.log(`Duplicate did not change count: ${occupiedAfter === occupied ? "✓ Yes" : "✗ No"}`);

  // Search for contiguous available seats
  console.log("\nSearching for contiguous available seats...");
  const pair = findContiguousSeats(partialRoom);
  if (pair !== null) {
    const [rowIndex, colIndex] = pair;
    const humanRow = rowIndex + 1;
    const humanCol1 = colIndex + 1;
    const humanCol2 = colIndex + 2;
    console.log(`First contiguous pair: Row ${humanRow}, Seats ${humanCol1} and ${humanCol2} (expected: Row 1, Seats 3 and 4)`);
  }
}

/**
 * Runs the isolated available seats test scenario.
 * Creates a fresh matrix and occupies all seats except 8 predefined
 * positions that are arranged so no two free seats are horizontally
 * adjacent. Verifies that the contiguous-seat search correctly
 * returns no pair despite available seats existing.
 */
function testIsolatedAvailableSeatsScenario(): void {
  console.log("\n=== Isolated Available Seats Scenario ===");

  // Initialize a fresh cinema matrix
  const isolatedRoom = initializeSeatMatrix();

  // List of positions (row, column in human numbering) that should stay free
  const freeSeats: string[] = [
    "1-2", "2-4", "3-6", "4-8",
    "5-10", "6-1", "7-5", "8-9"
  ];

  // Reserve every seat that is NOT in the free list
  let reservedCount = 0;
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 10; col++) {
      const key = row + "-" + col;
      if (!freeSeats.includes(key)) {
        reserveSeat(isolatedRoom, row, col);
        reservedCount++;
      }
    }
  }
  console.log(`Reserved ${reservedCount} seats (expected: 72)`);
  console.log(`Seats intentionally left free: ${freeSeats.length} (expected: 8)`);

  // Display the almost-full room
  console.log("Cinema room:");
  displayCinemaRoom(isolatedRoom);

  // Count seats
  const [occupied, available] = countSeats(isolatedRoom);
  console.log(`\nOccupied seats: ${occupied} (expected: 72)`);
  console.log(`Available seats: ${available} (expected: 8)`);
  console.log(`Total seats: ${occupied + available} (expected: 80)`);
  console.log(`occupied + available === 80: ${occupied + available === 80 ? "✓ Yes" : "✗ No"}`);

  // Search for contiguous available seats
  console.log("\nSearching for contiguous available seats...");
  const pair = findContiguousSeats(isolatedRoom);
  if (pair === null) {
    console.log("Contiguous pair found: none (expected: none) ✓");
  } else {
    const [rowIndex, colIndex] = pair;
    const humanRow = rowIndex + 1;
    const humanCol1 = colIndex + 1;
    const humanCol2 = colIndex + 2;
    console.log(`Contiguous pair found: Row ${humanRow}, Seats ${humanCol1} and ${humanCol2} (expected: none) ✗`);
  }

  // Confirm no free seats are horizontally adjacent
  console.log("\nChecking isolated seat isolation...");
  let allIsolated = true;
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 9; col++) {
      const key = row + "-" + col;
      const nextKey = row + "-" + (col + 1);
      if (freeSeats.includes(key) && freeSeats.includes(nextKey)) {
        console.log(`✗ Seats Row ${row}, ${col} and ${col + 1} are both free!`);
        allIsolated = false;
      }
    }
  }
  console.log(`All free seats horizontally isolated: ${allIsolated ? "✓ Yes" : "✗ No"}`);
}

// Run the empty-cinema scenario
testEmptyCinemaScenario();

// Run the partially occupied cinema scenario
testPartiallyOccupiedCinemaScenario();

// Run the isolated available seats scenario
testIsolatedAvailableSeatsScenario();

// Initialize the cinema room for the main demonstration
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
