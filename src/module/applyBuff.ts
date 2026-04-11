/// <reference types="bloxd.io.d.ts/dist/index" />
import type { PlayerId } from "bloxd.io.d.ts";
import { SHORT_BUFF_INFO, LONG_BUFF_INFO } from "../consts";
import { BuffInfoInterface } from "../types/buffInfo";

const applyBuff = (
  playerId: PlayerId,
  { name, dura, level }: BuffInfoInterface,
): void => {
  api.applyEffect(playerId, name, dura, { inbuildLevel: level });
};

const checkShouldApplyBuff = (
  playerId: PlayerId,
  { name }: BuffInfoInterface,
): boolean => {
  const playerBuffs = api.getEffects(playerId);
  if (playerBuffs.includes(name)) return false;
  return true;
};

const applyBuffWithBuffInfos = (
  playerId: PlayerId,
  buffInfos: BuffInfoInterface[],
): boolean => {
  const buffInfo = buffInfos[Math.floor(Math.random() * buffInfos.length)];
  if (!checkShouldApplyBuff(playerId, buffInfo)) return false;
  applyBuff(playerId, buffInfo);
  return true;
};

export const applyShortBuff = (playerId: PlayerId): boolean =>
  applyBuffWithBuffInfos(playerId, SHORT_BUFF_INFO);

export const applyLongBuff = (playerId: PlayerId): boolean =>
  applyBuffWithBuffInfos(playerId, LONG_BUFF_INFO);
