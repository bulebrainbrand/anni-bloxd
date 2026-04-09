import type { Phase } from "../types/phase";
import type { TeamName } from "../types/team";
import { GamePhaseManager } from "./gamePhaseManager";
import { decrementNexusHP } from "./nexusHpManage";
import { PhaseManager } from "./phaseManager";
const PHASE_NEXUS_MULTIHELPER = {
  1: null,
  2: 1,
  3: 2,
  4: 2,
  5: 5,
} as const;
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

const AUTO_DECREMENT_NEXUS_DAMAGE = 5;

const AUTO_DECREMENT_NEXUS_INTERVAL_MS = 5000;

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
