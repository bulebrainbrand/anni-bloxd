import { INIT_NEXUS_HP } from "../consts";
import type { TeamName } from "../types/team";

let nexusHps: Record<TeamName, number> = {
  red: INIT_NEXUS_HP,
  green: INIT_NEXUS_HP,
  blue: INIT_NEXUS_HP,
  yellow: INIT_NEXUS_HP,
};

export const initNexusHP = () => {
  nexusHps = {
    red: INIT_NEXUS_HP,
    green: INIT_NEXUS_HP,
    blue: INIT_NEXUS_HP,
    yellow: INIT_NEXUS_HP,
  };
};

export const decrementNexusHP = (team: TeamName, amount: number) => {
  return (nexusHps[team] -= amount);
};

export const getNexusHP = (team: TeamName) => {
  return nexusHps[team];
};

export const getNexusHPs = (): Readonly<Record<TeamName, number>> => {
  return nexusHps;
};
