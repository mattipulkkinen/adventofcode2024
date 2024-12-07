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
    const result = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .match(/do\(\)|don't\(\)|mul\(\d+,\d+\)/g)
        .filter((value, index, originalArray) => {
            const dontIdx = originalArray.lastIndexOf("don't()", index);
            const doIdx = originalArray.indexOf("do()", index);
            const result = dontIdx !== -1 && dontIdx < index && index < doIdx;
            console.log(value, index, dontIdx, doIdx, result);
        });
    //.map((operation) => operation.match(/\d+,\d+/))
    //.map((operands) => operands[0].split(",").map((n) => Number(n)))
    //.reduce((acc, [left, right]) => (acc += left * right), 0);

    // 163151674 is too high
    console.log(result);
}

main();
