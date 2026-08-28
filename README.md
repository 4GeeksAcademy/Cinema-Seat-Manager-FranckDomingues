# Cinema Seat Manager

> A command-line seat reservation prototype built with TypeScript — organized by [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![twitter](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=twitter)](https://twitter.com/4geeksacademy)

*Estas instrucciones están disponibles en [español](./README.es.md).*

---

## Project Overview

A small cinema needs a simple seat reservation system. The room has **8 rows** and **10 seats per row**, for a total of **80 seats**. This project builds the core reservation logic in TypeScript, focusing on a command-line / logic-first prototype.

The goal is to practice fundamental programming concepts by implementing a realistic two-dimensional data structure and the operations needed to manage it.

## Learning Objectives

- Working with **two-dimensional arrays (matrices)**
- Writing and composing **functions**
- Using **parameters** and **return values**
- **Nested loops** for traversing rows and columns
- **Conditional logic** for validation and display
- **Data validation** before performing operations
- **Searching through matrices** for patterns

## Seat Representation

Each seat in the cinema is represented by a numeric value inside a two-dimensional array:

| Value | Meaning   | Display |
|-------|-----------|---------|
| `0`   | Available | `L`     |
| `1`   | Occupied  | `X`     |

- The outer array represents the **rows** (0–7).
- Each inner array represents the **seats in a row** (0–9).
- A seat is **free** when its value is `0` and is displayed as **L**.
- A seat is **occupied** when its value is `1` and is displayed as **X**.

## Core Requirements

- [x] Initialize an 8 × 10 seat matrix with all seats free (value `0`).
- [x] Display the cinema room in the console with row and column numbers.
- [x] Display occupied seats as **X** and free seats as **L**.
- [x] Reserve a seat using row and column coordinates.
- [x] Validate whether a seat is already occupied before reserving it.
- [x] Return a clear success or failure message for a reservation attempt.
- [x] Count the total number of occupied seats.
- [x] Count the total number of available seats.
- [x] Find the first pair of horizontally contiguous free seats.
- [x] Return the positions of the first available contiguous pair.
- [x] Report clearly when no contiguous pair exists.

### Advanced: Contiguous Seats

Beyond individual reservations, the system must be able to find the **first pair of horizontally adjacent free seats** in the cinema. This is useful for customers who want to sit together. The search should scan left to right, top to bottom, and return the coordinates of the first matching pair or a clear message that none are available.

## Test Scenarios

The implementation must be tested against the following scenarios:

1. **Empty cinema** — All seats are free (initial state).
2. **Partially occupied cinema** — Some seats reserved, some still free.
3. **Almost full cinema with isolated seats** — Only single free seats remain, no adjacent pairs.
4. **Completely full cinema** — Every seat is occupied.

## Project Constraints

> ⚠️ **Important** — These constraints must be followed during implementation:

- **Do NOT** use classes for the cinema seat data model.
- **Do NOT** use objects to represent individual seats.
- The seat layout **must** be represented using a **two-dimensional array** (a matrix).
- Use **functions, parameters, return values, loops, and conditionals**.
- Keep variable and function names **meaningful**.
- Keep console output **understandable**.
- **Do not** add unnecessary abstractions.

## Project Structure

```
├── index.html          # HTML shell (for future UI use)
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite bundler configuration
├── README.md           # This file
├── README.es.md        # Spanish translation
├── public/             # Static assets
└── src/
    ├── main.ts         # TypeScript entry point
    ├── style.css       # Styles (Tailwind CSS v4)
    └── vite-env.d.ts   # Vite type declarations
```

## Running the Project

```bash
# Install dependencies
npm install

# Start the development server (with hot reload)
npm run start

# Run only the TypeScript type check
npm run typecheck

# Execute main.ts in the terminal (console output)
npm run console
```

## Development Roadmap

| Phase | Focus                                      |
|-------|--------------------------------------------|
| 0     | Project initialization and documentation   |
| 1     | Initialize the 8 × 10 seat matrix          |
| 2     | Render the cinema room                     |
| 3     | Reserve seats                              |
| 4     | Add reservation validation                 |
| 5     | Count occupied and available seats         |
| 6     | Find contiguous seats                      |
| 7     | Test required scenarios                    |
| 8     | Final cleanup and validation               |

## Current Status

- **Current phase:** Phase 7 (Required scenario testing complete)
- **Status:** All required cinema scenarios verified — empty, partially occupied, isolated available seats, and completely full
- **Next phase:** Phase 8 — Final cleanup and validation
- The `testFullCinemaScenario()` function creates a fresh 8 × 10 matrix and fills all 80 seats using the existing `reserveSeat()` function. It verifies that counting reports 80 occupied and 0 available (total 80), the contiguous-seat search returns no pair (`null`), and a duplicate reservation attempt at Row 1, Column 1 is correctly rejected without altering the seat counts. The empty, partially occupied, and isolated available-seat scenarios also pass independently. All existing features work correctly and do not mutate the matrix.

## Optional Future Work

- Visual web seat map with an interactive layout.
- Click-based seat selection using the HTML shell.

> ⚠️ The web interface is entirely optional and is **not** part of the current required implementation. It should only be explored after the core TypeScript logic is fully complete and tested.

---

<p align="center">
  <small>Made with ❤️ at 4Geeks Academy</small>
</p>
