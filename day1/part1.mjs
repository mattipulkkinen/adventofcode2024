#!/usr/bin/env node
"use strict";

// Advent of Code 2024 day 1 part 1 solution
// Copyright (C) 2024  Matti Pulkkinen
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
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
    const INPUT_FILE_NAME = "input.txt";
    const input_file_lines = fs.
        readFileSync(INPUT_FILE_NAME, { encoding: "utf8" })
        .trim()
        .split("\n");;

    const left = [];
    const right = [];

    for (const line of input_file_lines) {
        let [l, r] = line.split(/\s+/);
        left.push(Number(l));
        right.push(Number(r));
    }

    left.sort();
    right.sort();

    let sumOfDistances = 0;
    for (let i = 0; i < left.length; i++) {
        sumOfDistances += Math.abs(left[i] - right[i]);
    }

    console.log(sumOfDistances);
}

main();
