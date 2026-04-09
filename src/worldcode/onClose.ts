/// <reference types="bloxd.io.d.ts/dist/index" />
(globalThis as any).onClose = (serverIsShuttingDown: boolean) => {
  (api as any).setMaxPlayers(40, 40);
};
