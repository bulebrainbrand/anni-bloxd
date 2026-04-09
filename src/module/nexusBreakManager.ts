/// <reference types="bloxd.io.d.ts/dist/index" />
import type { BlockName, Coordinate, PlayerId } from "bloxd.io.d.ts";
import type { TeamName } from "../types/team";
import * as NexusHpHandler from "./nexusHpHandler";
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import { getTeam } from "./playerTeam";

const NEXUS_COOEDINATE_LOOKUP: Record<TeamName, Coordinate> = {
  blue: [1, 1, 1],
  green: [2, 2, 2],
  red: [3, 3, 3],
  yellow: [4, 4, 4],
} as const;

const NEXUS_BLOCK = "Obsidian";

export const isBreakingNexus = (block: BlockName) => block === NEXUS_BLOCK;

const isSameCoordinate = (
  x: number,
  y: number,
  z: number,
  coordinate: Readonly<Coordinate>,
): boolean => x === coordinate[0] && y === coordinate[1] && z === coordinate[2];

const getTeamByNexusCoordinate = (
  x: number,
  y: number,
  z: number,
): TeamName | false => {
  for (const [team, coordinate] of Object.entries(NEXUS_COOEDINATE_LOOKUP)) {
    if (isSameCoordinate(x, y, z, coordinate)) return team as TeamName;
  }
  return false;
};

export const breakNexus = (
  playerId: PlayerId,
  x: number,
  y: number,
  z: number,
) => {
  if (GamePhaseManager.getPhase() !== 3)
    throw new Error("cannot break nexus yet");
  const phase = PhaseManager.getPhase();
  if (phase === 1 || phase === 0) return false;

  const team = getTeamByNexusCoordinate(x, y, z);
  if (team === false) return false;
  const playerTeam = getTeam(playerId);
  if (team === playerTeam) return false;
  return NexusHpHandler.breakNexus(team, phase);
};
