import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";
import chalk from "chalk";

const DAY = "{DAY}";

type Input = string[];
const parseInput = (values: string[]): Input =>
  values.filter((v) => v !== "").map((v) => v);

const getInput = readFileSeparated("\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n", DAY, "testInput").then(parseInput);

const processPartOne = (input: Input): number => {
  return NaN;
};

const processPartTwo = (input: Input): number => {
  return NaN;
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  await expect(() => processPartOne(testInput), 3.141592653589793);
  // await expect(() => processPartTwo(testInput), 3.141592653589793);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
