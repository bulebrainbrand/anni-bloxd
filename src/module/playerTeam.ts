import type { PlayerId } from "bloxd.io.d.ts";
import type { TeamName } from "../types/team";

let playerTeamMap = new Map<PlayerId, TeamName>();
// TODO 作る
const initPlayerInTeam = (playerId: PlayerId, team: TeamName) => {};

export const joinTeam = (playerId: PlayerId, team: TeamName) => {
  playerTeamMap.set(playerId, team);
  initPlayerInTeam(playerId, team);
};

export const getTeam = (playerId: PlayerId) => playerTeamMap.get(playerId);
