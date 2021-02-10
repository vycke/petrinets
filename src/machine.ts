import { Machine, MachineConfig, State } from './types';

export default function createMachine(config: MachineConfig): Machine {
  return {
    initialState: Object.freeze({ value: config.initial }),
    transition(state, event, data?): State {
      const ev = config.states[state.value][event];
      if (!ev || !config.states[ev.target] || ev.guard?.(data)) return state;
      return Object.freeze({ value: ev.target });
    },
  };
}
