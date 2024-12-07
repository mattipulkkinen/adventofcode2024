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
    const reports = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .split("\n")
        .map((line) => line.split(/\s+/).map((n) => Number(n)));

    const count = reports.reduce(
        (acc, report) => acc + (isReportSafe(report) ? 1 : 0),
        0,
    );

    isReportSafe([7, 6, 4, 2, 1]);
    isReportSafe([1, 2, 7, 8, 9]);
    isReportSafe([9, 7, 6, 2, 1]);
    isReportSafe([1, 3, 2, 4, 5]);
    isReportSafe([8, 6, 4, 4, 1]);
    isReportSafe([1, 3, 6, 7, 9]);

    // 577 is too low
    console.log(count);
}

/**
 * Returns true if the report is considered safe. A report is safe if the
 * levels are either all increasing or all decreasing and any two adjacent
 * levels differ by at least one and at most three. If the Problem Dampener
 * is active, then one single violation of the above criteria is tolerated
 * without making the report unsafe.
 *
 * @param {Array.<number>} report The report to be examined, containing one
 *     number for each level.
 * @param {boolean} [dampenerActive=true] Determines whether the Problem
 *     Dampener is active
 * @returns {boolean} True if the report is considered safe.
 */
function isReportSafe(report, dampenerActive = true) {
    const GREATEST_ALLOWED_DIFFERENCE = 3;
    const levelsIncreasing = report[1] > report[0];

    for (let i = 1; i < report.length; i++) {
        let current = report[i];
        let previous = report[i - 1];
        let difference = Math.abs(current - previous);

        if (
            current === previous ||
            difference > GREATEST_ALLOWED_DIFFERENCE ||
            (levelsIncreasing && current < previous) ||
            (!levelsIncreasing && current > previous)
        ) {
            if (dampenerActive) {
                return (
                    isReportSafe(
                        removeFromArrayAtIndex(report, i - 1),
                        false,
                    ) ||
                    isReportSafe(removeFromArrayAtIndex(report, i), false) ||
                    isReportSafe(removeFromArrayAtIndex(report, i + 1), false)
                );
            } else {
                return false;
            }
        }
    }
    return true;
}

/**
 * Returns a copy of `array` with the element at `index` removed.
 *
 * @param {Array.<any>} array The array to be copied.
 * @param {number} index  The index of array to remove an element from.
 * @returns {Array.<any} A copy of `array` without the element at `index`.
 */
function removeFromArrayAtIndex(array, index) {
    return array.slice(0, index).concat(array.slice(index + 1));
}

main();
