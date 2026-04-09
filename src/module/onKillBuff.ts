import { PlayerId } from "bloxd.io.d.ts";
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import { applyLongBuff, applyShortBuff } from "./applyBuff";
import { playSoundOnApplyLongBuff, playSoundOnApplyShortBuff } from "./sounds";
import { APPLY_BUFF_TYPE_BY_PHASE } from "../consts";
import { BuffType } from "../types/buffType";

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
