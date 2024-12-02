#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 2 part 2 solution
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

    let count = 0;
    for (let line of input_file_lines) {
        const levels = line
            .split(/\s+/)
            .map(n => Number(n));

        if (isReportSafe(levels)) {
            count++;
        }
    }

    // 587 is too low
    console.log(count);
}

/**
 * Returns true if the report is considered safe.
 *
 * @param {Array.<number>} report The report to be examined.
 * @param {boolean} [dampenerActive=true] Determines whether the Problem Dampener is active
 * @returns {boolean} True if the report is considered safe.
 */
function isReportSafe(report, dampenerActive = true) {
    const GREATEST_ALLOWED_DIFFERENCE = 3;
    const levelsIncreasing = report[1] > report[0];

    for (let i = 1; i < report.length; i++) {
        let current = report[i];
        let previous = report[i - 1];

        let difference = Math.abs(current - previous);
        if (current === previous
            || difference > GREATEST_ALLOWED_DIFFERENCE
            || levelsIncreasing && current < previous
            || !levelsIncreasing && current > previous) {
            if (dampenerActive) {
                return isReportSafe(report.slice().splice(i, 1), false);
            } else {
                return false;
            }
        }
    }
    return true;
}

main();
