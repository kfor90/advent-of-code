import { getFileIterator } from '../shared/index.js';

const INPUT_FILE_PATH = 'day-2/input.txt';

enum Play {
  A = 'A',
  B = 'B',
  C = 'C',
  X = 'X',
  Y = 'Y',
  Z = 'Z',
}

enum PlayName {
  Rock = 'A',
  Paper = 'B',
  Scissors = 'C',
}

enum StrategyName {
  LOSE = 'X',
  DRAW = 'Y',
  WIN = 'Z',
}

const ROCK_PTS = 1;
const PAPER_PTS = 2;
const SCISSORS_PTS = 3;

const WIN_PTS = 6;
const DRAW_PTS = 3;
const LOSE_PTS = 0;

const playNamesByPlay: { [play: string]: PlayName } = {
  [Play.A]: PlayName.Rock,
  [Play.B]: PlayName.Paper,
  [Play.C]: PlayName.Scissors,
};

const PtsByPlay = {
  [Play.A]: ROCK_PTS,
  [Play.B]: PAPER_PTS,
  [Play.C]: SCISSORS_PTS,
  [Play.X]: ROCK_PTS,
  [Play.Y]: PAPER_PTS,
  [Play.Z]: SCISSORS_PTS,
};

const ptsByStrategyName = {
  [StrategyName.LOSE]: LOSE_PTS,
  [StrategyName.DRAW]: DRAW_PTS,
  [StrategyName.WIN]: WIN_PTS,
};

const playsByPlayName = {
  [PlayName.Rock]: Play.A,
  [PlayName.Paper]: Play.B,
  [PlayName.Scissors]: Play.C,
};

const elfResultsByCombinedPlay: { [key: string]: number } = {
  AX: DRAW_PTS,
  AY: WIN_PTS,
  AZ: LOSE_PTS,
  BX: LOSE_PTS,
  BY: DRAW_PTS,
  BZ: WIN_PTS,
  CX: WIN_PTS,
  CY: LOSE_PTS,
  CZ: DRAW_PTS,
};

const elfPlaysByStrategy = {
  [`${StrategyName.LOSE}:${PlayName.Rock}`]: PlayName.Scissors,
  [`${StrategyName.LOSE}:${PlayName.Paper}`]: PlayName.Rock,
  [`${StrategyName.LOSE}:${PlayName.Scissors}`]: PlayName.Paper,
  [`${StrategyName.DRAW}:${PlayName.Rock}`]: PlayName.Rock,
  [`${StrategyName.DRAW}:${PlayName.Paper}`]: PlayName.Paper,
  [`${StrategyName.DRAW}:${PlayName.Scissors}`]: PlayName.Scissors,
  [`${StrategyName.WIN}:${PlayName.Rock}`]: PlayName.Paper,
  [`${StrategyName.WIN}:${PlayName.Paper}`]: PlayName.Scissors,
  [`${StrategyName.WIN}:${PlayName.Scissors}`]: PlayName.Rock,
};

const getPlay = (opponentPlay: Play, elfStrategy: StrategyName) => {
  const opponentPlayName = playNamesByPlay[opponentPlay];
  const strategy = `${elfStrategy}:${opponentPlayName}`;
  const playName = elfPlaysByStrategy[strategy];
  return playsByPlayName[playName];
};

const getResultPts = (opponentPlay: Play, elfPlay: Play) => {
  return elfResultsByCombinedPlay[`${opponentPlay}${elfPlay}`];
};

const getPlayPoints = (play: Play) => {
  return PtsByPlay[play];
};

const getPointsByStrategyName = (elfStrategy: StrategyName) => {
  return ptsByStrategyName[elfStrategy];
};

const calculateTotalElfScore = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let totalElfPts = 0;

  for await (const line of fileIterator) {
    const [opponentPlay, elfPlay] = line.split(' ') as [Play, Play];
    const elfPlayPoints = getPlayPoints(elfPlay);
    const elfResultPts = getResultPts(opponentPlay, elfPlay);
    totalElfPts += elfPlayPoints + elfResultPts;
  }

  return totalElfPts;
};

const calculateTotalElfScoreByStrategy = async () => {
  const fileIterator = getFileIterator(INPUT_FILE_PATH);
  let totalElfPts = 0;

  for await (const line of fileIterator) {
    const [opponentPlay, elfStrategy] = line.split(' ') as [Play, StrategyName];
    const elfPlay = getPlay(opponentPlay, elfStrategy);
    const elfPlayPts = getPlayPoints(elfPlay);
    const elfResultPts = getPointsByStrategyName(elfStrategy);

    totalElfPts += elfPlayPts + elfResultPts;
  }

  return totalElfPts;
};

export const part1 = () => {
  return calculateTotalElfScore();
};

export const part2 = () => {
  return calculateTotalElfScoreByStrategy();
};
