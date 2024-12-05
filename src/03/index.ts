import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";
import chalk from "chalk";

const DAY = "03";

type Input = string[];
const parseInput = (values: string[]): Input =>
  values.filter((v) => v !== "").map((v) => v);

const getInput = readFileSeparated("\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n", DAY, "testInput").then(parseInput);
const getTestInput2 = readFileSeparated("\n", DAY, "testInput2").then(
  parseInput
);

const mulPattern = /mul\((\d+),(\d+)\)/g;

const processPartOne = (inputLines: Input): number => {
  const input = inputLines.join("");
  const matches = input.matchAll(mulPattern);
  let result = 0;
  for (const match of matches) {
    result += Number(match[1]) * Number(match[2]);
  }
  return result;
};

const processPartTwo = (inputLines: Input): number => {
  const input = inputLines.join("");

  const splitByDos = input.split("do()");
  const splitByDonts = splitByDos.map((s) => {
    const splits = s.split("don't()");
    const doMul = splits[0];
    const dontMul = splits.slice(1);
    // console.log(chalk.greenBright(doMul));
    // for (const d of dontMul) {
    //   console.log(chalk.redBright(d));
    // }
    return doMul;
  });

  const result = splitByDonts.reduce((sAcc, segment) => {
    const matches = segment.matchAll(mulPattern);
    let sResult = 0;
    for (const match of matches) {
      // console.log(match[0]);
      sResult += Number(match[1]) * Number(match[2]);
    }
    return sAcc + sResult;
  }, 0);

  return result;
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  const testInput2 = await getTestInput2;
  await expect(() => processPartOne(testInput), 161);
  await expect(() => processPartTwo(testInput2), 48);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
