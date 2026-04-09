import { PlayerId } from "bloxd.io.d.ts";
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import { Phase } from "../types/phase";
import { applyLongBuff, applyShortBuff } from "./applyBuff";
import { playSoundOnApplyLongBuff, playSoundOnApplyShortBuff } from "./sounds";

type BuffType = "none" | "short" | "long";

const APPLY_BUFF_TYPE_BY_PHASE: Record<Phase | 0, BuffType> = {
  "0": "none",
  "1": "none",
  "2": "none",
  "3": "none",
  "4": "short",
  "5": "long",
} as const;

export const checkShouldApplyBuffType = (): BuffType => {
  if (GamePhaseManager.getPhase() !== 3) return "none";
  return APPLY_BUFF_TYPE_BY_PHASE[PhaseManager.getPhase()];
};

export const tryApplyBuffOnKilledPlayer = (playerId: PlayerId): void => {
  const buffType = checkShouldApplyBuffType();
  if (buffType === "none") return;
  if (buffType === "short") {
    const isApplyBuff = applyShortBuff(playerId);
    if (isApplyBuff) playSoundOnApplyShortBuff(playerId);
    return;
  }
  if (buffType === "long") {
    const isApplyBuff = applyLongBuff(playerId);
    if (isApplyBuff) playSoundOnApplyLongBuff(playerId);
    return;
  }
};
