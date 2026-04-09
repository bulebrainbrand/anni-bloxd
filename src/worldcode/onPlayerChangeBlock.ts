/// <reference types="bloxd.io.d.ts/dist/index" />
import type { BlockName, PlayerId } from "bloxd.io.d.ts";
import { GamePhaseManager } from "../module/gamePhaseManager";
import { checkBlockCanMine, tryMineOre } from "../module/mineOreManager";
import { checkCanChange } from "../module/canChangeArea";
import { breakNexus, isBreakingNexus } from "../module/nexusBreakManager";

api.setCallbackValueFallback("onPlayerChangeBlock", "preventChange");
(globalThis as any).onPlayerChangeBlock = (
  playerId: PlayerId,
  x: number,
  y: number,
  z: number,
  fromBlock: BlockName,
  toBlock: BlockName,
  droppedItem: BlockName | null,
) => {
  if (GamePhaseManager.getPhase() !== 3) return "preventChange";
  if (!checkCanChange(x, y, z)) return "preventChange";
  if (checkBlockCanMine(fromBlock))
    return tryMineOre(x, y, z, fromBlock) ? undefined : "preventChange";
  if (isBreakingNexus(fromBlock))
    return breakNexus(playerId, x, y, z) ? undefined : "preventChange";
};
