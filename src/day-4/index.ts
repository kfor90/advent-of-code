import { getFileIterator } from '../shared/index.js';

const INPUT_FILE_PATH = 'day-4/input.txt';

interface Pair {
  min: number;
  max: number;
}

interface PairSet {
  pairA: Pair;
  pairB: Pair;
}

const getPairs = (line: string) => {
  const [pairA, pairB] = line.split(',');
  const [pairAMin, pairAMax] = pairA.split('-');
  const [pairBMin, pairBMax] = pairB.split('-');

  return {
    pairA: {
      min: +pairAMin,
      max: +pairAMax,
    },
    pairB: {
      min: +pairBMin,
      max: +pairBMax,
    },
  } as PairSet;
};

const doesPairAContainPairB = (pairA: Pair, pairB: Pair) => {
  if (pairA.min <= pairB.min && pairA.max >= pairB.max) return true;

  return false;
};

const doesPairAOverlapPairB = (pairA: Pair, pairB: Pair) => {
  // pairAMin is contained within pairB
  if (pairA.min >= pairB.min && pairA.min <= pairB.max) return true;

  // pairAMax is contained within pairB
  if (pairA.max <= pairB.max && pairA.max >= pairB.min) return true;

  return false;
};

const doPairsFullyOverlap = (pairA: Pair, pairB: Pair) => {
  if (doesPairAContainPairB(pairA, pairB)) return true;
  if (doesPairAContainPairB(pairB, pairA)) return true;

  return false;
};

const doPairsOverlap = (pairA: Pair, pairB: Pair) => {
  if (doesPairAOverlapPairB(pairA, pairB)) return true;
  if (doesPairAOverlapPairB(pairB, pairA)) return true;

  return false;
};

const calcNumFullPairOverlaps = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let numFullPairOverlaps = 0;

  for await (const line of fileIterator) {
    const { pairA, pairB } = getPairs(line);
    if (doPairsFullyOverlap(pairA, pairB)) numFullPairOverlaps++;
  }

  return numFullPairOverlaps;
};

const calcNumPairOverlaps = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let numPairOverlaps = 0;

  for await (const line of fileIterator) {
    const { pairA, pairB } = getPairs(line);
    if (doPairsOverlap(pairA, pairB)) numPairOverlaps++;
  }

  return numPairOverlaps;
};

export const part1 = () => {
  return calcNumFullPairOverlaps();
};

export const part2 = () => {
  return calcNumPairOverlaps();
};
