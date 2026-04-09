/// <reference types="bloxd.io.d.ts/dist/index" />

import type { CustomTextStyling, ItemName } from "bloxd.io.d.ts";
import { getNexusHPs } from "./nexusHpManage";
import { PhaseManager } from "./phaseManager";
import type { TeamName } from "../types/team";
import { queueMicroTask } from "./microTask";
import { GamePhaseManager } from "./gamePhaseManager";
import { mySetInterval } from "./timeout";

const TEAM_TO_ICON: Record<TeamName, ItemName> = {
  blue: "Blue Popup Tower",
  green: "Green Popup Tower",
  red: "Red Popup Tower",
  yellow: "Yellow Popup Tower",
};

const setEveryRightInfoText = (text: string | CustomTextStyling) => {
  for (const id of api.getPlayerIds())
    api.setClientOption(id, "RightInfoText", text);
};

const makeNexusHpText = (): CustomTextStyling => {
  const nexusHpData = getNexusHPs();
  let text: CustomTextStyling = [];
  for (const [team, hp] of Object.entries(nexusHpData)) {
    text.push(
      { icon: TEAM_TO_ICON[team as TeamName] },
      { str: team + " ", style: { color: team } },
      { str: hp.toString() + "\n", style: { color: "gold" } },
    );
  }
  return text;
};

const makePhaseText = (): CustomTextStyling => {
  const phase = PhaseManager.getPhase();
  return [{ str: "phase " + String(phase), style: { color: "pink" } }, "\n"];
};

export const updateRightInfoText = () => {
  if (GamePhaseManager.getPhase() === 3)
    queueMicroTask(() =>
      setEveryRightInfoText([...makeNexusHpText(), ...makePhaseText()]),
    );
  else queueMicroTask(() => setEveryRightInfoText(""));
};

// init
GamePhaseManager.addEvent(3, updateRightInfoText);
mySetInterval(updateRightInfoText, 1000);
