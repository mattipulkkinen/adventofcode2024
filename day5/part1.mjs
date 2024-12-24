#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 5 part 1 solution
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
    const input = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .split("\n");

    // orderingRules is a map that, for a given page number n as the key,
    // contains an array of all the page numbers that are supposed to come
    // before n.
    const orderingRules = new Map();
    const updates = [];
    let processingFirstSection = true;
    for (const line of input) {
        if (processingFirstSection) {
            if (line === "") {
                processingFirstSection = false;
                continue;
            }

            let [comesBefore, comesAfter] = line
                .split("|")
                .map((n) => Number(n));

            if (!orderingRules.has(comesAfter)) {
                orderingRules.set(comesAfter, []);
            }

            orderingRules.get(comesAfter).push(comesBefore);
        } else {
            updates.push(line.split(",").map((n) => Number(n)));
        }
    }

    const orderedUpdates = updates.filter((update) =>
        isUpdateOrdered(orderingRules, update),
    );

    const result = orderedUpdates.reduce(
        (sum, update) => sum + update.at(update.length / 2),
        0,
    );

    console.log(result);
}

/**
 * Checks if the given update is ordered according to the rules specified.
 *
 * @param {Map<number, Array<number>>} rules The ordering rules from the input.
 * @param {Array<Number>} update A given update from the input.
 * @returns {boolean} True if the update is ordered, false otherwise.
 */
function isUpdateOrdered(rules, update) {
    for (let i = 0; i < update.length; i++) {
        const pageNumber = update[i];

        if (!rules.has(pageNumber)) {
            return false;
        }

        const pageNumbersThatShouldComeBeforeThisOne = rules.get(pageNumber);

        const updateTail = update.slice(i + 1);
        if (
            updateTail.some((n) =>
                pageNumbersThatShouldComeBeforeThisOne.includes(n),
            )
        ) {
            return false;
        }
    }

    return true;
}

main();
