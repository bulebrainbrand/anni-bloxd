/// <reference types="bloxd.io.d.ts/dist/index" />

import { BlockName } from "bloxd.io.d.ts";
import {
  NEXUS_BLOCK,
  NEXUS_BLOCK_REPLACING_MS,
  NEXUS_REPLACING_BLOCK,
} from "../consts";
import { mySetTimeout } from "./timeout";

export const replaceNexusAndSetTimeoutRemove = (
  x: number,
  y: number,
  z: number,
): void => {
  api.setBlock(x, y, z, NEXUS_REPLACING_BLOCK);
  mySetTimeout(
    () => api.setBlock(x, y, z, NEXUS_BLOCK),
    NEXUS_BLOCK_REPLACING_MS,
  );
};

export const initNexusBlock = (x: number, y: number, z: number): void => {
  api.setBlock(x, y, z, NEXUS_BLOCK);
};

export const isNexusBlock = (block: BlockName) => block === NEXUS_BLOCK;
