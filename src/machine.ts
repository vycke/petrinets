type Data = Record<string, unknown>;
type State = { value: string };
type Transition = (state: State, event: string, data?: Data) => State;
type Machine = {
  initialState: State;
  transition: Transition;
};
type Event = {
  target: string;
  guard?: (data?: Data) => boolean;
};
type Node = Record<string, Event>;
type MachineConfig = {
  initial: string;
  states: Record<string, Node>;
};

// function to create a finite state machine
export default function machine(config: MachineConfig): Machine {
  return {
    initialState: Object.freeze({ value: config.initial }),
    transition(state, event, data?): State {
      const ev = config.states[state.value][event];
      if (!ev || !config.states[ev.target] || ev.guard?.(data)) return state;
      return Object.freeze({ value: ev.target });
    },
  };
}
