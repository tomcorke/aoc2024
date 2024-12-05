import chalk from "chalk";
import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";

const DAY = "04";

type Input = string[][];
const parseInput = (values: string[]): Input =>
  values.filter((v) => v !== "").map((v) => v.split(""));

const getInput = readFileSeparated("\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n", DAY, "testInput").then(parseInput);

const isMatch = (
  input: Input,
  search: string[],
  x: number,
  y: number,
  direction: [number, number]
): boolean => {
  const nx = x + direction[0];
  const ny = y + direction[1];

  if (nx < 0 || nx >= input[0].length || ny < 0 || ny >= input.length) {
    return false;
  }

  if (input[ny][nx] !== search[0]) {
    return false;
  }

  if (search.length === 1) {
    return true;
  }

  return isMatch(input, search.slice(1), nx, ny, direction);
};

const countXmas = (input: Input, x: number, y: number): number => {
  if (input[y][x] !== "X") {
    return 0;
  }
  const directions: [number, number][] = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];
  return directions.filter((d) => isMatch(input, ["M", "A", "S"], x, y, d))
    .length;
};

const processPartOne = (input: Input): number => {
  let count = 0;

  for (let y = 0; y < input.length; y++) {
    let o: string[] = [];
    for (let x = 0; x < input[y].length; x++) {
      const c = countXmas(input, x, y);
      if (c > 0) {
        count += c;
        //o.push(chalk.greenBright(input[y][x]));
      } else {
        //o.push(chalk.red("."));
      }
    }
    //console.log(o.join(""));
  }

  return count;
};

const unPermuteCrossMasChecks: [number, number, string][] = [
  [0, 0, "A"],
  [-1, -1, "M"],
  [-1, 1, "M"],
  [1, -1, "S"],
  [1, 1, "S"],
];
const crossMasPermutes: [number, number, number, number][] = [
  [1, 0, 0, 1],
  [-1, 0, 0, 1],
  [0, 1, 1, 0],
  [0, 1, -1, 0],
];
const crossMasChecks: [number, number, string][][] = crossMasPermutes.map(
  ([pxa, pya, pxb, pyb]) =>
    unPermuteCrossMasChecks.map(([x, y, c]): [number, number, string] => [
      x * pxa + y * pya,
      x * pxb + y * pyb,
      c,
    ])
);

const isCrossMas = (input: Input, x: number, y: number): boolean => {
  return crossMasChecks.some((checks) =>
    checks.every(([dx, dy, c]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= input[0].length || ny < 0 || ny >= input.length) {
        return false;
      }
      return input[ny][nx] === c;
    })
  );
};

const processPartTwo = (input: Input): number => {
  let count = 0;

  for (let y = 0; y < input.length; y++) {
    let o: string[] = [];
    for (let x = 0; x < input[y].length; x++) {
      if (isCrossMas(input, x, y)) {
        count++;
      } else {
      }
    }
  }

  return count;
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  await expect(() => processPartOne(testInput), 18);
  await expect(() => processPartTwo(testInput), 9);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
