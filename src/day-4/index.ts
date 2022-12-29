import { getFileIterator } from '../shared/index.js';

const INPUT_FILE_PATH = 'day-4/input.txt';

interface Pair {
  min: number;
  max: number;
}

interface PairSet {
  pair1: Pair;
  pair2: Pair;
}

const getPairs = (line: string): PairSet => {
  const [pair1, pair2] = line.split(',');
  const [pair1min, pair1max] = pair1.split('-');
  const [pair2min, pair2max] = pair2.split('-');

  return {
    pair1: {
      min: +pair1min,
      max: +pair1max,
    },
    pair2: {
      min: +pair2min,
      max: +pair2max,
    },
  };
};

const doesPairAContainPairB = (pairA: Pair, pairB: Pair) => {
  if (pairA.min <= pairB.min && pairA.max >= pairB.max) return true;

  return false;
};

const doPairsOverlap = (pair1: Pair, pair2: Pair) => {
  if (doesPairAContainPairB(pair1, pair2)) return true;
  if (doesPairAContainPairB(pair2, pair1)) return true;

  return false;
};

const calcNumPairOverlaps = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let numPairOverlaps = 0;

  for await (const line of fileIterator) {
    const { pair1, pair2 } = getPairs(line);
    if (doPairsOverlap(pair1, pair2)) numPairOverlaps++;
  }

  return numPairOverlaps;
};

export const part1 = () => {
  return calcNumPairOverlaps();
};

export const part2 = () => {
  // return calculatePrioritySumOfElfGroup(3);
};
