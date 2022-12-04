import * as fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const getFileIterator = () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = resolve(__dirname, 'input.txt');

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
  });

  return rl;
};

const elfHasMoreCaloriesThanTopElves = (elfCalories: number, caloriesByTopElves: number[]) => {
  return elfCalories > caloriesByTopElves[0];
};

const isTopElvesGroupFull = (currentCount: number, expectedCount: number) => {
  return currentCount === expectedCount;
};

const elfHasMoreCaloriesThanLeader = (caloriesA: number, caloriesB: number) => {
  return caloriesA > caloriesB;
};

const isEndOfElf = (line: string) => {
  return !line.length;
};

const calcMostCaloriesByAnElf = async () => {
  let mostCaloriesByElf = 0;
  let currentElfCalories = 0;
  const fileIterator = getFileIterator();

  for await (const line of fileIterator) {
    // count calories for the current elf
    if (!isEndOfElf(line)) currentElfCalories += parseInt(line);
    // Current elf has more calories than the leader
    else if (elfHasMoreCaloriesThanLeader(currentElfCalories, mostCaloriesByElf)) {
      mostCaloriesByElf = currentElfCalories;
      currentElfCalories = 0;
    }

    // Current elf does NOT have more than the leader
    else currentElfCalories = 0;
  }

  return mostCaloriesByElf;
};

const calcMostCaloriesByTopElves = async (numTopElves: number) => {
  const totalCaloriesByTopElves: number[] = [];
  let currentElfCalories = 0;

  const fileIterator = getFileIterator();

  for await (const line of fileIterator) {
    // count calories for the current elf
    if (!isEndOfElf(line)) currentElfCalories += parseInt(line);
    // top elves group is not full, add current elf to the group
    else if (!isTopElvesGroupFull(totalCaloriesByTopElves.length, numTopElves)) {
      totalCaloriesByTopElves.push(currentElfCalories);
      currentElfCalories = 0;

      if (isTopElvesGroupFull(totalCaloriesByTopElves.length, numTopElves))
        // sort the array in ascending order
        totalCaloriesByTopElves.sort((a, b) => a - b);
    }

    // Current elf has more calories than someone in the top numTopElves
    else if (elfHasMoreCaloriesThanTopElves(currentElfCalories, totalCaloriesByTopElves)) {
      // replace worst elf from the array with current elf
      totalCaloriesByTopElves[0] = currentElfCalories;

      // sort the array in ascending order
      totalCaloriesByTopElves.sort((a, b) => a - b);

      // reset current elf
      currentElfCalories = 0;
    }

    // Current elf does NOT have more than the leader
    else currentElfCalories = 0;
  }

  // sum the contents of the array
  return totalCaloriesByTopElves.reduce((previous, current) => previous + current, 0);
};

export const part1 = () => {
  return calcMostCaloriesByAnElf();
};

export const part2 = () => {
  return calcMostCaloriesByTopElves(3);
};
