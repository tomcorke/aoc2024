import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";

const DAY = "01";

type Input = { left: number[]; right: number[] };
const parseInput = (values: string[]): Input => {
  const left: number[] = [];
  const right: number[] = [];
  for (const line of values) {
    if (line.trim().length > 0) {
      const [l, r] = line.split("   ").map((v) => Number(v));
      left.push(l);
      right.push(r);
    }
  }
  return { left, right };
};

const getInput = readFileSeparated("\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n", DAY, "testInput").then(parseInput);

const processPartOne = (input: Input): number => {
  let index = 0;
  let diff = 0;

  // return Math.abs(
  //   input.left.reduce((acc, v) => acc + v, 0) -
  //     input.right.reduce((acc, v) => acc + v, 0)
  // );

  const leftSorted = input.left.sort();
  const rightSorted = input.right.sort();

  while (index < leftSorted.length) {
    const d = Math.abs(leftSorted[index] - rightSorted[index]);
    // console.log(`${leftSorted[index]} ${rightSorted[index]}: ${d}`);
    diff += d;
    index += 1;
  }
  return diff;
};

const processPartTwo = (input: Input): number => {
  const rightCountMap = new Map<number, number>();
  for (const n of input.right) {
    rightCountMap.set(n, (rightCountMap.get(n) || 0) + 1);
  }
  return input.left.reduce(
    (acc, n) => acc + n * (rightCountMap.get(n) || 0),
    0
  );
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  await expect(() => processPartOne(testInput), 11);
  await expect(() => processPartTwo(testInput), 31);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
