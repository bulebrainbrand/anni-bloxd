const microTaskQueue: CallableFunction[] = [];

export const queueMicroTask = (func: CallableFunction): void => {
  microTaskQueue.push(func);
};

export const runMicroTask = (): void => {
  const copyMicroTaskQueue = [...microTaskQueue];
  while (copyMicroTaskQueue.length >= 1) {
    try {
      copyMicroTaskQueue[0]!(); // 確実に[0]あるやろ
    } catch (error: any) {
      console.log(String(error), error?.stack, "on running micro task");
    } finally {
      copyMicroTaskQueue.shift();
    }
  }
};
