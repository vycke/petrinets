type Data = Record<string, unknown>;

export type State = { value: string };

export type Transition = (state: State, event: string, data?: Data) => State;

export type Machine = {
  initialState: State;
  transition: Transition;
};

export type Event = {
  target: string;
  guard?: (data?: Data) => boolean;
};

export type Node = Record<string, Event>;

export type MachineConfig = {
  initial: string;
  states: Record<string, Node>;
};
