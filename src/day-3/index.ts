import { getFileIterator } from '../shared/index.js';

const INPUT_FILE_PATH = 'day-3/input.txt';
const LOWERCASE_ASCII_MIN = 97;
const UPPERCASE_ASCII_MIN = 65;
const UPPERCASE_ASCII_MAX = 90;

const getCompartments = (rucksack: string) => {
  let compartment1 = '';
  let compartment2 = '';

  for (let i = 0; i < rucksack.length; i++)
    if (i < rucksack.length / 2) compartment1 += rucksack[i];
    else compartment2 += rucksack[i];

  return { compartment1, compartment2 };
};

const findCommonItem = (compartment1: string, compartment2: string) => {
  const compartment1Items = new Set<string>();
  const compartment2Items = new Set<string>();

  for (let i = 0; i < compartment1.length; i++) {
    const compartment1Item = compartment1[i];
    const compartment2Item = compartment2[i];

    compartment1Items.add(compartment1Item);
    compartment2Items.add(compartment2Item);

    if (compartment2Items.has(compartment1Item)) return compartment1Item;
    if (compartment1Items.has(compartment2Item)) return compartment2Item;
  }

  throw new Error('No common items found');
};

const isUppercase = (item: string) => {
  const code = item.charCodeAt(0);
  return code >= UPPERCASE_ASCII_MIN && code <= UPPERCASE_ASCII_MAX;
};

const calculatePriority = (item: string) => {
  const LOWERCASE_PRIORITY_MIN = 1;
  const UPPERCASE_PRIORITY_MIN = 27;
  const itemIsUppercase = isUppercase(item);
  const code = item.charCodeAt(0);

  if (itemIsUppercase) return code - UPPERCASE_ASCII_MIN + UPPERCASE_PRIORITY_MIN;
  return code - LOWERCASE_ASCII_MIN + LOWERCASE_PRIORITY_MIN;
};

const calculatePrioritySumOfCommonItems = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let prioritySum = 0;

  for await (const line of fileIterator) {
    const { compartment1, compartment2 } = getCompartments(line);
    const commonItem = findCommonItem(compartment1, compartment2);
    const priority = calculatePriority(commonItem);
    prioritySum += priority;
  }

  return prioritySum;
};

export const part1 = () => {
  return calculatePrioritySumOfCommonItems();
};
