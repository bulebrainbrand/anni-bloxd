/// <reference types="bloxd.io.d.ts/dist/index" />
import type { PlayerId } from "bloxd.io.d.ts";
import { SHORT_BUFF_INFO, LONG_BUFF_INFO } from "../consts";

export const applyShortBuff = (playerId: PlayerId): boolean => {
  const playerBuffs = api.getEffects(playerId);
  const { name, dura, level } =
    SHORT_BUFF_INFO[Math.floor(Math.random() * SHORT_BUFF_INFO.length)];
  if (playerBuffs.includes(name)) return false;
  api.applyEffect(playerId, name, dura, { inbuildLevel: level });
  return true;
};

export const applyLongBuff = (playerId: PlayerId): boolean => {
  const playerBuffs = api.getEffects(playerId);
  const { name, dura, level } =
    LONG_BUFF_INFO[Math.floor(Math.random() * LONG_BUFF_INFO.length)];
  if (playerBuffs.includes(name)) return false;
  api.applyEffect(playerId, name, dura, { inbuildLevel: level });
  return true;
};
