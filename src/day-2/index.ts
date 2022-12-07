import { getFileIterator } from '../shared/index.js';

const ROCK_PTS = 1;
const PAPER_PTS = 2;
const SCISSORS_PTS = 3;

const WIN_PTS = 6;
const TIE_PTS = 3;
const LOSS_PTS = 0;

type PointsByPlay = { [key: string]: number };

const PtsByPlay: PointsByPlay = {
  A: ROCK_PTS,
  B: PAPER_PTS,
  C: SCISSORS_PTS,
  X: ROCK_PTS,
  Y: PAPER_PTS,
  Z: SCISSORS_PTS,
};

const elfResultsByPlay: PointsByPlay = {
  AX: TIE_PTS,
  AY: WIN_PTS,
  AZ: LOSS_PTS,
  BX: LOSS_PTS,
  BY: TIE_PTS,
  BZ: WIN_PTS,
  CX: WIN_PTS,
  CY: LOSS_PTS,
  CZ: TIE_PTS,
};

const getResultPts = (opponentPlay: string, elfPlay: string) => {
  return elfResultsByPlay[`${opponentPlay}${elfPlay}`];
};

const getPlayPoints = (play: string) => {
  return PtsByPlay[play];
};

const calculateTotalElfScore = async () => {
  const fileIterator = getFileIterator('day-2/input.txt');
  let totalElfPts = 0;

  for await (const line of fileIterator) {
    const [opponentPlay, elfPlay] = line.split(' ');
    const elfPlayPoints = getPlayPoints(elfPlay);
    const elfResultPts = getResultPts(opponentPlay, elfPlay);
    totalElfPts += elfPlayPoints + elfResultPts;
  }

  return totalElfPts;
};

export const part1 = () => {
  return calculateTotalElfScore();
};
