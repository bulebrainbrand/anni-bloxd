/// <reference types="bloxd.io.d.ts/dist/index" />
import type { BlockName, Coordinate, PlayerId } from "bloxd.io.d.ts";
import type { TeamName } from "../types/team";
import * as NexusHpHandler from "./nexusHpHandler";
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import { getTeam } from "./playerTeam";
import { NEXUS_BLOCK, NEXUS_COOEDINATE_BY_TEAM } from "../consts";
import {
  isNexusBlock,
  replaceNexusAndSetTimeoutRemove,
} from "./nexusBlockManager";
import { updateRightInfoText } from "./rightInfoText";

export const isBreakingNexus = (block: BlockName) => isNexusBlock(block);

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
  for (const [team, coordinate] of Object.entries(NEXUS_COOEDINATE_BY_TEAM)) {
    if (isSameCoordinate(x, y, z, coordinate)) return team as TeamName;
  }
  return false;
};

export const breakNexus = (
  playerId: PlayerId,
  x: number,
  y: number,
  z: number,
): boolean => {
  if (GamePhaseManager.getPhase() !== 3)
    throw new Error("cannot break nexus yet");
  const phase = PhaseManager.getPhase();
  if (phase === 1 || phase === 0) return false;

  const team = getTeamByNexusCoordinate(x, y, z);
  if (team === false) return false;
  const playerTeam = getTeam(playerId);
  if (team === playerTeam) return false;
  replaceNexusAndSetTimeoutRemove(x, y, z);
  NexusHpHandler.breakNexus(team, phase);
  updateRightInfoText();
  return true;
};
