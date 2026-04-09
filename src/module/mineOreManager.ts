/// <reference types="bloxd.io.d.ts/dist/index" />
import { GamePhaseManager } from "./gamePhaseManager";
import { PhaseManager } from "./phaseManager";
import type { Phase } from "../types/phase";
import { mySetTimeout } from "./timeout";
import type { BlockName } from "bloxd.io.d.ts";

type Ore =
  | "Coal Ore"
  | "Iron Ore"
  | "Gold Ore"
  | "Diamond Ore"
  | "Moonstone Ore";

const NEED_PHASE_FOR_MINE_ORE: Record<Ore, Phase> = {
  "Coal Ore": 1,
  "Iron Ore": 1,
  "Gold Ore": 2,
  "Moonstone Ore": 3,
  "Diamond Ore": 4,
} as const;

const ORE_RESPAWN_TIME: Record<Ore, number> = {
  "Coal Ore": 800,
  "Iron Ore": 1000,
  "Gold Ore": 1200,
  "Moonstone Ore": 2000,
  "Diamond Ore": 30000,
};
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
