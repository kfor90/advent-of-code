import * as fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import * as readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const elfHasMoreCaloriesThan = (caloriesA: number, caloriesB: number) => {
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

    // finished counting all elf calories AND this elf has more calories than the mostCaloriesByElf
    else if (elfHasMoreCaloriesThan(currentElfCalories, mostCaloriesByElf)) {
      mostCaloriesByElf = currentElfCalories;
      currentElfCalories = 0;
    }

    // finished counting all elf calories but this elf does NOT have more than the mostCaloriesByElf thus far
    else currentElfCalories = 0;
  }

  return mostCaloriesByElf;
};

export const main = () => {
  return findMostCaloriesByAnElf();
};