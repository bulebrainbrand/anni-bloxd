/// <reference types="bloxd.io.d.ts/dist/index" />
import type { PlayerId, SoundName } from "bloxd.io.d.ts";

export const playSoundOnApplyShortBuff = (playerId: PlayerId): void => {
  const sound: SoundName = "magicAccent1";
  api.playSound(playerId, sound, 1, 0.8);
};

export const playSoundOnApplyLongBuff = (playerId: PlayerId): void => {
  const sound: SoundName = "magicAccent2";
  api.playSound(playerId, sound, 1, 1.5);
};
