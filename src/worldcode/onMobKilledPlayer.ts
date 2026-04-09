import { MobId, PlayerId } from "bloxd.io.d.ts";
import { mustBekeepInventory } from "../module/mustBeKeepInventory";

(globalThis as any).onMobKilledPlayer = (
  attackingMob: MobId,
  killedPlayer: PlayerId,
  damageDealt: number,
  withItem: string,
): "keepInventory" | void => {
  if (mustBekeepInventory()) return "keepInventory";
};
