/// <reference types="bloxd.io.d.ts/dist/index" />
import type { PlayerId } from "bloxd.io.d.ts";
import { mustBekeepInventory } from "../module/mustBeKeepInventory";
import { tryApplyBuffOnKilledPlayer } from "../module/onKillBuff";
api.setCallbackValueFallback("onPlayerKilledOtherPlayer", "keepInventory");
(globalThis as any).onPlayerKilledOtherPlayer = (
  attackingPlayer: PlayerId,
  killedPlayer: PlayerId,
  damageDealt: number,
  withItem: string,
): "keepInventory" | void => {
  if (mustBekeepInventory()) return "keepInventory";
  tryApplyBuffOnKilledPlayer(attackingPlayer);
};
