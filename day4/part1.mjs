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
    const input_lines = fs
        .readFileSync(INPUT_FILENAME, { encoding: "utf8" })
        .trim()
        .split("\n");

    const width = input_lines.at(0).length;
    const height = input_lines.length;
    console.log(width, height);

    const row = 0;
    const column = 0;
    const all_on_one_line = input_lines.join("");
    const c = all_on_one_line.at(row * width + column);

    console.log(c);
}

main();
