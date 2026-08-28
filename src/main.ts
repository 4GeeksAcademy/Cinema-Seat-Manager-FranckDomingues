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

/**
 * Runs the completely full cinema test scenario.
 * Creates a fresh matrix and fills all 80 seats using the existing
 * reserveSeat() function. Verifies that counting reports 80 occupied
 * and 0 available, contiguous-seat search returns null, and a new
 * reservation attempt is rejected without changing the counts.
 */
function testFullCinemaScenario(): void {
  console.log("\n=== Full Cinema Scenario ===");

  // Initialize a fresh cinema matrix
  const fullRoom = initializeSeatMatrix();

  // Fill all 80 seats using the existing reservation function
  let reservedCount = 0;
  for (let row = 1; row <= 8; row++) {
    for (let col = 1; col <= 10; col++) {
      const result = reserveSeat(fullRoom, row, col);
      if (result) {
        reservedCount++;
      }
    }
  }
  console.log(`Initial reservations succeeded: ${reservedCount} (expected: 80)`);

  // Display the full room (every seat should be X)
  console.log("Cinema room:");
  displayCinemaRoom(fullRoom);

  // Count seats
  const [occupied, available] = countSeats(fullRoom);
  console.log(`\nOccupied seats: ${occupied} (expected: 80)`);
  console.log(`Available seats: ${available} (expected: 0)`);
  console.log(`Total seats: ${occupied + available} (expected: 80)`);
  console.log(`occupied + available === 80: ${occupied + available === 80 ? "✓ Yes" : "✗ No"}`);

  // Search for contiguous available seats
  console.log("\nSearching for contiguous available seats...");
  const pair = findContiguousSeats(fullRoom);
  if (pair === null) {
    console.log("Contiguous pair found: none (expected: none) ✓");
  } else {
    const [rowIndex, colIndex] = pair;
    const humanRow = rowIndex + 1;
    const humanCol1 = colIndex + 1;
    const humanCol2 = colIndex + 2;
    console.log(`Contiguous pair found: Row ${humanRow}, Seats ${humanCol1} and ${humanCol2} (expected: none) ✗`);
  }

  // Attempt a duplicate reservation at Row 1, Column 1
  console.log("\nAttempting reservation at Row 1, Column 1 (already occupied)...");
  const duplicateResult = reserveSeat(fullRoom, 1, 1);
  console.log(`Reservation rejected: ${duplicateResult === false ? "✓ Yes" : "✗ No"}`);

  // Verify counts remain unchanged after the rejected reservation
  const [occupiedAfter, availableAfter] = countSeats(fullRoom);
  console.log(`\nOccupied after rejected reservation: ${occupiedAfter} (expected: 80)`);
  console.log(`Available after rejected reservation: ${availableAfter} (expected: 0)`);
  console.log(`Counts unchanged: ${occupiedAfter === 80 && availableAfter === 0 ? "✓ Yes" : "✗ No"}`);
}

// Run the empty-cinema scenario
testEmptyCinemaScenario();

// Run the partially occupied cinema scenario
testPartiallyOccupiedCinemaScenario();

// Run the isolated available seats scenario
testIsolatedAvailableSeatsScenario();

// Run the full cinema scenario
testFullCinemaScenario();

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

// --- Optional Web UI (browser only) ---
if (typeof document !== "undefined") {
  const seatMapContainer = document.getElementById("seat-map");
  const statusMessageEl = document.getElementById("status-message");

  // Visual row labels (A-H) for presentation only — underlying matrix uses numeric indexes
  const ROW_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

  /**
   * Renders the cinema seat matrix into the browser #seat-map container.
   * Creates 8 visual rows with 10 seat buttons each, column labels,
   * letter row labels (A-H), central aisle spacing, and accessibility metadata.
   * The matrix is the source of truth — rendering does not mutate state.
   */
  function renderSeatMap(seats: number[][]): void {
    if (!seatMapContainer) return;

    // Clear previous content
    seatMapContainer.innerHTML = "";

    const ROWS = seats.length;
    const COLS = seats[0].length;

    // --- Column labels row ---
    const colLabelsRow = document.createElement("div");
    colLabelsRow.className = "col-labels";

    // Spacer aligned with the row-label column
    const colLabelSpacer = document.createElement("div");
    colLabelSpacer.className = "row-label";
    colLabelsRow.appendChild(colLabelSpacer);

    for (let col = 0; col < COLS; col++) {
      const label = document.createElement("div");
      label.className = "col-label";
      label.textContent = String(col + 1);
      colLabelsRow.appendChild(label);
    }
    seatMapContainer.appendChild(colLabelsRow);

    // --- Seat rows ---
    for (let row = 0; row < ROWS; row++) {
      const rowContainer = document.createElement("div");
      rowContainer.className = "seat-row";

      // Row label (letter A-H for visual presentation)
      const rowLabel = document.createElement("div");
      rowLabel.className = "row-label";
      rowLabel.textContent = ROW_LETTERS[row];
      rowContainer.appendChild(rowLabel);

      for (let col = 0; col < COLS; col++) {
        const value = seats[row][col];
        const isAvailable = value === 0;

        const seatBtn = document.createElement("button");
        seatBtn.type = "button";

        // Zero-based matrix coordinates for future interaction
        seatBtn.dataset.row = String(row);
        seatBtn.dataset.column = String(col);

        // Accessible label using letter row, numeric column, and state
        const humanRow = ROW_LETTERS[row];
        const humanCol = col + 1;
        const stateLabel = isAvailable ? "available" : "occupied";
        const ariaLabel = `Row ${humanRow}, Seat ${humanCol}, ${stateLabel}`;
        seatBtn.setAttribute("aria-label", ariaLabel);

        // Store full label for hover tooltip
        seatBtn.setAttribute("data-aria-label", ariaLabel);

        // Base seat class
        seatBtn.className = "seat-btn";

        if (isAvailable) {
          seatBtn.classList.add("seat-btn--available");

          // Click handler: reserve seat using existing business logic
          seatBtn.addEventListener("click", function () {
            // Convert zero-based metadata to 1-based human coordinates
            const matrixRow = Number(this.dataset.row) + 1;
            const matrixCol = Number(this.dataset.column) + 1;

            // Call the existing reserveSeat function
            const success = reserveSeat(seats, matrixRow, matrixCol);

            if (success) {
              renderSeatMap(seats);
              if (statusMessageEl) {
                statusMessageEl.textContent = `Row ${ROW_LETTERS[matrixRow - 1]}, Seat ${matrixCol} reserved.`;
              }
            } else {
              if (statusMessageEl) {
                statusMessageEl.textContent = `Row ${ROW_LETTERS[matrixRow - 1]}, Seat ${matrixCol} is already occupied.`;
              }
            }
          });
        } else {
          seatBtn.classList.add("seat-btn--occupied");
          seatBtn.disabled = true;
        }

        // Aisle spacing: add gap after column 5 (index 4) — but NOT on column 5 itself
        // The margin-right on the seat element at index 4 creates visual space before
        // the next seat (index 5), which is the first seat after the aisle.
        if (col === 4) {
          seatBtn.classList.add("seat-aisle-gap");
        }

        rowContainer.appendChild(seatBtn);
      }

      seatMapContainer.appendChild(rowContainer);
    }
  }

  // Initialize browser seat matrix from existing core logic
  const webCinemaSeats = initializeSeatMatrix();

  // Render the initial seat map (all 80 seats available)
  renderSeatMap(webCinemaSeats);

  if (statusMessageEl) {
    statusMessageEl.textContent = "Ready to select a seat.";
  }

  // Update the page title
  document.title = "Cinema Seat Manager";
}
