import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";

export const mustBekeepInventory = (): boolean => {
  if (GamePhaseManager.getPhase() !== 3) return true;
  const phase = PhaseManager.getPhase();
  if (phase === 0 || phase === 1 || phase === 2) return true;
  return false;
};
