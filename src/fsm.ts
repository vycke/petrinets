type State = { value: string };
type Arc = { target: string };
type FSM = {
  send(name: string): void;
  state: State;
};
type Node = Record<string, Arc>;

// wrap a machine in a service
export default function fsm(init: string, states: Record<string, Node>): FSM {
  let _state = Object.freeze({ value: init });

  function send(name: string): void {
    const event = states[_state.value][name];
    if (!event || !states[event.target]) return;
    _state = Object.freeze({ value: event.target });
  }

  return {
    get state() {
      return _state;
    },
    send,
  };
}
