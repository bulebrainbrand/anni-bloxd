/// <reference types="bloxd.io.d.ts/dist/index" />
import type { InGameEffectName, PlayerId } from "bloxd.io.d.ts";
interface BuffInfoInterface {
  name: InGameEffectName;
  level: number;
  dura: number;
}
const SHORT_BUFF_INFO: BuffInfoInterface[] = [
  { name: "Damage", dura: 3000, level: 1 },
  { name: "Damage Reduction", dura: 3000, level: 1 },
  { name: "Double Jump", dura: 4000, level: 1 },
] as const;

const LONG_BUFF_INFO: BuffInfoInterface[] = [
  { name: "Damage", dura: 8000, level: 1 },
  { name: "Damage Reduction", dura: 8000, level: 1 },
  { name: "Health Regen", dura: 8000, level: 1 },
  { name: "Lifesteal", dura: 12000, level: 4 },
] as const;

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
