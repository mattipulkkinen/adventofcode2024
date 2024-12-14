#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 4 part 2 solution
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
    // 920 is too low
    // 1926 is too high
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
            if (hasSurroundingXmas(input, row, column)) {
                result += 1;
            }
        }
    }

    return result;
}

/**
 * Returns true if there is a X-MAS at the given coordinates. An X-MAS is two
 * MAS strings arranged in a cross shape.
 * @param {Input} input The puzzle input
 * @param {number} row The row to check
 * @param {number} column The column to check
 * @returns {boolean} True if there is an X-MAS at the given coordinates
 */
function hasSurroundingXmas(input, row, column) {
    const leadingDiagonal = `${input.at(row - 1, column - 1)}${input.at(row, column)}${input.at(row + 1, column + 1)}`;
    const counterDiagonal = `${input.at(row + 1, column - 1)}${input.at(row, column)}${input.at(row - 1, column + 1)}`;

    console.log(
        `(${row},${column})`,
        `leading diagonal: ${leadingDiagonal}; counter diagonal: ${counterDiagonal}`,
        `reverse leading diagonal: ${reverseString(leadingDiagonal)}; reverse counter diagonal: ${reverseString(counterDiagonal)}`,
        (leadingDiagonal === "MAS" && counterDiagonal === "MAS") ||
            (reverseString(leadingDiagonal) === "MAS" &&
                reverseString(counterDiagonal) === "MAS") ||
            (leadingDiagonal === "MAS" &&
                reverseString(counterDiagonal) === "MAS") ||
            (reverseString(leadingDiagonal) === "MAS" &&
                counterDiagonal === "MAS"),
    );

    return (
        (leadingDiagonal === "MAS" && counterDiagonal === "MAS") ||
        (reverseString(leadingDiagonal) === "MAS" &&
            reverseString(counterDiagonal) === "MAS") ||
        (leadingDiagonal === "MAS" &&
            reverseString(counterDiagonal) === "MAS") ||
        (reverseString(leadingDiagonal) === "MAS" && counterDiagonal === "MAS")
    );
}

/**
 * Returns the reverse of the string s.
 * @param {string} s The string to be reverse
 * @returns {string} The string s in reverse
 */
function reverseString(s) {
    let result = "";
    for (let i = s.length - 1; 0 <= i; i--) {
        result += s.at(i);
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
