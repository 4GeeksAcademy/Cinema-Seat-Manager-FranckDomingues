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

// Initialize the cinema room
const cinemaRoom = initializeSeatMatrix();

console.log("Cinema seat matrix initialized:", cinemaRoom);
console.log("Rows:", cinemaRoom.length, "Columns per row:", cinemaRoom[0].length);

export {};
