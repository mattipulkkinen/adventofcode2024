#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 4 part 1 solution
// Copyright (C) 2024 Matti Pulkkinen
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import fs from "node:fs";

function main() {
    const INPUT_FILENAME = `${import.meta.dirname}/input.txt`;
    const input = new Input(
        fs.readFileSync(INPUT_FILENAME, { encoding: "utf8" }),
    );

    const result = countTotalXmases(input);
    console.log(result);
}

/**
 * Counts the total number of XMASes in the input.
 * @param {Input} input The input
 * @returns {number} The total number of XMASes in the input
 */
function countTotalXmases(input) {
    let result = 0;

    for (let row = 0; row < input.width; row++) {
        for (let column = 0; column < input.height; column++) {
            result += countSurroundingXmases(input, row, column);
        }
    }

    return result;
}

/**
 * Counts the instances of the string "XMAS" in the input around the
 * given coordinates.
 *
 * @param {Input} input The puzzle input
 * @param {number} row The row where an X character was found
 * @param {number} column The column where an X character was found
 * @returns {number} The count of instances of the string XMAS around these
 *     coordinates
 */
function countSurroundingXmases(input, row, column) {
    let result = 0;

    if (input.at(row, column) !== "X") {
        return result;
    }

    // Cast a three-slot long ray into all the compass directions, starting
    // from (row, column), and see if the ray covers the letters M, A, and S
    // in that order. If they do, and assuming (row, column) is an X, we've
    // found an XMAS and can increment our counter.
    for (let rowDelta = -1; rowDelta <= 1; rowDelta++) {
        for (let columnDelta = -1; columnDelta <= 1; columnDelta++) {
            if (
                input.at(row + rowDelta, column + columnDelta) === "M" &&
                input.at(row + rowDelta * 2, column + columnDelta * 2) ===
                    "A" &&
                input.at(row + rowDelta * 3, column + columnDelta * 3) === "S"
            ) {
                result += 1;
            }
        }
    }

    return result;
}

class Input {
    /**
     * @param {string} input The puzzle input
     */
    constructor(input) {
        const input_lines = input.trim().split("\n");

        /**
         * The width of the input
         * @type {number}
         * @public
         */
        this.width = input_lines.at(0).length;
        /**
         * The height of the input
         * @type {number}
         * @public
         */
        this.height = input_lines.length;
        /**
         * The input itself
         * @type {string}
         * @public
         */
        this.input = input_lines.join("");
    }

    /**
     * Returns the character at the given row and column of the input.
     * @param {number} row The row
     * @param {number} column The column
     * @returns {string} The character at the given coordinates
     */
    at(row, column) {
        if (
            0 <= row &&
            row <= this.height &&
            0 <= column &&
            column <= this.width
        ) {
            return this.input.at(row * this.width + column);
        } else {
            return null;
        }
    }
}

main();
