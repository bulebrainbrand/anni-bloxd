/// <reference types="bloxd.io.d.ts/dist/index" />

import type { TeamName } from "../types/team";
import { queueMicroTask } from "./microTask";
import { joinTeam } from "./playerTeam";

const MIN_MATCHING_NUMBER_PLAYER = 8;

export const checkCanMatch = (): boolean =>
  api.getNumPlayers() >= MIN_MATCHING_NUMBER_PLAYER;

const COUNT_TO_TEAMNAME_LOOKUP: Record<0 | 1 | 2 | 3, TeamName> = {
  0: "red",
  1: "blue",
  2: "yellow",
  3: "green",
};

export const doMatching = () => {
  let count = 0;
  // sort as random
  for (const id of api.getPlayerIds().sort((a, b) => Math.random() - 0.5)) {
    count++;
    count %= 4;
    // どうみてもcountは0,1,2,3のどれか
    queueMicroTask(() => {
      // task消化のじかんで人がぬけるかも
      if (api.checkValid(id))
        joinTeam(id, COUNT_TO_TEAMNAME_LOOKUP[count as 0 | 1 | 2 | 3]);
    });
  }
};
