import type { GamePhase } from "../types/phase";
import { queueMicroTask } from "./microTask";
export interface GamePhaseManagerInterface {
  currentPhase: GamePhase;
  events: Record<GamePhase, CallableFunction[]>;
  addEvent: (phase: GamePhase, func: CallableFunction) => void;
  movePhase: () => void;
  getPhase: () => GamePhase;
}
export const GamePhaseManager: GamePhaseManagerInterface = {
  currentPhase: 1,
  events: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
  addEvent(phase, func) {
    this.events[phase].push(func);
  },
  movePhase() {
    ++this.currentPhase;
    if (this.currentPhase > 4) throw new Error("cannot move to gamephase 5");
    for (const func of this.events[this.currentPhase as GamePhase]) {
      queueMicroTask(func);
    }
  },
  getPhase() {
    return this.currentPhase;
  },
};
