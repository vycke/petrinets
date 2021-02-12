type State = { value: string };
type Arc = { target: string };
type Transition = (state: State, event: string) => State;
type Machine = {
  initialState: State;
  transition: Transition;
};
type Service = {
  send(name: string): Service;
  current: State;
};
type Node = Record<string, Arc>;

// function to create a finite state machine
export function machine(init: string, states: Record<string, Node>): Machine {
  return {
    initialState: Object.freeze({ value: init }),
    transition(state, name): State {
      const event = states[state.value][name];
      if (!event || !states[event.target]) return state;
      return Object.freeze({ value: event.target });
    },
  };
}

// wrap a machine in a service
export function interpret(machine: Machine): Service {
  let _state = machine.initialState;

  return {
    get current() {
      return _state;
    },
    send(name) {
      _state = machine.transition(_state, name);
      return this;
    },
  };
}
