/// <reference types="bloxd.io.d.ts/dist/index" />
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import type { Phase } from "../types/phase";
import { mySetTimeout } from "./timeout";
import type { BlockName } from "bloxd.io.d.ts";
import { NEED_PHASE_FOR_MINE_ORE, ORE_RESPAWN_TIME } from "../consts";
import { Ore } from "../types/ore";

export const tryMineOre = (x: number, y: number, z: number, type: Ore) => {
  if (GamePhaseManager.getPhase() !== 3) return false;
  const phase = PhaseManager.getPhase();
  if (NEED_PHASE_FOR_MINE_ORE[type] > phase) return false;
  mySetTimeout(() => {
    api.setBlock(x, y, z, type);
  }, ORE_RESPAWN_TIME[type]);
  api.setBlock(x, y, z, "Messy Stone");
  return true;
};

export const checkBlockCanMine = (block: BlockName): block is Ore =>
  block === "Coal Ore" ||
  block === "Iron Ore" ||
  block === "Gold Ore" ||
  block === "Diamond Ore" ||
  block === "Mooonstone Ore";
