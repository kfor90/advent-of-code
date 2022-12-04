import * as fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const elfHasMoreCaloriesThanLeader = (caloriesA: number, caloriesB: number) => {
  return caloriesA > caloriesB;
};

const isEndOfElf = (line: string) => {
  return !line.length;
};

const findMostCaloriesByAnElf = async () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = resolve(__dirname, 'input.txt')

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
  });

  let mostCaloriesByElf = 0;
  let currentElfCalories = 0;

  for await (const line of rl) {
    // count calories for the current elf
    if (!isEndOfElf(line))
      currentElfCalories += parseInt(line);

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

export const part1 = () => {
  return findMostCaloriesByAnElf();
};