import { CAN_CHANGE_AREA, TEAM_BASE_AREAS } from "../consts";

const isInRect = (
  [x, y, z]: readonly number[],
  [[x1, y1, z1], [x2, y2, z2]]: Readonly<number[][]>,
) => x >= x1 && x <= x2 && y >= y1 && y <= y2 && z >= z1 && z <= z2;

const isInTeamBases = (x: number, y: number, z: number): boolean =>
  TEAM_BASE_AREAS.some((area) => isInRect([x, y, z], area));

export const checkCanChange = (x: number, y: number, z: number): boolean =>
  isInRect([x, y, z], CAN_CHANGE_AREA) && !isInTeamBases(x, y, z);
