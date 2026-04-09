/// <reference types="bloxd.io.d.ts/dist/index" />
import {
  MATCHING_WAITING_MS,
  PHASE_ELAPSED_TIME_OF_START_PHASE_1,
} from "../consts";
import { Phase } from "../types/phase";
import { GamePhaseManager } from "./gamePhaseManager";
import { checkCanMatch, doMatching } from "./matching";
import { PhaseManager } from "./phaseManager";

let nextTryMatchMs = Date.now() + MATCHING_WAITING_MS;
const runOnCurrentPhase1 = () => {
  GamePhaseManager.movePhase();
};

const runOnCurrentPhase2 = () => {
  if (Date.now() < nextTryMatchMs) return;
  if (!checkCanMatch()) return;
  eval(""); // トランザクションを入れる
  doMatching();
  GamePhaseManager.movePhase();
  // なんかなかったからanyにキャスト
  (api as any).setMaxPlayers(1, 1);
};

let timeOfStartPhase1: number = 0;
const runOnCurrentPhase3 = () => {
  const phase = PhaseManager.getPhase();
  if (phase === 0) {
    eval(""); //トランザクションを入れる
    timeOfStartPhase1 = Date.now();
    PhaseManager.movePhase();
    return;
  }
  if (phase === 5) return;
  const nextPhaseTime =
    timeOfStartPhase1 +
    PHASE_ELAPSED_TIME_OF_START_PHASE_1[(phase + 1) as Phase];
  if (Date.now() > nextPhaseTime) {
    // i.e 次のphaseに進む
    eval(""); // トランザクションを入れる
    PhaseManager.movePhase();
  }
};

export const runGamePhaseMover = () => {
  const gamePhase = GamePhaseManager.getPhase();
  if (gamePhase === 1) runOnCurrentPhase1();
  else if (gamePhase === 2) runOnCurrentPhase2();
  else if (gamePhase === 3) runOnCurrentPhase3();
};
