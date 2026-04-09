import type {
  BlockName,
  Coordinate,
  InGameEffectName,
  ItemName,
} from "bloxd.io.d.ts";
import { BuffType } from "./types/buffType";
import { Phase } from "./types/phase";
import { TeamName } from "./types/team";
import { Ore } from "./types/ore";
import { ONE_MINITU_ON_MS } from "./utilConsts";

export const NEXUS_BLOCK_REPLACING_MS = 500;

export const APPLY_BUFF_TYPE_BY_PHASE: Record<Phase | 0, BuffType> = {
  "0": "none",
  "1": "none",
  "2": "none",
  "3": "none",
  "4": "short",
  "5": "long",
} as const;

export const TEAM_TO_ICON: Record<TeamName, ItemName> = {
  blue: "Blue Popup Tower",
  green: "Green Popup Tower",
  red: "Red Popup Tower",
  yellow: "Yellow Popup Tower",
} as const;

export const INIT_NEXUS_HP = 75;

export const NEED_PHASE_FOR_MINE_ORE: Record<Ore, Phase> = {
  "Coal Ore": 1,
  "Iron Ore": 1,
  "Gold Ore": 2,
  "Moonstone Ore": 3,
  "Diamond Ore": 4,
} as const;

export const ORE_RESPAWN_TIME: Record<Ore, number> = {
  "Coal Ore": 800,
  "Iron Ore": 1000,
  "Gold Ore": 1200,
  "Moonstone Ore": 2000,
  "Diamond Ore": 30000,
} as const;
export const MIN_MATCHING_NUMBER_PLAYER = 8;

export const MATCHING_WAITING_MS = 60000;

export const PHASE_TIME: Record<Phase, number> = {
  "1": ONE_MINITU_ON_MS * 5,
  "2": ONE_MINITU_ON_MS * 10,
  "3": ONE_MINITU_ON_MS * 10,
  "4": ONE_MINITU_ON_MS * 20,
  "5": Infinity,
} as const;

export const PHASE_ELAPSED_TIME_OF_START_PHASE_1: Record<Phase, number> = {
  "1": PHASE_TIME[1],
  "2": PHASE_TIME[1] + PHASE_TIME[2],
  "3": PHASE_TIME[1] + PHASE_TIME[2] + PHASE_TIME[3],
  "4": PHASE_TIME[1] + PHASE_TIME[2] + PHASE_TIME[3] + PHASE_TIME[4],
  "5":
    PHASE_TIME[1] +
    PHASE_TIME[2] +
    PHASE_TIME[3] +
    PHASE_TIME[4] +
    PHASE_TIME[5],
} as const;

export const CAN_CHANGE_AREA: [Coordinate, Coordinate] = [
  [10000, -499, 10000],
  [10321, -380, 10321],
] as const;

export const TEAM_BASE_AREAS: [Coordinate, Coordinate][] = [
  [
    [10000, -499, 10000],
    [10030, -380, 10030],
  ],
  [
    [10291, -499, 10000],
    [10321, -380, 10030],
  ],
  [
    [10000, -499, 10291],
    [10030, -380, 10321],
  ],
  [
    [10291, -490, 10291],
    [10321, -380, 10321],
  ],
] as const;

interface BuffInfoInterface {
  name: InGameEffectName;
  level: number;
  dura: number;
}
export const SHORT_BUFF_INFO: BuffInfoInterface[] = [
  { name: "Damage", dura: 3000, level: 1 },
  { name: "Damage Reduction", dura: 3000, level: 1 },
  { name: "Double Jump", dura: 4000, level: 1 },
] as const;

export const LONG_BUFF_INFO: BuffInfoInterface[] = [
  { name: "Damage", dura: 8000, level: 1 },
  { name: "Damage Reduction", dura: 8000, level: 1 },
  { name: "Health Regen", dura: 8000, level: 1 },
  { name: "Lifesteal", dura: 12000, level: 4 },
] as const;

export const PHASE_NEXUS_MULTIHELPER: Record<Phase, number> = {
  1: 0,
  2: 1,
  3: 2,
  4: 2,
  5: 5,
} as const;

export const AUTO_DECREMENT_NEXUS_DAMAGE = 5;

export const AUTO_DECREMENT_NEXUS_INTERVAL_MS = 5000;

export const NEXUS_BLOCK: BlockName = "Obsidian";

export const NEXUS_REPLACING_BLOCK: BlockName = "Bedrock";

export const NEXUS_COOEDINATE_BY_TEAM: Record<TeamName, Coordinate> = {
  blue: [1, 1, 1],
  green: [2, 2, 2],
  red: [3, 3, 3],
  yellow: [4, 4, 4],
} as const;
