import type { PlayerId, LifeformBodyPart, PlayerDbId } from "bloxd.io.d.ts";
import { GamePhaseManager } from "../module/gamePhaseManager";
import { PhaseManager } from "../module/phaseManager";
import { getTeam } from "../module/playerTeam";

(globalThis as any).onPlayerDamagingOtherPlayer = (
  attackingPlayer: PlayerId,
  damagedPlayer: PlayerId,
  damageDealt: number,
  withItem: string,
  bodyPartHit: LifeformBodyPart,
  damagerDbId: PlayerDbId,
): "preventDamage" | void => {
  if (GamePhaseManager.getPhase() !== 3) return "preventDamage";
  if (PhaseManager.getPhase() === 1) return "preventDamage";
  const attackingPlayerTeam = getTeam(attackingPlayer);
  if (attackingPlayerTeam == undefined) return "preventDamage";
  const damagedPlayerTeam = getTeam(damagedPlayer);
  if (damagedPlayerTeam == null) return "preventDamage";
  if (attackingPlayerTeam === damagedPlayerTeam) return "preventDamage";
};
