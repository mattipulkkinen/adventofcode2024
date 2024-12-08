#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 3 part 2 solution
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
    const operations = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g);

    const multiplications = [];
    let enabled = true;
    for (const operation of operations) {
        if (operation === "don't()") enabled = false;
        else if (operation === "do()") enabled = true;
        else if (enabled) multiplications.push(operation);
    }

    const result = multiplications
        .map((operation) => operation.match(/\d+,\d+/))
        .map((operands) => operands[0].split(",").map((n) => Number(n)))
        .reduce((acc, [left, right]) => (acc += left * right), 0);

    console.log(result);
}

main();
