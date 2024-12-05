import { readFileSeparated, toNumber, expect } from "../helpers.js";
import { Solution } from "../index.js";
import chalk from "chalk";

const DAY = "05";

const parseInput = (values: string[]) => {
  const [pageOrderingRules, updates] = values;

  const orderingRuleMap = new Map<number, Set<number>>();
  const rawRules = pageOrderingRules
    .split("\n")
    .map((line) => line.split("|").map(toNumber));
  for (const rule of rawRules) {
    const [before, after] = rule;
    const beforeSet = orderingRuleMap.get(before) || new Set<number>();
    beforeSet.add(after);
    orderingRuleMap.set(before, beforeSet);
  }

  return {
    pageOrderingRules: orderingRuleMap,
    updates: updates
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => line.split(",").map(toNumber)),
  };
};

type Input = ReturnType<typeof parseInput>;

const getInput = readFileSeparated("\n\n", DAY, "input").then(parseInput);
const getTestInput = readFileSeparated("\n\n", DAY, "testInput").then(
  parseInput
);

const processPartOne = (input: Input): number => {
  const rules = input.pageOrderingRules;
  const validUpdates = input.updates.filter((update) => {
    const numberIndexes = new Map<number, number>();
    for (let i = 0; i < update.length; i++) {
      numberIndexes.set(update[i], i);
    }
    for (let i = 0; i < update.length; i++) {
      const n = update[i];
      if (rules.has(n)) {
        const afterSet = rules.get(n);
        if (afterSet) {
          for (const a of afterSet) {
            if (numberIndexes.has(a) && numberIndexes.get(a)! < i) {
              return false;
            }
          }
        }
      }
    }
    return true;
  });

  return validUpdates
    .map((update) => {
      const mid = update[Math.floor(update.length / 2)];
      // console.log(update, mid);
      return mid;
    })
    .reduce((a, b) => a + b, 0);
};

const processPartTwo = (input: Input): number => {
  const rules = input.pageOrderingRules;
  const invalidUpdates = input.updates.filter((update) => {
    const numberIndexes = new Map<number, number>();
    for (let i = 0; i < update.length; i++) {
      numberIndexes.set(update[i], i);
    }
    for (let i = 0; i < update.length; i++) {
      const n = update[i];
      if (rules.has(n)) {
        const afterSet = rules.get(n);
        if (afterSet) {
          for (const a of afterSet) {
            if (numberIndexes.has(a) && numberIndexes.get(a)! < i) {
              return true;
            }
          }
        }
      }
    }
    return false;
  });

  const fixedInvalidUpdates = invalidUpdates.map((update) => {
    // Iterate through correctly ordered values and add them to new result array if they exist in update

    let u = update.slice();

    for (const [before, after] of input.pageOrderingRules) {
      if (u.includes(before)) {
        u = u.filter((n) => n !== before);
        const minIndex = Math.min(
          ...Array.from(after)
            .map((a) => u.indexOf(a))
            .filter((i) => i !== -1)
        );
        u = [...u.slice(0, minIndex), before, ...u.slice(minIndex)];
      }
    }

    return u;
  });

  return fixedInvalidUpdates
    .map((update) => {
      const mid = update[Math.floor(update.length / 2)];
      // console.log(update, mid);
      return mid;
    })
    .reduce((a, b) => a + b, 0);

  return 0;
};

const solution: Solution = async () => {
  const input = await getInput;
  return processPartOne(input);
};

solution.tests = async () => {
  const testInput = await getTestInput;
  await expect(() => processPartOne(testInput), 143);
  await expect(() => processPartTwo(testInput), 123);
};

solution.partTwo = async () => {
  const input = await getInput;
  return processPartTwo(input);
};

solution.inputs = [getInput];

export default solution;
