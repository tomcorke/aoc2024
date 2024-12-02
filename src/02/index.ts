import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";

const DAY = "02";

type Input = number[][];
const parseInput = (values: string[]): Input =>
  values.filter((v) => v !== "").map((v) => v.split(" ").map((n) => Number(n)));

const getInput = readFileSeparated("\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n", DAY, "testInput").then(parseInput);

const isSafe = (row: number[]) => {
  let i = 0;

  let isAllIncreasing = true;
  let isAllDecreasing = true;
  let safeChanges = true;

  while (i < row.length - 1) {
    const a = row[i];
    const b = row[i + 1];
    if (b < a) {
      isAllIncreasing = false;
    }
    if (b > a) {
      isAllDecreasing = false;
    }
    if (a === b || Math.abs(b - a) > 3) {
      safeChanges = false;
    }
    if (!(isAllIncreasing || isAllDecreasing) || !safeChanges) {
      return false;
    }
    i++;
  }
  return true;
};

const processPartOne = (input: Input, allowedChanges = 0): number => {
  return input.filter((row) => {
    return isSafe(row);
  }).length;
};

const processPartTwo = (input: Input): number => {
  return input.filter((row) => {
    const safe = isSafe(row);

    if (safe) {
      return true;
    }

    // Try fixing by removing entries from each row and testing new variant
    return row.some((_, i) => {
      const newRow = row.slice();
      newRow.splice(i, 1);
      return isSafe(newRow);
    });
  }).length;
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  await expect(() => processPartOne(testInput), 2);
  await expect(() => processPartTwo(testInput), 4);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
