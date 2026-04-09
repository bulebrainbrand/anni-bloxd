import {
  AUTO_DECREMENT_NEXUS_DAMAGE,
  AUTO_DECREMENT_NEXUS_INTERVAL_MS,
  PHASE_NEXUS_MULTIHELPER,
} from "../consts";
import type { Phase } from "../types/phase";
import type { TeamName } from "../types/team";
import { GamePhaseManager } from "./gamePhaseManager";
import { decrementNexusHP } from "./nexusHpManage";
import { PhaseManager } from "./phaseManager";

export const breakNexus = (
  team: TeamName,
  phase: Phase,
  damage: number = 1,
) => {
  if (phase === 1) return false;
  const calcedDamage = PHASE_NEXUS_MULTIHELPER[phase] * damage;
  decrementNexusHP(team, calcedDamage);
  return calcedDamage;
};

let lastBreak = 0;

export const tryAutoDecrementNexus = () => {
  if (GamePhaseManager.getPhase() !== 3) return false;
  if (PhaseManager.getPhase() !== 5) return false;
  if (Date.now() < lastBreak + AUTO_DECREMENT_NEXUS_INTERVAL_MS) return false;
  for (const team of ["red", "blue", "yellow", "green"] as const) {
    decrementNexusHP(team, AUTO_DECREMENT_NEXUS_DAMAGE);
  }
  lastBreak = Date.now();
  return AUTO_DECREMENT_NEXUS_DAMAGE;
};
