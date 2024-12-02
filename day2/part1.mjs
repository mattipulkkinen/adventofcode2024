#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 2 part 1 solution
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
    const INPUT_FILENAME = "input.txt";
    const input_file_lines = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .split("\n");

    const count = input_file_lines
        .reduce((acc, line) => acc + (isReportSafe(line) ? 1 : 0), 0);

    console.log(count);
}

/**
 * Returns true if the report is considered safe.
 *
 * @param {string} report The report to be examined.
 * @returns {boolean} True if the report is considered safe.
 */
function isReportSafe(report) {
    const levels = report
        .split(/\s+/)
        .map(n => Number(n));
    const GREATEST_ALLOWED_DIFFERENCE = 3;
    const levelsIncreasing = levels[1] > levels[0];

    for (let i = 1; i < levels.length; i++) {
        let current = levels[i];
        let previous = levels[i - 1];

        let difference = Math.abs(current - previous);
        if (current === previous
            || difference > GREATEST_ALLOWED_DIFFERENCE
            || levelsIncreasing && current < previous
            || !levelsIncreasing && current > previous) {
            return false;
        }
    }
    return true;
}

main();
