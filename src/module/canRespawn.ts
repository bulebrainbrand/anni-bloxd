import type { PlayerId } from "bloxd.io.d.ts";
import { getTeam } from "./playerTeam";
import { getNexusHP } from "./nexusHpManage";

export const checkCanRespawn = (playerId: PlayerId): boolean => {
  const team = getTeam(playerId);
  if (team == null) return false;
  const nexusHp = getNexusHP(team);
  if (nexusHp <= 0) return false;
  return true;
};
