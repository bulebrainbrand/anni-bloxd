import type { Phase } from "../types/phase";
import { queueMicroTask } from "./microTask";
export interface PhaseManagerInterface {
  currentPhase: Phase | 0;
  events: Record<Phase, CallableFunction[]>;
  addEvent: (phase: Phase, func: CallableFunction) => void;
  movePhase: () => void;
  getPhase: () => Phase | 0;
}
export const PhaseManager: PhaseManagerInterface = {
  currentPhase: 0,
  events: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  },
  addEvent(phase: Phase, func: CallableFunction) {
    this.events[phase].push(func);
  },
  movePhase() {
    ++this.currentPhase;
    if (this.currentPhase > 5) throw new Error("cannot move to 6");
    for (const func of this.events[this.currentPhase as Phase]) {
      queueMicroTask(func);
    }
  },
  getPhase() {
    return this.currentPhase;
  },
};
