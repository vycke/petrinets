type State = { value: string };
type Event = { target: string };
type Transition = (state: State, event: string) => State;
type Machine = {
  initialState: State;
  transition: Transition;
};
type Service = {
  send(name: string): Service;
  current: State;
};
type Node = Record<string, Event>;

// function to create a finite state machine
export function machine(init: string, states: Record<string, Node>): Machine {
  return {
    initialState: Object.freeze({ value: init }),
    transition(state, event): State {
      const ev = states[state.value][event];
      if (!ev || !states[ev.target]) return state;
      return Object.freeze({ value: ev.target });
    },
  };
}

// wrap a machine in a service
export function interpret(machine: Machine): Service {
  let _state = machine.initialState;

  return {
    get current(): State {
      return _state;
    },
    send(name): Service {
      _state = machine.transition(_state, name);
      return this;
    },
  };
}
