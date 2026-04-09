import { runGamePhaseMover } from "../module/GamePhaseMover";
import { runMicroTask } from "../module/microTask";
import { runTimeouts } from "../module/timeout";

(globalThis as any).tick = () => {
  runMicroTask();
  runTimeouts();
  runGamePhaseMover();
};
